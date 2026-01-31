
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, LiveServerMessage, Modality, Blob } from "@google/genai";

interface Message {
    role: 'user' | 'model';
    text: string;
}

// Helper functions for audio encoding/decoding as per Gemini Live API rules
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(true);
    
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const audioContextInRef = useRef<AudioContext | null>(null);
    const audioContextOutRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const streamRef = useRef<MediaStream | null>(null);
    const sessionRef = useRef<any>(null);

    const systemInstruction = `Bạn là 'Sứ giả Gốm Mỹ Thiện'. 
    Nhiệm vụ: Giới thiệu lịch sử 200 năm của làng gốm Mỹ Thiện tại Quảng Ngãi. 
    Phong cách: Thân thiện, am hiểu sâu sắc về kỹ thuật làm gốm.
    Tốc độ phản hồi: Rất nhanh. 
    Câu trả lời: Ngắn gọn, súc tích (dưới 3 câu khi nói). 
    Giọng điệu: Hào hứng, tự hào về di sản quê hương.`;

    useEffect(() => {
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
            setHasApiKey(false);
            return;
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const newChat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: { systemInstruction },
        });
        setChat(newChat);
        setMessages([{ role: 'model', text: 'Chào bạn! Tôi là Sứ giả Mỹ Thiện. Hãy nhấn vào biểu tượng loa để nghe tôi nói nhé!' }]);

        return () => {
            stopVoiceMode();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const playAudioBuffer = async (base64Audio: string) => {
        if (!audioContextOutRef.current) {
            audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextOutRef.current;
        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
        
        try {
            const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            
            source.addEventListener('ended', () => {
                activeSourcesRef.current.delete(source);
            });
            
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            activeSourcesRef.current.add(source);
        } catch (e) {
            console.error("Error playing audio:", e);
        }
    };

    const speakText = async (text: string) => {
        const API_KEY = process.env.API_KEY;
        if (!API_KEY || !isVoiceMode) return;

        try {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: `Đọc bằng giọng nam Quảng Ngãi hào hứng: ${text}` }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                    },
                },
            });
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                await playAudioBuffer(base64Audio);
            }
        } catch (e) {
            console.error("TTS Error:", e);
        }
    };

    const startVoiceMode = async () => {
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) return;

        try {
            setIsLoading(true);
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            
            audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

            let currentInputTranscription = '';
            let currentOutputTranscription = '';

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-12-2025',
                callbacks: {
                    onopen: () => {
                        const source = audioContextInRef.current!.createMediaStreamSource(streamRef.current!);
                        const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
                        scriptProcessor.onaudioprocess = (e) => {
                            const inputData = e.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(audioContextInRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscription += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscription += message.serverContent.outputTranscription.text;
                        }
                        if (message.serverContent?.turnComplete) {
                            if (currentInputTranscription) setMessages(p => [...p, { role: 'user', text: currentInputTranscription }]);
                            if (currentOutputTranscription) setMessages(p => [...p, { role: 'model', text: currentOutputTranscription }]);
                            currentInputTranscription = '';
                            currentOutputTranscription = '';
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio) await playAudioBuffer(base64Audio);

                        if (message.serverContent?.interrupted) {
                            activeSourcesRef.current.forEach(s => s.stop());
                            activeSourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                        }
                    },
                    onclose: () => setIsVoiceMode(false),
                    onerror: (e) => console.error("Live Error:", e)
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction,
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    inputAudioTranscription: {},
                    outputAudioTranscription: {}
                }
            });

            sessionRef.current = await sessionPromise;
            setIsVoiceMode(true);
        } catch (err) {
            console.error("Voice mode error:", err);
            alert("Vui lòng cho phép quyền truy cập Micro.");
        } finally {
            setIsLoading(false);
        }
    };

    const stopVoiceMode = () => {
        if (sessionRef.current) { sessionRef.current.close(); sessionRef.current = null; }
        if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
        activeSourcesRef.current.forEach(s => s.stop());
        activeSourcesRef.current.clear();
        setIsVoiceMode(false);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chat || !hasApiKey) return;

        const text = userInput;
        setMessages(prev => [...prev, { role: 'user', text }]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: text });
            const botText = response.text || '';
            setMessages(prev => [...prev, { role: 'model', text: botText }]);
            // Nếu đang bật voice mode, đọc tin nhắn vừa nhận được
            if (isVoiceMode) await speakText(botText);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: 'Tôi đang bận nặn gốm một chút, hãy thử lại nhé!' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-[400px] h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-5 bg-brand-terracotta text-white rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-brand-glaze/20 rounded-full flex items-center justify-center text-xl ${isVoiceMode ? 'animate-pulse ring-2 ring-white' : ''}`}>
                            {isVoiceMode ? '🎙️' : '🏺'}
                        </div>
                        <div>
                            <h3 className="font-bold leading-tight">Sứ giả Mỹ Thiện</h3>
                            <p className="text-[10px] opacity-80 uppercase tracking-widest">{isVoiceMode ? 'Đang trò chuyện...' : 'Hệ thống AI'}</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-gray-50/50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-brand-clay text-white rounded-tr-none' : 'bg-white text-brand-dark rounded-tl-none border border-brand-sand/30'}`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && !isVoiceMode && (
                        <div className="flex justify-start">
                            <div className="px-4 py-2 rounded-2xl bg-white border border-brand-sand/20 flex gap-1 items-center">
                                <div className="w-1.5 h-1.5 bg-brand-clay rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-brand-clay rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-1.5 h-1.5 bg-brand-clay rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t rounded-b-2xl">
                    <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                        <div className="flex-1 relative">
                           <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder={isVoiceMode ? "Sứ giả đang lắng nghe..." : "Nhắn tin cho sứ giả..."}
                                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:ring-2 focus:ring-brand-clay outline-none text-sm pr-12"
                                disabled={!hasApiKey || isLoading}
                            />
                            {/* Nút Loa Tích Hợp bên trong thanh chat */}
                            <button 
                                type="button"
                                onClick={isVoiceMode ? stopVoiceMode : startVoiceMode}
                                className={`absolute right-2 top-1.5 p-2 rounded-full transition-all ${isVoiceMode ? 'bg-red-500 text-white shadow-lg' : 'text-brand-clay hover:bg-brand-sand/30'}`}
                            >
                                {isVoiceMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 14.828a1 1 0 01-1.414-1.414 5 5 0 000-7.072 1 1 0 011.414-1.414 7 7 0 010 9.9z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M12.536 12.707a1 1 0 01-1.414-1.414 2 2 0 000-2.828 1 1 0 111.414-1.414 4 4 0 010 5.656z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={!hasApiKey || isLoading || !userInput.trim()}
                            className="bg-brand-terracotta text-white p-3 rounded-full hover:scale-105 transition-transform disabled:bg-gray-300 shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        </button>
                    </form>
                    <p className="mt-3 text-[10px] text-center text-gray-400 font-medium">
                        {isVoiceMode ? 'Bật Micro để trò chuyện trực tiếp với Sứ giả' : 'Nhấn biểu tượng loa để kích hoạt giọng nói'}
                    </p>
                </div>
            </div>

            {/* Chat Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-brand-terracotta text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 z-50 group"
            >
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    {hasApiKey && <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-white animate-ping"></span>}
                </div>
                {/* Tooltip */}
                <span className="absolute right-20 bg-brand-dark text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                    Trò chuyện cùng Sứ giả
                </span>
            </button>
        </>
    );
};

export default Chatbot;
