
import React from 'react';

interface PlaceholderViewProps {
  title: string;
  description: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-1">{description}</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800">준비 중인 페이지입니다</h3>
        <p className="text-slate-500 max-w-sm mt-2">
          선택하신 "{title}" 메뉴의 상세 기능을 구현 중입니다. 곧 새로운 업데이트로 찾아뵙겠습니다.
        </p>
      </div>
    </div>
  );
};
