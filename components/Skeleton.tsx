
import React from 'react';

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-8 animate-pulse">
    {/* Header Skeleton */}
    <div className="space-y-2">
      <div className="h-8 w-64 bg-slate-200 rounded-md"></div>
      <div className="h-4 w-48 bg-slate-100 rounded-md"></div>
    </div>

    {/* Stats Grid Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 h-32 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
            <div className="w-12 h-5 bg-slate-50 rounded border border-slate-100"></div>
          </div>
          <div className="mt-auto space-y-2">
            <div className="h-3 w-16 bg-slate-100 rounded"></div>
            <div className="h-6 w-24 bg-slate-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Chart Grid Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 h-[380px]">
          <div className="h-4 w-32 bg-slate-200 rounded mb-8"></div>
          <div className="h-full w-full bg-slate-50 rounded-lg"></div>
        </div>
      ))}
    </div>
  </div>
);

export const ContentSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="space-y-2">
      <div className="h-8 w-48 bg-slate-200 rounded-md"></div>
      <div className="h-4 w-80 bg-slate-100 rounded-md"></div>
    </div>
    <div className="bg-white border border-slate-100 rounded-2xl p-12 h-96 flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-slate-50 rounded-full mb-6"></div>
      <div className="h-6 w-48 bg-slate-100 rounded mb-4"></div>
      <div className="h-4 w-64 bg-slate-50 rounded"></div>
    </div>
  </div>
);
