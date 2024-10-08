(function () {
    // Load Tailwind CSS
    var tailwindLink = document.createElement('link');
    tailwindLink.rel = 'stylesheet';
    tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    document.head.appendChild(tailwindLink);


    // Create chatbot button (unchanged)
    var chatbotButton = document.createElement("button");
    chatbotButton.innerHTML = "Chat with AI";
    chatbotButton.className = "fixed bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg z-50";
    chatbotButton.id = "chat-button";

    // Create new full-screen container (removed background color)
    var chatbotContainer = document.createElement("div");
    chatbotContainer.className = "fixed inset-0 z-50 hidden transform translate-y-full transition-transform duration-300 ease-in-out";
    chatbotContainer.id = "chat-container";

    // Create top transparent div with close button
    var topDiv = document.createElement("div");
    topDiv.className = "w-full h-20 bg-black bg-opacity-20 flex justify-end items-center px-4 relative";
    topDiv.id = "chat-top-div";

    // Add a pseudo-element for the blur effect
    var style = document.createElement('style');
    style.textContent = `
      #chat-top-div::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        backdrop-filter: blur(4px);
        z-index: -1;
      }
      #chat-content {
        height: calc(100vh - 5rem);
      }
      #ai-message > div {
        background-color: rgb(255 255 255/var(--tw-bg-opacity));
        border-radius: 1.5rem;
        --tw-shadow: 0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;
        --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
        padding: 1.5rem 2rem;
        margin-bottom: 2rem;
      }
    `;
    
    document.head.appendChild(style);

    var closeButton = document.createElement("button");
    closeButton.innerHTML = "×";
    closeButton.className = "bg-white text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 rounded-full shadow";
    closeButton.id = "close-button";

    topDiv.appendChild(closeButton);

    // Create parent div for chat input and messages
    var chatContentDiv = document.createElement("div");
    chatContentDiv.className = "w-full flex-1 flex flex-col bg-gray-100 overflow-y-auto";
    chatContentDiv.id = "chat-content";

    // Create white background div for chat input
    var inputDiv = document.createElement("div");
    inputDiv.className = "bg-white w-1/2 p-4 mt-16 rounded-full mx-auto"; // Added mx-auto
    inputDiv.id = "chat-input-div";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your message...";
    input.className = "w-full p-2 rounded-full";
    input.id = "chat-input";

    inputDiv.appendChild(input);

    // Create div for chat messages
    var messageContainer = document.createElement("div");
    messageContainer.className = "flex-1 p-4 w-3/4 mx-auto";
    messageContainer.id = "chat-messages";

    // Assemble the container
    chatContentDiv.appendChild(inputDiv);
    chatContentDiv.appendChild(messageContainer);


    chatbotContainer.appendChild(topDiv);
    chatbotContainer.appendChild(chatContentDiv);

    // Append to body
    document.body.appendChild(chatbotButton);
    document.body.appendChild(chatbotContainer);

    // Toggle popup with slide-up animation
    chatbotButton.addEventListener("click", function () {
        chatbotContainer.classList.remove("hidden");
        chatbotButton.classList.add("hidden");
        setTimeout(() => {
            chatbotContainer.classList.remove("translate-y-full");
        }, 10);
    });

    // Close popup with slide-down animation
    closeButton.addEventListener("click", function () {
        chatbotContainer.classList.add("translate-y-full");
        setTimeout(() => {
            chatbotContainer.classList.add("hidden");
            chatbotButton.classList.remove("hidden");
        }, 300);
    });

    // Function to send message to AI
    async function sendMessage() {
        var message = input.value;
        if (message.trim() === "") return;

        // Add user message to chat
        //var userMessage = document.createElement("div");
        //userMessage.innerHTML = "You: " + message;
        // userMessage.className = "mb-2 p-2 bg-gray-200 rounded"; // User message styling
        //messageContainer.appendChild(userMessage);

        // Clear input immediately after sending
        input.value = "";

        // Call AI backend
        const response = await fetch("https://hook.us2.make.com/f4qi16fou5mluek1p4hl1bw989tnddz0", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: message }),
        });

        const data = await response.json();

        // Display AI response
        var aiMessage = document.createElement("div");
        aiMessage.innerHTML = data.text;// AI message styling
        aiMessage.id = "ai-message";
        messageContainer.appendChild(aiMessage);

        // Scroll to the bottom of the message container
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Add event listener for Enter key press
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    // Remove send button event listener

})();