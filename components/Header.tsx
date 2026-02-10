
import React from 'react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
}

export const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'Focus-Flow', path: '#' }];
    
    switch (currentPage) {
      case 'dashboard': 
        crumbs.push({ label: '대시보드', path: '#' });
        break;
      case 'ai-basic':
      case 'ai-style':
      case 'ai-condition':
        crumbs.push({ label: 'AI 설정', path: '#' });
        crumbs.push({ label: currentPage === 'ai-basic' ? '기본설정' : currentPage === 'ai-style' ? '스타일' : '조건별 답변', path: '#' });
        break;
      case 'kb-register':
      case 'kb-manage':
      case 'kb-api':
        crumbs.push({ label: '지식베이스', path: '#' });
        crumbs.push({ label: currentPage === 'kb-register' ? '지식등록' : currentPage === 'kb-manage' ? '지식관리' : 'API 연동', path: '#' });
        break;
      case 'chat-manage':
        crumbs.push({ label: '사용자 관리', path: '#' });
        break;
      default:
        crumbs.push({ label: '시스템', path: '#' });
    }
    return crumbs;
  };

  return (
    <header className="h-14 flex items-center justify-between px-8 bg-white border-b border-slate-100 z-10 select-none">
      <nav className="flex items-center space-x-2 text-[12px]">
        {getBreadcrumbs().map((crumb, idx, arr) => (
          <React.Fragment key={idx}>
            <span className={`font-semibold ${idx === arr.length - 1 ? 'text-slate-900' : 'text-slate-400 uppercase tracking-wider'}`}>
              {crumb.label}
            </span>
            {idx < arr.length - 1 && (
              <svg className="w-3 h-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-4 mr-4">
          <div className="flex items-center space-x-1 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-bold">14:52:01</span>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-200"></div>

        <div className="flex items-center group cursor-pointer">
          <div className="flex flex-col items-end mr-3">
            <span className="text-[12px] font-bold text-slate-900 leading-tight">관리자 계정</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Master Admin</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold shadow-md transition-transform group-hover:scale-105">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};
