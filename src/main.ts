import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="terminal">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <div class="terminal-button red"></div>
        <div class="terminal-button yellow"></div>
        <div class="terminal-button green"></div>
      </div>
      <div class="terminal-title">0xleal@terminal</div>
    </div>

    <div class="terminal-content">
      <div class="profile-section">
        <img src="/profile.jpg" alt="0xleal" class="profile-image" />
        <div class="profile-text">
          <div class="title">
            engineer/cofounder of <a href="https://x.com/talentprotocol" target="_blank" rel="noopener noreferrer">@talentprotocol</a>
          </div>
        </div>
      </div>

      <p class="subtitle">
        passionate about tech, chess and muay thai. i enjoy building for myself and others.
      </p>

      <p class="note">
        this domain also hosts my personal self-hosted software.
      </p>

      <nav class="links">
        <a href="https://x.com/0x_leal" target="_blank" rel="noopener noreferrer">x/twitter</a>
        <a href="https://github.com/0xleal" target="_blank" rel="noopener noreferrer">github</a>
        <a href="https://farcaster.xyz/leal.eth" target="_blank" rel="noopener noreferrer">farcaster</a>
      </nav>

      <div class="prompt" id="prompt">
        <span class="prompt-symbol">$</span>
        <span class="cursor"></span>
      </div>
      <div class="easter-egg" id="easter-egg">you thought this would do something ugh? well maybe some day it will</div>
    </div>
  </div>
`

// Easter egg interaction
const easterEgg = document.getElementById('easter-egg')
let hasTriggered = false

if (easterEgg) {
  const showEasterEgg = () => {
    if (!hasTriggered) {
      easterEgg.classList.add('show')
      hasTriggered = true

      // Fade out and hide after 5 seconds
      setTimeout(() => {
        easterEgg.classList.remove('show')
        hasTriggered = false
      }, 5000)
    }
  }

  // Trigger on any keyboard input
  document.addEventListener('keydown', (e) => {
    // Only trigger if typing regular characters (not special keys)
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      showEasterEgg()
    }
  })
}
