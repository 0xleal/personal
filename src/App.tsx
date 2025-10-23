import { useEffect, useState } from 'react'
import './style.css'

function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if typing regular characters (not special keys)
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (!hasTriggered) {
          setShowEasterEgg(true)
          setHasTriggered(true)

          // Fade out and hide after 5 seconds
          setTimeout(() => {
            setShowEasterEgg(false)
            setHasTriggered(false)
          }, 5000)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [hasTriggered])

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
        <div className="terminal-title">0xleal@terminal</div>
      </div>

      <div className="terminal-content">
        <div className="profile-section">
          <img src="/profile.jpg" alt="0xleal" className="profile-image" />
          <div className="profile-text">
            <div className="title">
              engineer/cofounder of <a href="https://x.com/talentprotocol" target="_blank" rel="noopener noreferrer">@talentprotocol</a>
            </div>
          </div>
        </div>

        <p className="subtitle">
          passionate about tech, chess and muay thai. i enjoy building for myself and others.
        </p>

        <p className="note">
          this domain also hosts my personal self-hosted software.
        </p>

        <nav className="links">
          <a href="https://x.com/0x_leal" target="_blank" rel="noopener noreferrer">x/twitter</a>
          <a href="https://github.com/0xleal" target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://farcaster.xyz/leal.eth" target="_blank" rel="noopener noreferrer">farcaster</a>
        </nav>

        <div className="prompt" id="prompt">
          <span className="prompt-symbol">$</span>
          <span className="cursor"></span>
        </div>
        <div className={`easter-egg ${showEasterEgg ? 'show' : ''}`} id="easter-egg">
          you thought this would do something ugh? well maybe some day it will
        </div>
      </div>
    </div>
  )
}

export default App
