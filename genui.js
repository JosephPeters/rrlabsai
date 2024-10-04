(function () {
    // Load Tailwind CSS
    var tailwindLink = document.createElement('link');
    tailwindLink.rel = 'stylesheet';
    tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    document.head.appendChild(tailwindLink);
  
    // Create chatbot button and popup
    var chatbotButton = document.createElement("button");
    chatbotButton.innerHTML = "Chat with AI";
    chatbotButton.className = "fixed bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg z-50";
  
    var chatbotPopup = document.createElement("div");
    chatbotPopup.className = "hidden fixed bottom-20 right-5 w-80 h-96 bg-white border border-gray-300 shadow-lg z-50 p-4 flex flex-col"; // Hidden initially
  
    // Create input and message display
    var messageContainer = document.createElement("div");
    messageContainer.className = "flex-1 overflow-y-auto mb-2"; // Scrollable container
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your message...";
    input.className = "w-full p-2 border border-gray-300 rounded mb-2"; // Input styling
  
    var sendButton = document.createElement("button");
    sendButton.innerHTML = "Send";
    sendButton.className = "bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"; // Send button styling
  
    chatbotPopup.appendChild(messageContainer);
    chatbotPopup.appendChild(input);
    chatbotPopup.appendChild(sendButton);
  
    // Append to body
    document.body.appendChild(chatbotButton);
    document.body.appendChild(chatbotPopup);
  
    // Toggle popup
    chatbotButton.addEventListener("click", function () {
      chatbotPopup.classList.toggle("hidden");
    });
  
    // Send message to AI
    sendButton.addEventListener("click", async function () {
      var message = input.value;
      if (message.trim() === "") return;
  
      // Add user message to chat
      var userMessage = document.createElement("div");
      userMessage.innerHTML = "You: " + message;
      userMessage.className = "mb-2 p-2 bg-gray-200 rounded"; // User message styling
      messageContainer.appendChild(userMessage);
  
      // Call AI backend
      const response = await fetch("https://hook.us2.make.com/f4qi16fou5mluek1p4hl1bw989tnddz0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_value: message }),
      });
  
      const data = await response.json();
      
      // Display AI response
      var aiMessage = document.createElement("div");
      aiMessage.innerHTML = "AI: " + data.text;
      aiMessage.className = "mb-2 p-2 bg-blue-100 rounded"; // AI message styling
      messageContainer.appendChild(aiMessage);
  
      // Scroll to the bottom of the message container
      messageContainer.scrollTop = messageContainer.scrollHeight;
  
      input.value = "";
    });
  })();