import { useState, useEffect } from 'react'
import './App.css'
import SideBar from './Components/sidebar'
import Chat from './Components/Chat'

function App() {
  const [activeQuery, setActiveQuery] = useState('')
  const [newChatTrigger, setNewChatTrigger] = useState(0)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [customAlert, setCustomAlert] = useState(null)

  // Handle auto-dismiss for custom alert toast
  useEffect(() => {
    if (customAlert) {
      const timer = setTimeout(() => {
        setCustomAlert(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [customAlert])

  const triggerAlert = (message, type = 'info') => {
    setCustomAlert({ message, type })
  }

  return (
    <div className="min-h-screen flex bg-brand-bg text-white font-sans antialiased">
      <SideBar 
        onNewChat={() => setNewChatTrigger(prev => prev + 1)}
        onSelectQuery={(query) => setActiveQuery(query)}
        onShowSaved={() => triggerAlert('Saved messages is coming soon as a future feature! Stay tuned.')}
        onShowUpgrade={() => setShowUpgradeModal(true)}
      />
      <Chat 
        activeQuery={activeQuery}
        clearActiveQuery={() => setActiveQuery('')}
        newChatTrigger={newChatTrigger}
      />

      {/* Upgrade to Pro Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-brand-bg/80 backdrop-blur-md flex items-center justify-center z-[1000] animate-modal-fade" onClick={() => setShowUpgradeModal(false)}>
          <div className="bg-sidebar-bg border border-accent-teal/20 rounded-[1.6rem] p-[4rem] w-[90%] max-w-[45rem] relative shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center text-center animate-modal-slide" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-[1.6rem] right-[2rem] bg-transparent border-none text-white/40 text-[2.8rem] cursor-pointer leading-none transition-colors duration-200 hover:text-white" onClick={() => setShowUpgradeModal(false)}>
              &times;
            </button>
            <h2 className="text-[2.4rem] font-semibold text-white font-display mb-[0.8rem] tracking-[-0.01em] mt-[1rem]">Upgrade to CloneAI Pro</h2>
            <p className="text-[1.4rem] text-white/50 mb-[2.4rem] leading-normal">Experience advanced intelligence with zero limitations.</p>
            <div className="flex items-baseline gap-[0.4rem] mb-[3rem]">
              <span className="text-[4.8rem] font-bold text-accent-teal font-display">$20</span>
              <span className="text-[1.6rem] text-white/60">/month</span>
            </div>
            <ul className="w-full list-none flex flex-col gap-[1.6rem] mb-[3.5rem] text-left">
              <li className="flex items-center gap-[1.2rem] text-[1.4rem] text-white/85">
                <svg className="w-[1.8rem] h-[1.8rem] text-accent-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited Llama-3.1 8B responses
              </li>
              <li className="flex items-center gap-[1.2rem] text-[1.4rem] text-white/85">
                <svg className="w-[1.8rem] h-[1.8rem] text-accent-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Faster generation speed (priority execution)
              </li>
              <li className="flex items-center gap-[1.2rem] text-[1.4rem] text-white/85">
                <svg className="w-[1.8rem] h-[1.8rem] text-accent-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Access to GPT-4o and custom models
              </li>
              <li className="flex items-center gap-[1.2rem] text-[1.4rem] text-white/85">
                <svg className="w-[1.8rem] h-[1.8rem] text-accent-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Priority customer support 24/7
              </li>
            </ul>
            <button className="w-full h-[5rem] bg-gradient-to-br from-accent-teal-light to-accent-teal-dark border-none rounded-lg text-white text-[1.6rem] font-semibold font-display cursor-pointer transition-all duration-250 ease-out hover:from-accent-teal hover:to-accent-teal-deep hover:shadow-[0_4px_16px_rgba(20,184,166,0.35)] active:scale-98" onClick={() => {
              triggerAlert('Thank you for subscribing! This is a demo subscription.', 'success')
              setShowUpgradeModal(false)
            }}>
              Subscribe Now
            </button>
          </div>
        </div>
      )}

      {/* Custom Toast Alert */}
      {customAlert && (
        <div 
          className={`fixed top-[3rem] left-2/3 -translate-x-1/2 z-[2000] flex items-center gap-[1.2rem] p-[1.4rem_2.4rem] rounded-xl bg-sidebar-bg/85 backdrop-blur-[12px] text-white font-display text-[1.4rem] font-medium max-w-[90%] w-max shadow-[0_10px_30px_rgba(0,0,0,0.4)] cursor-pointer select-none animate-toast-in transition-all duration-200 hover:bg-[#061e22]/95 hover:scale-102 active:scale-98 ${
            customAlert.type === 'success' 
              ? 'border border-[#10b981]/35 shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_15px_rgba(16,185,129,0.15)]' 
              : 'border border-accent-teal/35 shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_15px_rgba(45,212,191,0.15)]'
          }`} 
          onClick={() => setCustomAlert(null)}
        >
          <div className={`flex items-center justify-center flex-shrink-0 ${customAlert.type === 'success' ? 'text-[#10b981]' : 'text-accent-teal'}`}>
            {customAlert.type === 'success' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-[2.2rem] h-[2.2rem]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-[2.2rem] h-[2.2rem]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <span className="leading-none tracking-[0.01em]">{customAlert.message}</span>
        </div>
      )}
    </div>
  )
}

export default App
