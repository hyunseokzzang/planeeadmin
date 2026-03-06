
import React, { useState } from 'react';
import { ToastType } from './Toast';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

const mockKnowledge: KnowledgeItem[] = [
  { id: '1', title: '2024년 서비스 이용약관', content: '서비스 이용에 관한 전반적인 약관 내용입니다...', createdAt: '2024-03-01 10:00', status: 'active' },
  { id: '2', title: '환불 규정 안내', content: '결제 후 7일 이내 환불이 가능하며...', createdAt: '2024-03-02 14:30', status: 'active' },
  { id: '3', title: '개인정보 처리방침', content: '사용자의 소중한 개인정보를 보호하기 위해...', createdAt: '2024-02-15 09:15', status: 'inactive' },
];

interface KnowledgeRegistrationProps {
  onNotify: (msg: string, type?: ToastType) => void;
}

export const KnowledgeRegistration: React.FC<KnowledgeRegistrationProps> = ({ onNotify }) => {
  const [items, setItems] = useState<KnowledgeItem[]>(mockKnowledge);
  const [showPanel, setShowPanel] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [kbTitle, setKbTitle] = useState('');
  const [kbContent, setKbContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRegisterClick = () => {
    if (!kbTitle.trim() || !kbContent.trim()) {
      onNotify('지식 제목과 내용을 모두 입력해주세요.', 'error');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const newItem: KnowledgeItem = {
      id: Math.random().toString(36).substring(2, 9),
      title: kbTitle,
      content: kbContent,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'active'
    };
    setItems([newItem, ...items]);
    onNotify('지식이 성공적으로 등록되었습니다.', 'success');
    setShowConfirm(false);
    setShowPanel(false);
    setKbTitle('');
    setKbContent('');
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-32">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">지식 관리</h2>
          <p className="text-slate-500 text-sm">AI가 학습할 지식 리스트를 관리하고 새로운 지식을 등록합니다.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden relative">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="relative w-80">
            <svg className="w-3.5 h-3.5 absolute left-4 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="지식 제목 또는 내용 검색" 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">지식 정보</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">상태</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">등록일</th>
                <th className="w-14 px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-all cursor-pointer group">
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs mr-4 shadow-sm group-hover:scale-105 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 leading-none mb-1.5">{item.title}</p>
                        <p className="text-[12px] text-slate-400 font-medium line-clamp-1">{item.content}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      item.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[12px] text-slate-400 font-bold">{item.createdAt}</td>
                  <td className="px-6 py-5 text-right">
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Bottom Bar for New Registration */}
      <div className="fixed bottom-0 right-0 left-60 p-6 bg-white/60 backdrop-blur-xl border-t border-slate-100 flex justify-end z-40">
        <button 
          onClick={() => setShowPanel(true)}
          className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>신규 지식 등록하기</span>
        </button>
      </div>

      {/* Registration Side Panel (Modal) */}
      <div className={`fixed inset-0 z-[200] flex justify-end transition-all duration-500 ${showPanel ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]" onClick={() => setShowPanel(false)} />
        <div className={`relative w-full max-w-xl bg-white h-full shadow-[-20px_0_40px_rgba(0,0,0,0.05)] transition-transform duration-500 ease-out transform border-l border-slate-100 ${showPanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">신규 지식 등록</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Add new knowledge for AI learning</p>
              </div>
              <button 
                onClick={() => setShowPanel(false)} 
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">지식 제목</label>
                <input 
                  type="text" 
                  value={kbTitle}
                  onChange={(e) => setKbTitle(e.target.value)}
                  placeholder="예: 2024년 신규 서비스 이용 약관"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 transition-all shadow-inner font-medium"
                />
              </div>

              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-600">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">지식 상세 내용</label>
                <textarea 
                  rows={12}
                  value={kbContent}
                  onChange={(e) => setKbContent(e.target.value)}
                  placeholder="AI가 학습할 구체적인 내용을 입력해주세요."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 transition-all shadow-inner font-medium leading-relaxed"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex space-x-3 bg-slate-50/30">
              <button 
                onClick={() => setShowPanel(false)} 
                className="flex-1 py-4 px-4 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-white transition-all active:scale-95"
              >
                취소
              </button>
              <button 
                onClick={handleRegisterClick} 
                className="flex-1 py-4 px-4 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                등록하기
              </button>
            </div>

            {/* Confirmation Overlay within Panel */}
            {showConfirm && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
                <div 
                  className="absolute inset-0 bg-slate-900/5 backdrop-blur-md"
                  onClick={() => setShowConfirm(false)}
                />
                <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-xs overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
                  <div className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">지식 등록 확인</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        입력하신 내용을 새로운 지식으로<br />
                        등록하시겠습니까?
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <button 
                        onClick={handleConfirm}
                        className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                      >
                        확인
                      </button>
                      <button 
                        onClick={() => setShowConfirm(false)}
                        className="w-full px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all active:scale-95"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

