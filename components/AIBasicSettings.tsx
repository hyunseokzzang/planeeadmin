
import React, { useState } from 'react';
import { ToastType } from './Toast';

interface AIBasicSettingsProps {
  onNotify: (msg: string, type?: ToastType) => void;
}

export const AIBasicSettings: React.FC<AIBasicSettingsProps> = ({ onNotify }) => {
  // Initial values for change detection
  const initialSettings = {
    configMethod: 'auto' as 'auto' | 'manual',
    url: 'https://planee.vercel.app/',
    themeColor: '#4f46e5',
    widgetPosition: 'right' as 'right' | 'left',
    widgetSize: 50,
    greeting: '',
    typingAnimation: true,
    delay: 1,
    temperature: 0.7,
    maxTokens: 1024,
    systemPrompt: ''
  };

  const [configMethod, setConfigMethod] = useState<'auto' | 'manual'>(initialSettings.configMethod);
  const [url, setUrl] = useState(initialSettings.url);
  const [themeColor, setThemeColor] = useState(initialSettings.themeColor);
  const [widgetPosition, setWidgetPosition] = useState<'right' | 'left'>(initialSettings.widgetPosition);
  const [widgetSize, setWidgetSize] = useState(initialSettings.widgetSize);
  const [greeting, setGreeting] = useState(initialSettings.greeting);
  const [typingAnimation, setTypingAnimation] = useState(initialSettings.typingAnimation);
  const [delay, setDelay] = useState(initialSettings.delay);
  const [temperature, setTemperature] = useState(initialSettings.temperature);
  const [maxTokens, setMaxTokens] = useState(initialSettings.maxTokens);
  const [systemPrompt, setSystemPrompt] = useState(initialSettings.systemPrompt);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isChanged = 
    configMethod !== initialSettings.configMethod ||
    url !== initialSettings.url ||
    themeColor !== initialSettings.themeColor ||
    widgetPosition !== initialSettings.widgetPosition ||
    widgetSize !== initialSettings.widgetSize ||
    greeting !== initialSettings.greeting ||
    typingAnimation !== initialSettings.typingAnimation ||
    delay !== initialSettings.delay ||
    temperature !== initialSettings.temperature ||
    maxTokens !== initialSettings.maxTokens ||
    systemPrompt !== initialSettings.systemPrompt;

  const handleSave = () => {
    if (!isChanged) return;
    onNotify('AI 설정이 성공적으로 저장되었습니다.', 'success');
  };

  const handleAnalyze = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    onNotify('웹사이트 분석을 시작합니다. 잠시만 기다려주세요.', 'info');
    setTimeout(() => {
      onNotify('분석이 완료되었습니다. 추천 설정값이 반영되었습니다.', 'success');
      setIsAnalyzing(false);
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24 relative">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI 기본설정</h2>
        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase">Help</span>
      </div>

      <section className="space-y-6" data-tour="ai-config-section">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800">설정 방식 선택</h3>
          <p className="text-xs text-slate-400">시스템의 답변 스타일을 결정하는 기초 정보를 입력합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <button 
            onClick={() => setConfigMethod('auto')}
            className={`flex items-center p-5 border rounded-2xl transition-all duration-300 group ${
              configMethod === 'auto' 
                ? 'border-indigo-600 bg-indigo-50/20 shadow-xl shadow-indigo-600/5 ring-1 ring-indigo-500/20' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${configMethod === 'auto' ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold transition-colors ${configMethod === 'auto' ? 'text-indigo-900' : 'text-slate-700'}`}>AI 자동 설정</p>
              <p className="text-[11px] text-slate-400">웹사이트 분석 후 자동 완성</p>
            </div>
          </button>

          <button 
            onClick={() => setConfigMethod('manual')}
            className={`flex items-center p-5 border rounded-2xl transition-all duration-300 group ${
              configMethod === 'manual' 
                ? 'border-indigo-600 bg-indigo-50/20 shadow-xl shadow-indigo-600/5 ring-1 ring-indigo-500/20' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${configMethod === 'manual' ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold transition-colors ${configMethod === 'manual' ? 'text-indigo-900' : 'text-slate-700'}`}>직접 입력</p>
              <p className="text-[11px] text-slate-400">페르소나 직접 입력 및 편집</p>
            </div>
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">웹사이트 분석 (URL)</label>
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
            />
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`px-8 py-4 border rounded-2xl text-sm font-bold transition-all flex items-center space-x-2 shadow-sm ${
                isAnalyzing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {isAnalyzing ? (
                <svg className="w-4 h-4 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              )}
              <span>분석하기</span>
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-10 pt-10 border-t border-slate-100" data-tour="ai-style-section">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">대화 스타일 설정</h3>
          <p className="text-sm text-slate-400 font-medium">사용자에게 보여지는 대화창의 디자인과 응답 방식을 세밀하게 조정합니다.</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* 1. 대화위젯설정 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 border-b border-slate-50 pb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              <h4 className="font-bold text-slate-800">대화 위젯 설정</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">테마 컬러</label>
                <div className="flex items-center space-x-3">
                  {['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#111827'].map((color) => (
                    <button 
                      key={color} 
                      onClick={() => setThemeColor(color)}
                      className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all hover:scale-110 active:scale-95 ${themeColor === color ? 'border-indigo-600 scale-110 ring-2 ring-indigo-500/20' : 'border-white'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <button className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">위젯 위치</label>
                <div className="flex bg-slate-50 p-1 rounded-xl w-fit">
                  <button 
                    onClick={() => setWidgetPosition('right')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${widgetPosition === 'right' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    오른쪽 하단
                  </button>
                  <button 
                    onClick={() => setWidgetPosition('left')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${widgetPosition === 'left' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    왼쪽 하단
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">버튼 아이콘</label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/30 transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">위젯 크기</label>
                <input 
                  type="range" 
                  value={widgetSize}
                  onChange={(e) => setWidgetSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 인사말설정 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 border-b border-slate-50 pb-6">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
              </div>
              <h4 className="font-bold text-slate-800">인사말 설정</h4>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">첫 인사말 문구</label>
                <textarea 
                  rows={3}
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="안녕하세요! 무엇을 도와드릴까요?"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-700">타이핑 애니메이션</p>
                    <p className="text-[10px] text-slate-400">AI가 답변을 작성하는 듯한 효과</p>
                  </div>
                  <div 
                    onClick={() => setTypingAnimation(!typingAnimation)}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${typingAnimation ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${typingAnimation ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-700">노출 지연 시간</p>
                    <p className="text-[10px] text-slate-400">페이지 접속 후 인사말 노출 시점</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      value={delay}
                      onChange={(e) => setDelay(parseInt(e.target.value))}
                      className="w-12 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-center" 
                    />
                    <span className="text-xs font-bold text-slate-400">초</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 추천질문 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 border-b border-slate-50 pb-6">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="font-bold text-slate-800">추천 질문 설정</h4>
            </div>

            <div className="space-y-6">
              <p className="text-xs text-slate-400 font-medium">사용자가 자주 묻는 질문을 버튼 형태로 제공하여 편리한 대화를 유도합니다.</p>
              
              <div className="space-y-3">
                {[
                  '서비스 이용 요금이 궁금해요.',
                  '회원가입은 어떻게 하나요?',
                  '주요 기능에 대해 알려주세요.'
                ].map((q, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group">
                    <div className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 group-hover:border-indigo-200 transition-colors">
                      {q}
                    </div>
                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  <span>추천 질문 추가하기</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. 고급설정 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 border-b border-slate-50 pb-6">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="font-bold text-slate-800">고급 설정</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Temperature</label>
                  <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{temperature}</span>
                </div>
                <input 
                  type="range" 
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                />
                <p className="text-[10px] text-slate-400 leading-relaxed">값이 높을수록 AI가 더 창의적이고 다양한 답변을 생성합니다.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Max Tokens</label>
                  <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{maxTokens.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="256"
                  max="4096"
                  step="256"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                />
                <p className="text-[10px] text-slate-400 leading-relaxed">답변의 최대 길이를 제한합니다. 토큰이 높을수록 긴 답변이 가능합니다.</p>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">시스템 프롬프트 (System Instruction)</label>
                <textarea 
                  rows={5}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="AI의 역할과 제약 사항을 입력하세요. 예: 당신은 친절한 고객 상담원입니다."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 right-0 left-60 p-6 bg-white/60 backdrop-blur-xl border-t border-slate-100 flex justify-end z-40" data-tour="fixed-save-bar">
        <button 
          onClick={handleSave}
          disabled={!isChanged}
          className={`px-12 py-4 rounded-2xl font-bold text-sm transition-all shadow-2xl ${
            isChanged 
            ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20 active:scale-95 cursor-pointer' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          업데이트 저장하기
        </button>
      </div>
    </div>
  );
};
