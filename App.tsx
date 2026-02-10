
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { UserManagement } from './components/UserManagement';
import { AIBasicSettings } from './components/AIBasicSettings';
import { PlaceholderView } from './components/PlaceholderView';
import { Toast, ToastType } from './components/Toast';
import { ToastTest } from './components/ToastTest';
import { Onboarding } from './components/Onboarding';
import { PageType } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [toasts, setToasts] = useState<{id: string, message: string, type: ToastType}[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(-1);
  const [triggerSaveAction, setTriggerSaveAction] = useState(false);
  const [triggerSelectAction, setTriggerSelectAction] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('ff_visited_v2');
    if (!hasVisited) {
      setShowOnboarding(true);
    }
  }, []);

  const startOnboarding = () => {
    setShowOnboarding(true);
    setOnboardingStep(0);
  };

  const completeOnboarding = (isFinalAction?: boolean) => {
    localStorage.setItem('ff_visited_v2', 'true');
    setShowOnboarding(false);
    setOnboardingStep(-1);
    if (isFinalAction) {
      setTriggerSaveAction(true);
    }
  };

  const handleStepAction = (stepIndex: number) => {
    setOnboardingStep(stepIndex);
    // 5/7(index 4)에서 설명 후, 6/7(index 5)로 넘어갈 때 패널을 열도록 수정
    if (stepIndex === 5) {
      setTriggerSelectAction(true);
    }
  };

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  const handlePageChange = useCallback((page: PageType) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    
    const mainContent = document.getElementById('main-scroll-view');
    if (mainContent) mainContent.scrollTop = 0;
  }, [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': 
        return <Dashboard onboardingStep={onboardingStep} />;
      case 'chat-manage': 
        return (
          <UserManagement 
            onNotify={showToast} 
            forceSaveTrigger={triggerSaveAction}
            forceSelectTrigger={triggerSelectAction}
            onActionHandled={() => {
              setTriggerSaveAction(false);
              setTriggerSelectAction(false);
            }}
          />
        );
      case 'ai-basic': return <AIBasicSettings onNotify={showToast} />;
      case 'test-toast': return <ToastTest onNotify={showToast} />;
      default: return <PlaceholderView title="준비 중" description="상세 기능을 구현 중입니다." />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden antialiased text-slate-900">
      {showOnboarding && (
        <Onboarding 
          onComplete={completeOnboarding} 
          onNavigate={handlePageChange} 
          onStepAction={handleStepAction}
        />
      )}
      
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={handlePageChange} 
        onRestartGuide={startOnboarding}
      />

      <div className="flex flex-col flex-1 min-w-0 bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.01)] relative">
        <Header currentPage={currentPage} />

        <main 
          id="main-scroll-view" 
          className="flex-1 overflow-y-auto relative bg-[#f8fafc] custom-scrollbar"
        >
          <div className="max-w-7xl mx-auto p-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => removeToast(toast.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
