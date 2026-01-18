
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Scale } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'أهلاً بك في المساعد القانوني الذكي لنظام حلم HELM. كيف يمكنني مساعدتك اليوم في صياغة العقود أو تلخيص القضايا؟' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'أنت مساعد قانوني خبير تعمل ضمن نظام حلم HELM. قدم إجابات قانونية دقيقة، مختصرة، ومهنية باللغة العربية الفصحى. ركز على القوانين السعودية والخليجية.'
        }
      });
      
      const botResponse = response.text || "عذراً، حدث خطأ في معالجة طلبك.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'عذراً، واجهت مشكلة في الاتصال بالمساعد الذكي. يرجى التأكد من مفتاح API المحمل.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-blue-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold">المستشار الذكي</h3>
            <p className="text-xs text-blue-100">مدعوم بتقنية Gemini Pro</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs font-medium">نشط الآن</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm 
                ${m.role === 'user' ? 'bg-slate-100 dark:bg-slate-700 text-slate-500' : 'bg-blue-600 text-white'}`}>
                {m.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${m.role === 'user' 
                  ? 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100' 
                  : 'bg-blue-600 text-white font-medium'}`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end animate-in fade-in">
            <div className="flex gap-3 flex-row-reverse max-w-[80%]">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                جارِ التفكير في استشارة قانونية مناسبة...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب استفسارك القانوني هنا..."
            className="w-full pr-6 pl-16 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center transition-all
              ${!input.trim() || isTyping 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95'}`}
          >
            <Send size={20} className="rotate-180" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
          <Scale size={12} />
          هذا المساعد الذكي يقدم معلومات قانونية عامة ولا يغني عن استشارة المحامي المختص.
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
