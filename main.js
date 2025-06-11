import { initChat } from './chat/initChat.js';
import { setupToggleButton } from './chat/toggleButton.js';
import { refreshButton } from './chat/refreshButton.js';
import { getInitialMessages } from './chat/cannedMessages.js';

window.addEventListener('load', () => {
  // ─── Bail out on /contact ───
  if (window.location.pathname === '/contact') {
    const overlay = document.getElementById('chat-overlay');
    if (overlay) overlay.style.display = 'none';
    return;  // stop here, skip all chat setup
  }

  // ─── Otherwise, go ahead and initialize chat ───
  const sessionId = crypto.randomUUID(); // Create a global ID
  window.chatInstance = null;

  initChat(sessionId);            // Function to create chat instance
  setupToggleButton();            // Function to set Toggle button
  refreshButton(getInitialMessages); // Function to trigger getInitialMessages()
  getInitialMessages();           // Function to get initial messages on load
});
