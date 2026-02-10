
import React, { useState } from 'react';
import { ToastType } from './Toast';

interface ToastTestProps {
  onNotify: (msg: string, type?: ToastType) => void;
}

export const ToastTest: React.FC<ToastTestProps> = ({ onNotify }) => {
  const [customMsg, setCustomMsg] = useState('시스템 알림 테스트입니다.');

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Toast Notification Test</h2>
        <p className="text-slate-500 mt-1">알림이 콘텐츠의 중요 요소를 가리지 않는지 우측 하단 여백을 확인하세요.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm">
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">테스트 메세지 입력</label>
            <input 
              type="text" 
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="메세지를 입력하세요..."
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={() => onNotify(customMsg, 'success')}
              className="flex items-center justify-center space-x-3 px-6 py-5 bg-white border border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:border-emerald-200 hover:bg-emerald-50/30 transition-all active:scale-95 shadow-sm"
            >
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Success</span>
            </button>

            <button 
              onClick={() => onNotify(customMsg, 'error')}
              className="flex items-center justify-center space-x-3 px-6 py-5 bg-white border border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:border-rose-200 hover:bg-rose-50/30 transition-all active:scale-95 shadow-sm"
            >
              <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span>Error</span>
            </button>

            <button 
              onClick={() => onNotify(customMsg, 'info')}
              className="flex items-center justify-center space-x-3 px-6 py-5 bg-white border border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:border-indigo-200 hover:bg-indigo-50/30 transition-all active:scale-95 shadow-sm"
            >
              <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Information</span>
            </button>
          </div>
        </div>

        <div className="mt-12 p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">UX 가이드라인: 토스트 알림</h4>
          <ul className="text-xs text-slate-500 space-y-3 list-disc pl-4 leading-relaxed">
            <li><strong>시야 방해 금지:</strong> 알림은 항상 주요 컨트롤 버튼이나 콘텐츠가 없는 우측 최하단에 작게 배치됩니다.</li>
            <li><strong>즉각적 피드백:</strong> 사용자의 모든 중요한 액션(저장, 삭제 등)에는 반드시 시각적 피드백이 수반되어야 합니다.</li>
            <li><strong>비강제성:</strong> 토스트 알림은 사용자의 작업을 중단시키지 않으며, 3초 후 조용히 사라집니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
