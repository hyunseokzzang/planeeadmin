
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', users: 400, conversations: 240 },
  { name: 'Tue', users: 300, conversations: 320 },
  { name: 'Wed', users: 600, conversations: 450 },
  { name: 'Thu', users: 800, conversations: 590 },
  { name: 'Fri', users: 500, conversations: 480 },
  { name: 'Sat', users: 900, conversations: 720 },
  { name: 'Sun', users: 1100, conversations: 850 },
];

const distributionData = [
  { label: 'General Inquiries', count: 27, percent: 57.4 },
  { label: 'Recruitment', count: 7, percent: 14.9 },
  { label: 'Provided Services', count: 4, percent: 8.5 },
  { label: 'Organization Info', count: 4, percent: 8.5 },
  { label: 'Policies & Rules', count: 3, percent: 6.4 },
];

interface DashboardProps {
  onboardingStep?: number;
}

// 수치 애니메이션 컴포넌트 (Query Distribution 전용)
const CountUp: React.FC<{ value: number; duration?: number; decimals?: number; suffix?: string }> = ({ 
  value, 
  duration = 1500, 
  decimals = 0,
  suffix = "" 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      setDisplayValue(easeOutQuad(progress) * value);
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{displayValue.toFixed(decimals)}{suffix}</span>;
};

export const Dashboard: React.FC<DashboardProps> = ({ onboardingStep }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    let interval: number;
    if (onboardingStep === 1) {
      interval = window.setInterval(() => {
        setAnimationKey(prev => prev + 1);
        setIsLoaded(false);
        setTimeout(() => setIsLoaded(true), 50);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [onboardingStep]);

  const stats = [
    { id: 'users', label: 'Active Users', value: '1,284', trend: '+12.5%', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: '#4f46e5' },
    { id: 'conversations', label: 'Conversations', value: '42.8k', trend: '+5.2k', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: '#10b981' },
    { id: 'response', label: 'Avg. Response', value: '184ms', trend: '-24ms', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: '#f59e0b' },
    { id: 'success', label: 'Success Rate', value: '99.9%', trend: 'Stable', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: '#ef4444' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500" data-tour="dashboard-main">
      <div className="flex flex-col space-y-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h2>
        <p className="text-slate-500 text-sm font-medium">Real-time system performance and query distribution.</p>
      </div>

      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={`${stat.id}-${animationKey}`} 
            onMouseEnter={() => setHoveredKey(stat.id)}
            onMouseLeave={() => setHoveredKey(null)}
            className={`bg-white p-6 rounded-3xl border transition-all duration-500 group animate-in zoom-in-95 fade-in cursor-pointer
              ${hoveredKey === stat.id ? 'border-indigo-200 shadow-xl scale-[1.02]' : 'border-slate-100 shadow-sm hover:shadow-md'}
              ${hoveredKey && hoveredKey !== stat.id ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'}
            `} 
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{ 
                  backgroundColor: hoveredKey === stat.id ? stat.color : '#f8fafc',
                  color: hoveredKey === stat.id ? 'white' : '#94a3b8'
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg bg-slate-50 ${stat.trend.startsWith('+') ? 'text-emerald-600' : stat.trend.startsWith('-') ? 'text-indigo-600' : 'text-slate-400'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tighter transition-transform duration-300 group-hover:translate-x-2">
                {stat.value}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Traffic Overview</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-[10px] font-bold bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/10 active:scale-95 transition-transform">WEEKLY</button>
              <button className="px-3 py-1.5 text-[10px] font-bold bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors active:scale-95 transition-transform">MONTHLY</button>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} key={animationKey}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 700}}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#4f46e5" 
                  strokeWidth={hoveredKey === 'users' ? 6 : 4} 
                  fill="url(#colorUsers)" 
                  animationDuration={1500}
                  strokeOpacity={hoveredKey === 'users' || !hoveredKey ? 1 : 0.1}
                  fillOpacity={hoveredKey === 'users' || !hoveredKey ? 1 : 0.05}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="#10b981" 
                  strokeWidth={hoveredKey === 'conversations' ? 6 : 4} 
                  fill="url(#colorConversations)" 
                  animationDuration={1500}
                  strokeOpacity={hoveredKey === 'conversations' || !hoveredKey ? 1 : 0.1}
                  fillOpacity={hoveredKey === 'conversations' || !hoveredKey ? 1 : 0.05}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Query Distribution: 막대 차오름(width) 애니메이션 + 수치 카운트 애니메이션 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-full animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Query Distribution</h3>
            <button className="text-[10px] font-black text-indigo-500 hover:text-indigo-600 flex items-center tracking-widest uppercase">
              Full Report <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {distributionData.map((item, idx) => (
              <div key={`${idx}-${animationKey}`} className="flex flex-col space-y-2 group">
                <div className="flex justify-between items-end">
                  <span className="text-[12px] font-bold text-slate-700">{item.label}</span>
                  <span className="text-[11px] font-black text-slate-400">
                    <CountUp value={item.percent} decimals={1} suffix="%" />
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-[1500ms] ease-out"
                    style={{ 
                      width: isLoaded ? `${item.percent}%` : '0%',
                      transitionDelay: `${idx * 100}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Queries</span>
              <span className="text-xl font-black text-slate-900 tracking-tighter">
                <CountUp value={47} /> <span className="text-xs text-slate-400 font-bold tracking-normal">units</span>
              </span>
            </div>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
