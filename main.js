import { initChat } from './chat/initChat.js';
import { setupToggleButton } from './chat/toggleButton.js';
import { refreshButton } from './chat/refreshButton.js';
import { getInitialMessages } from './chat/cannedMessages.js';

window.addEventListener('load', () => {
if (window.location.pathname.replace(/\/+$/, '') === '/contact') {
  const overlay = document.getElementById('chat-overlay');
  if (overlay) {
    // set display:none!important
    overlay.style.setProperty('display', 'none', 'important');
  }
  return;
}

  // ─── Otherwise, go ahead and initialize chat ───
  const sessionId = crypto.randomUUID(); // Create a global ID
  window.chatInstance = null;

  initChat(sessionId);            // Function to create chat instance
  setupToggleButton();            // Function to set Toggle button
  refreshButton(getInitialMessages); // Function to trigger getInitialMessages()
  getInitialMessages();           // Function to get initial messages on load
});
