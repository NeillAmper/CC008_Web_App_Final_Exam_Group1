document.addEventListener('DOMContentLoaded', () => {

    const chatArea = document.getElementById('chat-area');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const notificationCount = document.getElementById('notification-count');

    let notifCount = 1;
    let botMessages = [];


    sendBtn.addEventListener('click', handleSendMessage);

    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    notificationBtn.addEventListener('click', () => {
        populateNotificationPanel();

        notificationPanel.classList.toggle('hidden');

        if (!notificationPanel.classList.contains('hidden')) {
            notifCount = 0;
            notificationCount.textContent = notifCount;
            notificationCount.classList.add('hidden');
        }
    });

    notificationPanel.addEventListener('click', (e) => {

        const item = e.target.closest('.notification-item');
        if (!item) return;

        const messageId = item.dataset.messageId;
        const targetMessage = document.getElementById(messageId);

        if (targetMessage) {

            targetMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });


            targetMessage.classList.add('message-highlight');
            setTimeout(() => {
                targetMessage.classList.remove('message-highlight');
            }, 2000);


            notificationPanel.classList.add('hidden');
        }
    });



    function handleSendMessage() {
        const userMessage = chatInput.value.trim();

        if (userMessage.length > 0) {
            displayMessage(userMessage, 'user');
            chatInput.value = '';


            setTimeout(() => {
                const botReply = getBotResponse(userMessage);
                displayMessage(botReply, 'bot');
            }, 1000);
        }
    }


    function displayMessage(message, sender) {

        const messageElement = document.createElement('div');

        if (sender === 'user') {

            messageElement.className = 'message-wrapper user';


            messageElement.innerHTML = `
                <div class="message user">
                    ${message}
                </div>
            `;
        } else {
            const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


            botMessages.push({ id: messageId, text: message });

            notifCount++;
            notificationCount.textContent = notifCount;
            notificationCount.classList.remove('hidden');

            messageElement.className = 'message-wrapper bot';

            messageElement.id = messageId;

            messageElement.innerHTML = `
                <div class="message bot">
                    ${message}
                </div>
            `;
        }

        chatArea.appendChild(messageElement);


        chatArea.scrollTop = chatArea.scrollHeight;
    }


    function populateNotificationPanel() {

        notificationPanel.innerHTML = '<h3>Notifications</h3>';

        if (botMessages.length === 0) {
            notificationPanel.innerHTML += '<p>No new notifications.</p>';
            return;
        }


        botMessages.slice().reverse().forEach(msg => {

            const truncatedText = msg.text.length > 50 ? msg.text.substring(0, 50) + '...' : msg.text;

            const item = document.createElement('div');

            item.className = 'notification-item';

            item.textContent = truncatedText;
            item.dataset.messageId = msg.id;
            notificationPanel.appendChild(item);
        });
    }


    function getBotResponse(userInput) {
        const processedInput = userInput.toLowerCase();
        let reply = '';

        switch (true) {
            case processedInput.includes('hello') || processedInput.includes('hi'):
                reply = "Hey there! It's good to hear from you. What's on your mind today?";
                break;

            case processedInput.includes('how are you'):
                reply = "I'm just a bunch of code, but I'm functioning perfectly! How about you?";
                break;

            case processedInput.includes('your name'):
                reply = "You can call me E-Dong AI. It's a pleasure to chat with you. What's your name?";
                break;

            case processedInput.includes('javascript') || processedInput.includes('string'):
                reply = `Ah, JavaScript strings! They're super useful. The word "strings" itself has ${"strings".length} characters. Did you know you can create them with 'single quotes', "double quotes", or \`backticks\`? What do you want to know about them?`;
                break;

            case processedInput.includes('search'):
                let example = "Search";
                reply = `Talking about search? Methods like .includes() or .indexOf() are great! For example, 'Search'.indexOf('a') is 1. The first letter, 'Search'.charAt(0), is '${example.charAt(0)}'. Cool, right?`;
                break;

            case processedInput.includes('bye') || processedInput.includes('see ya'):
                reply = "Talk to you later! Have a great day.";
                break;

            default:
                reply = "That's really interesting! Can you tell me more about that?";
                break;
        }

        return reply;
    }


    setTimeout(() => {
        displayMessage("Hello! I'm E-Dong AI, your friendly chat companion. Feel free to ask me anything!", 'bot');
    }, 1000);

});