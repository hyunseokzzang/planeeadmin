
import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { ToastType } from './Toast';

const mockUsers: UserData[] = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Super Admin', status: 'active', lastLogin: '2023-11-20 14:32' },
  { id: 2, name: 'Sarah Miller', email: 'sarah.m@example.com', role: 'Editor', status: 'active', lastLogin: '2023-11-21 09:15' },
  { id: 3, name: 'Minsoo Kim', email: 'minsoo@company.kr', role: 'Viewer', status: 'inactive', lastLogin: '2023-10-15 11:20' },
  { id: 4, name: 'Chloe Brown', email: 'chloe.b@test.com', role: 'Editor', status: 'active', lastLogin: '2023-11-21 16:45' },
  { id: 5, name: 'David Wilson', email: 'david.w@demo.net', role: 'Viewer', status: 'active', lastLogin: '2023-11-21 08:30' },
  { id: 6, name: 'Rachel Green', email: 'rachel@friends.com', role: 'Admin', status: 'active', lastLogin: '2023-11-19 22:10' },
];

interface UserManagementProps {
  onNotify: (msg: string, type?: ToastType) => void;
  forceSaveTrigger?: boolean;
  forceSelectTrigger?: boolean;
  onActionHandled?: () => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ 
  onNotify, 
  forceSaveTrigger,
  forceSelectTrigger,
  onActionHandled 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (forceSelectTrigger) {
      setEditingUser(mockUsers[0]);
      onActionHandled?.();
    }
  }, [forceSelectTrigger, onActionHandled]);

  useEffect(() => {
    if (forceSaveTrigger && editingUser) {
      handleSave();
      onActionHandled?.();
    }
  }, [forceSaveTrigger, editingUser, onActionHandled]);

  const handleSave = () => {
    onNotify('상태가 정상적으로 변경되었습니다.', 'success');
    setEditingUser(null);
  };

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredUsers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredUsers.map(u => u.id)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">대화 및 사용자 관리</h2>
          <p className="text-slate-500 text-sm">시스템 내부 대화 로그 확인 및 사용자 권한을 제어합니다.</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center space-x-2 active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>신규 생성</span>
        </button>
      </div>

      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden relative"
        data-tour="chat-list"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="relative w-80">
            <svg className="w-3.5 h-3.5 absolute left-4 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="이름 또는 이메일로 검색" 
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
                <th className="w-14 px-4 py-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.size === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">사용자 정보</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">계정 상태</th>
                <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">최근 활동</th>
                <th className="w-14 px-4 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user, idx) => (
                <tr 
                  key={user.id} 
                  data-tour={idx === 0 ? "alex-johnson-row" : undefined}
                  className={`hover:bg-slate-50/80 transition-all cursor-pointer group ${selectedIds.has(user.id) ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => setEditingUser(user)}
                >
                  <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] mr-3 shadow-sm group-hover:scale-105 transition-transform">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900 leading-none mb-1">{user.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tight border ${
                      user.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[11px] text-slate-400 font-medium">{user.lastLogin}</td>
                  <td className="px-4 py-4 text-right">
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

      <div 
        className={`fixed inset-0 z-[200] flex justify-end transition-all duration-500 ${editingUser ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div 
          className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]"
          onClick={() => setEditingUser(null)}
        />
        <div 
          className={`relative w-full max-w-lg bg-white h-full shadow-[-20px_0_40px_rgba(0,0,0,0.05)] transition-transform duration-500 ease-out transform border-l border-slate-100 ${editingUser ? 'translate-x-0' : 'translate-x-full'}`}
          data-tour="detail-panel"
        >
          {editingUser && (
            <div className="flex flex-col h-full bg-white">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">사용자 상세 정보</h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Detail insights and configuration</p>
                </div>
                <button 
                  onClick={() => setEditingUser(null)} 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 p-8 space-y-10 overflow-y-auto custom-scrollbar">
                <div className="flex items-center space-x-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-600/20">
                    {editingUser.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">{editingUser.name}</h4>
                    <p className="text-[13px] text-slate-500 font-medium mb-1">{editingUser.email}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                      editingUser.status === 'active' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {editingUser.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">권한 정보</label>
                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span>{editingUser.role}</span>
                      <button className="text-[10px] text-indigo-600 hover:underline">등급 변경</button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">최근 시스템 로그</label>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex justify-between items-center p-3.5 bg-white border border-slate-100 rounded-xl hover:border-indigo-100 transition-colors cursor-default">
                          <div className="flex items-center space-x-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                            <span className="text-[12px] font-medium text-slate-700">{i === 1 ? '로그인 (Chrome/Windows)' : '정보 조회'}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">10분 전</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex space-x-3 bg-slate-50/30">
                <button 
                  onClick={() => setEditingUser(null)} 
                  className="flex-1 py-3.5 px-4 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition-all active:scale-95"
                >
                  취소
                </button>
                <button 
                  data-tour="panel-save-btn"
                  onClick={handleSave} 
                  className="flex-1 py-3.5 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                  업데이트 저장
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
