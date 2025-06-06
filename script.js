document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotBox = document.getElementById('chatbot-box');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');

    let isChatboxOpen = false;
    let initialGreetingSent = false;

    const responses = {
        "who are you": "I’m Chitikeshi Mahesh, a B.Tech CSE (AI & ML) student at SR University, passionate about AI/ML, web dev, and problem solving.",
        "what are your skills": "I work with Python, Java, JS, SQL, Git, AWS, and have strong DSA, Web Dev, and ML skills.",
        "show me your projects": `Here are some of Mahesh's projects:
            <ul>
                <li>Portfolio Website</li>
                <li>DSA Resource Website</li>
                <li>Diary Web App</li>
                <li>Code Auto Typer</li>
                <li><a href="https://github.com/chitikeshimahesh" target="_blank" rel="noopener noreferrer">GitHub Projects</a></li>
            </ul>`,
        "how can I contact you": "You can email Mahesh at <a href='mailto:chitikeshimahesh6@gmail.com'>chitikeshimahesh6@gmail.com</a> or visit his <a href='https://www.linkedin.com/in/chitikeshimahesh/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>.",
        "achievements": "Mahesh secured 2nd place in Anveshan Hackathon, received an Academic Excellence Award, and gained recognition at an Innovation Expo.",
        "greetings": "Hey there! How can I help you explore Mahesh’s portfolio?"
    };

    const greetingKeywords = ["hi", "hello", "hey", "hlo", "hii"];

    function toggleChatbot() {
        isChatboxOpen = !isChatboxOpen;
        if (isChatboxOpen) {
            chatbotBox.classList.add('open');
            chatbotIcon.style.display = 'none'; // Hide icon when chatbox is open
            if (!initialGreetingSent) {
                setTimeout(() => { // Slight delay for effect
                    addMessageToChat("Hey there! How can I help you explore Mahesh’s portfolio?", 'bot');
                }, 300);
                initialGreetingSent = true;
            }
            chatbotInput.focus();
        } else {
            chatbotBox.classList.remove('open');
            chatbotIcon.style.display = 'flex'; // Show icon when chatbox is closed
        }
    }

    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
        
        if (sender === 'bot') {
            // Sanitize HTML slightly for bot messages to allow links and lists
            // This is a very basic sanitizer. For production, consider a robust library.
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = message;
            // Allow only specific tags like a, ul, li, b, i, strong, em
            const allowedTags = ['A', 'UL', 'LI', 'B', 'I', 'STRONG', 'EM', 'P', 'BR'];
            tempDiv.querySelectorAll('*').forEach(el => {
                if (!allowedTags.includes(el.tagName)) {
                    el.parentNode.removeChild(el); // Basic sanitization
                }
                if(el.tagName === 'A') {
                    el.setAttribute('target', '_blank'); // Ensure links open in new tab
                    el.setAttribute('rel', 'noopener noreferrer');
                }
            });
            messageElement.innerHTML = tempDiv.innerHTML;
        } else {
            messageElement.textContent = message;
        }
        
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll
    }

    function getBotResponse(userInput) {
        const lowerInput = userInput.toLowerCase().trim();

        if (greetingKeywords.some(keyword => lowerInput.startsWith(keyword))) {
            return responses.greetings;
        }

        for (const query in responses) {
            // Use .includes() for more flexible matching of keywords within the query
            if (query !== "greetings" && lowerInput.includes(query.replace("show me your ", "").replace("what are your ", "").replace("who are you", "who are you").split(" ")[0])) { // simplified matching
                 return responses[query];
            }
        }
        // More specific checks
        if (lowerInput.includes("who are you") || lowerInput.includes("about yourself")) {
            return responses["who are you"];
        }
        if (lowerInput.includes("skill") || lowerInput.includes("skills") || lowerInput.includes("proficient")) {
            return responses["what are your skills"];
        }
        if (lowerInput.includes("project") || lowerInput.includes("projects") || lowerInput.includes("work")) {
            return responses["show me your projects"];
        }
        if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("linkedin")) {
            return responses["how can I contact you"];
        }
        if (lowerInput.includes("achievement") || lowerInput.includes("awards") || lowerInput.includes("recognition")) {
            return responses["achievements"];
        }


        return "Sorry, I didn't quite understand that. You can ask about Mahesh's skills, projects, achievements, or how to contact him.";
    }

    function handleSendMessage() {
        const userInput = chatbotInput.value.trim();
        if (userInput === "") return;

        addMessageToChat(userInput, 'user');
        chatbotInput.value = ""; // Clear input

        // Simulate bot thinking delay
        setTimeout(() => {
            const botReply = getBotResponse(userInput);
            addMessageToChat(botReply, 'bot');
        }, 500 + Math.random() * 500); // Random delay between 0.5s and 1s
    }

    chatbotIcon.addEventListener('click', toggleChatbot);
    chatbotCloseBtn.addEventListener('click', toggleChatbot);

    chatbotSendBtn.addEventListener('click', handleSendMessage);
    chatbotInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Optional: Close chatbox if user clicks outside of it
    // document.addEventListener('click', function(event) {
    //     if (isChatboxOpen && !chatbotBox.contains(event.target) && !chatbotIcon.contains(event.target)) {
    //         toggleChatbot();
    //     }
    // });
});
