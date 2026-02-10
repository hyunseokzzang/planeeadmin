
import React, { useState } from 'react';
import { ToastType } from './Toast';

interface AIBasicSettingsProps {
  onNotify: (msg: string, type?: ToastType) => void;
}

export const AIBasicSettings: React.FC<AIBasicSettingsProps> = ({ onNotify }) => {
  const [configMethod, setConfigMethod] = useState<'auto' | 'manual'>('auto');
  const [url, setUrl] = useState('https://planee.vercel.app/');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSave = () => {
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

      <div className="fixed bottom-0 right-0 left-60 p-6 bg-white/60 backdrop-blur-xl border-t border-slate-100 flex justify-end z-40">
        <button 
          onClick={handleSave}
          className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20"
        >
          업데이트 저장하기
        </button>
      </div>
    </div>
  );
};
