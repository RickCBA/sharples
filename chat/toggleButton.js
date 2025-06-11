import { centerChatWindow } from './helper/centerChatWindow.js';

const assetBaseUrl = new URL('../assets/', import.meta.url).href;

export function setupToggleButton() {
  const overlay = document.getElementById('chat-overlay');
  const chatToggleButton = document.querySelector(
    '#n8n-chat-widget-2 .chat-window-toggle'
  );

  let manualClicked = false;
  let chatOpened    = false;

  // ─── Check if we've already auto-opened in this session ───
  const hasAutoOpened = sessionStorage.getItem('chatAutoOpened') === 'true';

  // Initial styling
  chatToggleButton.style.backgroundImage = 'none';

  // Show loading spinner
  const loadingAnimation = document.createElement('div');
  loadingAnimation.className = 'loading-animation';
  Object.assign(loadingAnimation.style, {
    display: 'block',
    position: 'fixed',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
  });
  document.body.appendChild(loadingAnimation);

  // Style the toggle button
  Object.assign(chatToggleButton.style, {
    background: 'linear-gradient(to left, #F9B04B, #C97F01, #A05A00)',
    width: '220px',
    height: '64px',
    border: 'none',
    borderRadius: '32px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    color: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
  });
  chatToggleButton.innerHTML = `
    <span style="margin-right: 0.5em; font-size: 1em;">Make an Enquiry</span>
    <img src="${assetBaseUrl}chat-message-icon-svg.svg" alt="Chat Icon" style="width: 1.5em; height: 1.5em;" />
  `;

  // Manual click toggles the overlay
  chatToggleButton.addEventListener('click', () => {
    manualClicked = true;
    chatOpened    = !chatOpened;
    overlay.style.display = chatOpened ? 'block' : 'none';

    if (chatOpened) {
      // ▶ open state styling
      Object.assign(chatToggleButton.style, {
        backgroundImage: `url('${assetBaseUrl}delete.png')`,
        width: '55px',
        height: '55px',
        border: '5px solid #C97F01',
        borderRadius: '50%',
        backgroundColor: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        padding: '0',
      });
      chatToggleButton.innerHTML = '';
      centerChatWindow();
    } else {
      // ◀ closed state styling
      Object.assign(chatToggleButton.style, {
        background: 'linear-gradient(to left, #F9B04B, #C97F01, #A05A00)',
        width: '220px',
        height: '64px',
        border: 'none',
        borderRadius: '32px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        color: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
      });
      chatToggleButton.innerHTML = `
        <span style="margin-right: 10px;">Make an Enquiry</span>
        <img src="${assetBaseUrl}chat-message-icon-svg.svg" alt="Chat Icon" style="width: 30px; height: 30px;" />
      `;
    }
  });

  // ─── Only auto-open if we haven't already this session ───
  if (!hasAutoOpened) {
    setTimeout(() => {
      document.body.removeChild(loadingAnimation);

      if (!manualClicked) {
        chatToggleButton.click();
        overlay.style.display = 'block';
        chatOpened = true;
        centerChatWindow();

        // mark auto-open as done for the rest of this session
        sessionStorage.setItem('chatAutoOpened', 'true');
      }
    }, 2500);
  } else {
    // if already auto-opened, just remove the spinner
    document.body.removeChild(loadingAnimation);
  }
}
