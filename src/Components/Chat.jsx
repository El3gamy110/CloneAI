import React, { useState, useEffect, useRef, useMemo } from 'react'
import OpenAI from 'openai'
import userIcon from '../assets/user-icon.png'
import chatgptIcon from '../assets/chatgpt.png'
import sendIcon from '../assets/send.svg'

function Chat({ activeQuery, clearActiveQuery, newChatTrigger, apiKey }) {
  // Memoize OpenAI client to avoid recreating on every render or crashing on load when key is empty
  const openai = useMemo(() => {
    if (!apiKey) return null
    return new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
      dangerouslyAllowBrowser: true // Required for client-side API requests
    })
  }, [apiKey])

  const [messages, setMessages] = useState([
    {
      sender: 'gpt',
      text: 'Hello, I am CloneAI. How can I help you today?'
    }
  ])

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom on new messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Clear chat trigger listener from Sidebar
  useEffect(() => {
    if (newChatTrigger > 0) {
      setMessages([
        {
          sender: 'gpt',
          text: 'Hello, I am CloneAI. How can I help you today?'
        }
      ])
      setIsLoading(false)
      setInputValue('')
    }
  }, [newChatTrigger])

  // Select query listener from Sidebar
  useEffect(() => {
    if (activeQuery) {
      sendQuery(activeQuery)
      clearActiveQuery()
    }
  }, [activeQuery])

  const sendQuery = (text) => {
    if (!text.trim() || isLoading) return

    const userMessage = {
      sender: 'user',
      text: text
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)
    runCompletion(updatedMessages)
  }

  const runCompletion = async (currentMessages) => {
    if (!openai) {
      setMessages(prev => [...prev, {
        sender: 'gpt',
        text: 'API Key Error: No active Groq API Key was found. Please open "API Settings" in the sidebar and enter your key to chat.'
      }])
      setIsLoading(false)
      return
    }
    try {
      // Build conversation logs including system prompt and current message history
      const formattedHistory = [
        {
          role: 'system',
          content: 'You are CloneAI, a helpful and friendly AI assistant styled as a clone of ChatGPT.'
        },
        ...currentMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
      ]

      const completion = await openai.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: formattedHistory
      })

      const replyText = completion.choices[0]?.message?.content || 'No response received from the model.'

      setMessages(prev => [...prev, {
        sender: 'gpt',
        text: replyText
      }])
    } catch (error) {
      console.error('Groq API Error:', error)

      let errorMessage = 'An error occurred while contacting the AI server.'
      if (error?.status === 401) {
        errorMessage = 'Authentication Error: The Groq API key provided is invalid or expired. Please check your VITE_GROQ_API_KEY setting in the .env file.'
      } else if (error?.status === 429) {
        errorMessage = 'Quota Limit: Your Groq API rate limits have been exceeded or your billing tier is restricted. Please check your Groq developer dashboard.'
      } else if (error?.message) {
        errorMessage = `Error details: ${error.message}`
      }

      setMessages(prev => [...prev, {
        sender: 'gpt',
        text: errorMessage
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return
    sendQuery(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-brand-bg relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-[6rem_2.4rem_2rem_2.4rem] flex justify-center custom-scrollbar">
        <div className="w-full max-w-[80rem] flex flex-col gap-[3.5rem]">
          {messages.map((msg, index) => (
            msg.sender === 'user' ? (
              <div key={index} className="flex items-start gap-[2.4rem] p-[1rem_0.5rem]">
                <img src={userIcon} alt="User" className="w-[4.4rem] h-[4.4rem] rounded-lg object-cover" />
                <div className="text-[1.6rem] leading-[1.65] text-[#ececf1] font-display pt-[0.5rem]">{msg.text}</div>
              </div>
            ) : (
              <div key={index} className="flex items-start gap-[2.4rem] bg-card-bg border border-accent-teal/8 rounded-xl p-[2.4rem] shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                <div className="rounded-lg w-[4.4rem] h-[4.4rem] min-w-[4.4rem] min-h-[4.4rem] flex items-center justify-center">
                  <img src={chatgptIcon} alt="GPT" className="w-full h-full" />
                </div>
                <div className="flex-1 text-[1.6rem] leading-[1.65] text-[#d1d5db] font-chat whitespace-pre-wrap">{msg.text}</div>
              </div>
            )
          ))}

          {/* Typing/Thinking Loader */}
          {isLoading && (
            <div className="flex items-start gap-[2.4rem] bg-card-bg border border-accent-teal/8 rounded-xl p-[2.4rem] shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
              <div className="rounded-lg w-[4.4rem] h-[4.4rem] min-w-[4.4rem] min-h-[4.4rem] flex items-center justify-center">
                <img src={chatgptIcon} alt="GPT" className="w-full h-full" />
              </div>
              <div className="flex items-center gap-[0.6rem] p-[1.4rem_0.5rem]">
                <span className="w-[0.8rem] h-[0.8rem] bg-accent-teal rounded-full animate-bounce-dot"></span>
                <span className="w-[0.8rem] h-[0.8rem] bg-accent-teal rounded-full animate-bounce-dot [animation-delay:0.15s]"></span>
                <span className="w-[0.8rem] h-[0.8rem] bg-accent-teal rounded-full animate-bounce-dot [animation-delay:0.3s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="p-[2rem_2.4rem_3rem_2.4rem] flex flex-col items-center bg-gradient-to-b from-transparent via-brand-bg/25 to-brand-bg">
        <div className="w-full max-w-[80rem] relative flex items-center">
          <input
            type="text"
            placeholder="Send a message"
            className="w-full h-[5.6rem] bg-card-bg border border-accent-teal/15 rounded-xl pl-[2rem] pr-[6rem] text-white text-[1.6rem] font-display outline-none transition-all duration-250 ease-out shadow-[0_4px_16px_rgba(0,0,0,0.1)] focus:border-accent-teal/40 focus:shadow-[0_4px_20px_rgba(45,212,191,0.1)] placeholder:text-white/35 disabled:opacity-50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button className="absolute right-[1.6rem] bg-transparent border-none cursor-pointer flex items-center justify-center p-[0.8rem] transition-transform duration-200 ease-out hover:scale-110 disabled:pointer-events-none" onClick={handleSend} disabled={isLoading}>
            <img src={sendIcon} alt="Send" className="w-[2rem] h-[2rem] opacity-65 transition-opacity duration-200 ease-out hover:opacity-100" />
          </button>
        </div>
        <div className="mt-[1.2rem] text-[1.2rem] text-white/35 font-display text-center tracking-[0.01em]">
          CloneAI Is Just a Clone Of Groq API Not Groq AI Inc.
        </div>
      </div>
    </div>
  )
}

export default Chat