
import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Configuration</h2>
        <p className="text-slate-500">Adjust core parameters and interface preferences.</p>
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">High Performance Mode</p>
              <p className="text-xs text-slate-500">Minimize animations to improve response speed on low-end devices.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Compact Interface</p>
              <p className="text-xs text-slate-500">Reduce padding and font sizes for high-density data viewing.</p>
            </div>
            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">Security</h3>
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-4">
            <div className="text-amber-600 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-amber-800">Two-Factor Authentication is currently DISABLED</p>
              <p className="text-xs text-amber-700 mt-1">Enabling 2FA adds an extra layer of security to your management console. We strongly recommend turning it on.</p>
              <button className="mt-3 text-xs font-bold text-amber-900 bg-amber-200/50 px-3 py-1.5 rounded hover:bg-amber-200 transition-colors">Setup 2FA Now</button>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
        <button className="px-6 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">Save Changes</button>
      </div>
    </div>
  );
};
