import React from 'react'
import chatgptIcon from '../assets/chatgpt.png'
import messageIcon from '../assets/message.svg'
import bookmarkIcon from '../assets/bookmark.svg'
import rocketIcon from '../assets/rocket.svg'

function Sidebar({ sidebarOpen, onCloseSidebar, onNewChat, onSelectQuery, onShowSaved, onShowUpgrade, onShowSettings }) {
  // Helper to trigger callback and close sidebar on mobile
  const handleAction = (callback) => {
    callback?.();
    onCloseSidebar?.();
  };

  return (
    <div className={`fixed md:static inset-y-0 left-0 z-50 w-[320px] max-w-[320px] min-w-[320px] h-screen bg-sidebar-bg border-r border-accent-teal/8 flex flex-col p-[3rem_2.4rem] justify-between transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex flex-col gap-[3.5rem] flex-grow">
        <div className="flex flex-col gap-[3rem]">
          <div className="flex items-center gap-[1.2rem] select-none pl-[0.5rem]">
            <img src={chatgptIcon} alt="ChatGPT Logo" className="w-[3.8rem] h-[3.8rem] inline-block object-contain" />
            <span className="text-[2.8rem] font-medium text-white font-display tracking-[-0.02em]">CloneAI</span>
          </div>
          <button className="w-full h-[5.6rem] flex items-center justify-center gap-[1rem] bg-gradient-to-br from-accent-teal-light to-accent-teal-dark border-none rounded-lg text-white text-[1.8rem] font-semibold font-display cursor-pointer transition-all duration-250 ease-out hover:from-accent-teal hover:to-accent-teal-deep hover:shadow-[0_4px_20px_rgba(20,184,166,0.45)] active:scale-97" onClick={() => handleAction(onNewChat)}>
            <svg className="w-[2.2rem] h-[2.2rem] stroke-white stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>
        <div className="flex flex-col gap-[1.2rem]">
          <button className="w-full h-[5.2rem] flex items-center gap-[1.4rem] bg-transparent border border-accent-teal/15 rounded-lg text-white/85 text-[1.5rem] font-normal font-chat px-[1.8rem] cursor-pointer transition-all duration-250 ease-out text-left hover:bg-accent-teal/[0.06] hover:border-accent-teal/35 hover:text-[#e6fffa]" onClick={() => handleAction(() => onSelectQuery?.('What is Programming?'))}>
            <img src={messageIcon} alt="message icon" className="w-[1.8rem] h-[1.8rem]" />
            What is Programming?
          </button>
          <button className="w-full h-[5.2rem] flex items-center gap-[1.4rem] bg-transparent border border-accent-teal/15 rounded-lg text-white/85 text-[1.5rem] font-normal font-chat px-[1.8rem] cursor-pointer transition-all duration-250 ease-out text-left hover:bg-accent-teal/[0.06] hover:border-accent-teal/35 hover:text-[#e6fffa]" onClick={() => handleAction(() => onSelectQuery?.('How to use API?'))}>
            <img src={messageIcon} alt="message icon" className="w-[1.8rem] h-[1.8rem]" />
            How to use API?
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[2.2rem] pt-[3rem] border-t border-accent-teal/15">
        <button className="w-full flex items-center gap-[1.8rem] bg-transparent border-none text-white/85 text-[1.6rem] font-medium font-display cursor-pointer p-[0.6rem_0.5rem] transition-all duration-250 ease-out text-left rounded hover:text-accent-teal hover:bg-accent-teal/[0.04] hover:pl-[1rem]" onClick={() => handleAction(onShowSaved)}>
          <img src={bookmarkIcon} alt="bookmark icon" className="w-[1.8rem] h-[1.8rem]" />
          Saved
        </button>
        <button className="w-full flex items-center gap-[1.8rem] bg-transparent border-none text-white/85 text-[1.6rem] font-medium font-display cursor-pointer p-[0.6rem_0.5rem] transition-all duration-250 ease-out text-left rounded hover:text-accent-teal hover:bg-accent-teal/[0.04] hover:pl-[1rem]" onClick={() => handleAction(onShowSettings)}>
          <svg className="w-[1.8rem] h-[1.8rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          API Settings
        </button>
        <button className="w-full flex items-center gap-[1.8rem] bg-transparent border-none text-white/85 text-[1.6rem] font-medium font-display cursor-pointer p-[0.6rem_0.5rem] transition-all duration-250 ease-out text-left rounded hover:text-accent-teal hover:bg-accent-teal/[0.04] hover:pl-[1rem]" onClick={() => handleAction(onShowUpgrade)}>
          <img src={rocketIcon} alt="rocket icon" className="w-[1.8rem] h-[1.8rem]" />
          Upgrade to Pro
        </button>
      </div>
    </div>
  )
}

export default Sidebar