
import React, { useState, useEffect, useRef } from 'react';
import { PageType } from '../types';

interface OnboardingProps {
  onComplete: (isFinalAction?: boolean) => void;
  onNavigate: (page: PageType) => void;
  onStepAction?: (stepIndex: number) => void;
}

interface Step {
  title: string;
  description: string;
  position: 'right' | 'left' | 'bottom' | 'top' | 'center';
  selector?: string;
  page?: PageType;
}

const steps: Step[] = [
  {
    title: "Focus-Flow 업데이트 가이드",
    description: "관리 시스템이 더 직관적이고 안정적인 인터페이스로 업그레이드되었습니다. 시스템 전반의 주요 개선 사항을 안내해 드립니다.",
    position: 'center'
  },
  {
    title: "마우스 오버 애니메이션과 같은 직관적인 인터페이스",
    description: "콘텐츠 페이드 인 효과 대신, 실시간 차트 애니메이션과 마우스 오버 반응 등 사용자의 동작에 즉각 응답하는 시각적 피드백이 강화되었습니다.",
    position: 'bottom',
    selector: '[data-tour="dashboard-main"]',
    page: 'dashboard'
  },
  {
    title: "끊김 없는 화면 전환",
    description: "사이드바 네비게이션을 고정하여 페이지 이동 시 레이아웃 흔들림(FOUC)을 방지하고, 우측 콘텐츠만 부드럽게 교체되는 최적화된 전환 환경을 제공합니다.",
    position: 'right',
    selector: '[data-tour="sidebar-fixed"]'
  },
  {
    title: "마이크로 인터렉션",
    description: "콘텐츠 페이드 인을 제거하는 대신 사용자와 상호작용할 수 있는 요소에 마이크로 인터렉션을 추가하여 더욱 직관적인 UI를 형성했습니다.",
    position: 'bottom',
    selector: '[data-tour="ai-config-section"]',
    page: 'ai-basic'
  },
  {
    title: "모달 노출 테스트 버튼",
    description: "",
    position: 'bottom',
    selector: '[data-tour="alex-johnson-row"]',
    page: 'chat-manage'
  },
  {
    title: "상세 정보 패널",
    description: "상세 정보는 이제 우측에 고정 노출됩니다. 기존 모달이 닫힐 때 발생하던 콘텐츠 유실이나 레이아웃 깨짐 현상을 방지하도록 설계되었습니다.",
    position: 'left',
    selector: '[data-tour="detail-panel"]',
    page: 'chat-manage'
  },
  {
    title: "예측 가능한 상호작용",
    description: "상태 변화나 작업 결과에 따른 인터렉션을 우측으로 고정하여, 사용자가 시스템의 반응을 명확히 예측할 수 있도록 개선했습니다.",
    position: 'left',
    selector: '[data-tour="panel-save-btn"]',
    page: 'chat-manage'
  },
  {
    title: "언제 어디서나 접근 가능한 저장 버튼",
    description: "설정 항목이 많아 스크롤이 길어져도 걱정하지 마세요. 하단에 고정된 저장 바를 통해 어떤 위치에서든 즉시 설정을 반영할 수 있습니다.",
    position: 'top',
    selector: '[data-tour="fixed-save-bar"]',
    page: 'ai-basic'
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onNavigate, onStepAction }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const trackElement = () => {
    const step = steps[currentStep];
    if (step.selector) {
      const el = document.querySelector(step.selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        
        if (currentStep === 5 && rect.left >= window.innerWidth) {
           rafRef.current = requestAnimationFrame(trackElement);
           return;
        }

        setHighlightRect(prev => {
          if (prev && 
              prev.top === rect.top && 
              prev.left === rect.left && 
              prev.width === rect.width && 
              prev.height === rect.height) {
            return prev;
          }
          return rect;
        });
      }
    } else {
      setHighlightRect(null);
    }
    rafRef.current = requestAnimationFrame(trackElement);
  };

  useEffect(() => {
    const step = steps[currentStep];
    if (step.page) onNavigate(step.page);
    onStepAction?.(currentStep);

    rafRef.current = requestAnimationFrame(trackElement);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentStep, onNavigate]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (currentStep === 4) {
        if (target.closest('[data-tour="alex-johnson-row"]')) {
          handleNext();
        }
      }
      if (currentStep === 6) {
        if (target.closest('[data-tour="panel-save-btn"]')) {
          onComplete(false);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, [currentStep, onComplete]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(true);
    }
  };

  const step = steps[currentStep];

  const overlayStyle: React.CSSProperties = highlightRect ? {
    clipPath: `polygon(
      0% 0%, 0% 100%, 
      ${highlightRect.left}px 100%, 
      ${highlightRect.left}px ${highlightRect.top}px, 
      ${highlightRect.right}px ${highlightRect.top}px, 
      ${highlightRect.right}px ${highlightRect.bottom}px, 
      ${highlightRect.left}px ${highlightRect.bottom}px, 
      ${highlightRect.left}px 100%, 100% 100%, 100% 0%
    )`,
    transition: 'clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  } : {
    transition: 'clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const getTooltipStyle = (): React.CSSProperties => {
    if (!highlightRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    const padding = 24;
    switch (step.position) {
      case 'right': return { top: highlightRect.top, left: highlightRect.right + padding };
      case 'bottom': return { top: highlightRect.bottom + padding, left: highlightRect.left };
      case 'left': 
        const transform = currentStep === 6 ? 'translateY(-100%)' : undefined;
        const top = currentStep === 6 ? highlightRect.top - padding : highlightRect.top;
        return { top, left: highlightRect.left - 320 - padding, transform };
      case 'top': return { top: highlightRect.top - 180 - padding, left: highlightRect.left - 100 };
      default: return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] pointer-events-auto"
        style={overlayStyle}
      />
      <div 
        className="absolute w-80 bg-white rounded-3xl shadow-2xl p-6 pointer-events-auto transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) animate-in fade-in zoom-in-95"
        style={getTooltipStyle()}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded uppercase tracking-widest">Update {currentStep + 1}/{steps.length}</span>
            <button onClick={() => onComplete(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-[15px] font-bold text-slate-900 leading-tight">{step.title}</h3>
            {step.description && (
              <p className="text-[12px] text-slate-500 leading-relaxed font-medium">{step.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <button 
              onClick={handleNext}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              {currentStep === steps.length - 1 ? "시작하기" : "다음 단계"}
            </button>
          </div>
          {currentStep === 4 && (
            <div className="pt-1 flex items-center justify-center">
              <p className="text-[10px] text-indigo-500 font-black animate-pulse uppercase tracking-tight">하이라이트된 행을 클릭해보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
