
import React from 'react';
import { PageType } from '../types';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onRestartGuide?: () => void;
}

interface NavItem {
  id: PageType;
  label: string;
}

interface NavGroup {
  label: string;
  icon: React.ReactNode;
  id?: PageType;
  items?: NavItem[];
  tourKey?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onRestartGuide }) => {
  const navigation: NavGroup[] = [
    {
      label: '대시보드',
      id: 'dashboard',
      tourKey: 'nav-dashboard',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      label: 'AI 설정',
      tourKey: 'nav-ai-settings',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      items: [
        { id: 'ai-basic', label: 'AI 기본설정' }
      ]
    },
    {
      label: '지식관리',
      tourKey: 'nav-kb-manage',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      items: [
        { id: 'kb-register', label: '지식 등록' }
      ]
    },
    {
      label: '대화관리',
      id: 'chat-manage',
      tourKey: 'nav-chat-manage',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    }
  ];

  return (
    <aside 
      className="w-[240px] h-full flex-shrink-0 bg-white border-r border-slate-100 flex flex-col z-[100] relative"
      data-tour="sidebar-fixed"
    >
      <div className="h-16 flex items-center px-6">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-600/20 transition-transform">
          <span className="text-white text-[10px] font-bold">FF</span>
        </div>
        <span className="text-slate-900 font-bold text-[13px] tracking-tight">CONTROL CENTER</span>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1 custom-scrollbar">
        {navigation.map((group, idx) => {
          const isMainActive = group.id === currentPage;
          const hasActiveChild = group.items?.some(i => i.id === currentPage);
          const isGroupExpanded = isMainActive || hasActiveChild;

          return (
            <div key={idx} className="mb-1" data-tour={group.tourKey}>
              {group.id ? (
                <button
                  onClick={() => onNavigate(group.id as PageType)}
                  className={`group w-full relative flex items-center px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 text-left ${
                    isMainActive
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className={`mr-3 transition-colors duration-200 ${isMainActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'}`}>
                    {group.icon}
                  </span>
                  {group.label}
                </button>
              ) : (
                <div 
                  className={`flex items-center px-3 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                    isGroupExpanded ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  <span className={`mr-3 transition-colors duration-200 ${isGroupExpanded ? 'text-indigo-500' : 'text-slate-300'}`}>
                    {group.icon}
                  </span>
                  {group.label}
                </div>
              )}

              {group.items && (
                <div className="mt-0.5 ml-9 space-y-0.5 relative">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`group w-full block text-left px-3 py-1.5 text-[12px] rounded-lg transition-all duration-200 relative ${
                        currentPage === item.id
                          ? 'text-indigo-600 font-bold bg-indigo-50/50'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-50 space-y-3">
        <button 
          onClick={onRestartGuide}
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[11px] font-bold text-slate-500 transition-all border border-slate-100"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>변경사항 가이드 재실행</span>
        </button>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">v2.0 Update</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          </div>
          <p className="text-[10px] text-slate-600 font-medium">System Optimized</p>
        </div>
      </div>
    </aside>
  );
};
