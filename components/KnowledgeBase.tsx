
import React, { useState } from 'react';

interface KnowledgeBaseProps {
  onNotify?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onNotify }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    if (onNotify) {
      onNotify('지식이 성공적으로 등록되었습니다.', 'success');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">지식 관리</h2>
        <p className="text-slate-500 text-sm font-medium">시스템의 지식 베이스를 구축하고 관리합니다.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-900">새로운 지식 등록</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              AI가 학습할 새로운 데이터를 등록하여 응답의 정확도를 높일 수 있습니다.
            </p>
          </div>
          <button
            onClick={handleRegisterClick}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            지식등록
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={handleCancel}
          />
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">지식 등록 확인</h4>
                <p className="text-slate-500 font-medium">이 지식을 등록하시겠습니까?</p>
              </div>
              <div className="flex w-full gap-3 pt-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors active:scale-95"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
