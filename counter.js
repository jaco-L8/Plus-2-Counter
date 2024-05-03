let counterValue = 0; // Initialize counter variable
let queryName = "gcEJjU";


// Function to insert the counter and start the intervals
function insertCounter() {
    const chatHeader = document.querySelector(`.${queryName}`);
    if (chatHeader) {
        // Check if a chat-counter already exists and remove it
        const existingCounter = document.querySelector('#chat-counter');
        if (existingCounter) {
            existingCounter.remove();
        }

        const counterDiv = document.createElement('div');
        counterDiv.setAttribute('id', 'chat-counter');
        counterDiv.textContent = ` (${counterValue}) `;
        chatHeader.parentNode.insertBefore(counterDiv, chatHeader.nextSibling);
        // Once inserted, disconnect the observer
        observer.disconnect();
        observeNewMessages(counterDiv);
    }
}

// Function to observe new messages and adjust the counter
function observeNewMessages(counterDiv) {
    const chat = document.querySelector('.chat-scrollable-area__message-container');
    if (!chat) return;

    const chatObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.querySelector('.text-fragment')) {
                    const messageText = node.querySelector('.text-fragment').textContent;
                    if (messageText === "+2" || messageText === "-2") {
                        counterValue += messageText === "+2" ? 2 : -2;
                        counterDiv.textContent = ` (${counterValue}) `;
                        // Add shake animation
                        counterDiv.classList.add('shake');
                        // Remove the class after the animation completes
                        setTimeout(() => counterDiv.classList.remove('shake'), 500); // 500ms = animation duration
                    }
                }
            });
        });
    });

    chatObserver.observe(chat, { childList: true });
}


const observer = new MutationObserver((mutationsList, observer) => {
    if (document.querySelector(`.${queryName}`)) {
        insertCounter();
    }
});

observer.observe(document.body, { childList: true, subtree: true });


