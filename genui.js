(function () {
    var tailwindLink = document.createElement('link');
tailwindLink.rel = 'stylesheet';
    tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    document.head.appendChild(tailwindLink);
    // Create chatbot button and popup
    var chatbotButton = document.createElement("button");
    chatbotButton.innerHTML = "Chat with AI";
    chatbotButton.style.position = "fixed";
    chatbotButton.style.bottom = "20px";
    chatbotButton.style.right = "20px";
    chatbotButton.style.zIndex = 9999;
  
    var chatbotPopup = document.createElement("div");
    chatbotPopup.style.display = "none";
    chatbotPopup.style.position = "fixed";
    chatbotPopup.style.bottom = "70px";
    chatbotPopup.style.right = "20px";
    chatbotPopup.style.width = "300px";
    chatbotPopup.style.height = "400px";
    chatbotPopup.style.backgroundColor = "#fff";
    chatbotPopup.style.border = "1px solid #ccc";
    chatbotPopup.style.zIndex = 10000;
    chatbotPopup.style.padding = "10px";
  
    // Create input and message display
    var messageContainer = document.createElement("div");
    messageContainer.style.height = "320px";
    messageContainer.style.overflowY = "scroll";
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your message...";
    var sendButton = document.createElement("button");
    sendButton.innerHTML = "Send";
  
    chatbotPopup.appendChild(messageContainer);
    chatbotPopup.appendChild(input);
    chatbotPopup.appendChild(sendButton);
  
    // Append to body
    document.body.appendChild(chatbotButton);
    document.body.appendChild(chatbotPopup);
  
    // Toggle popup
    chatbotButton.addEventListener("click", function () {
      chatbotPopup.style.display = chatbotPopup.style.display === "none" ? "block" : "none";
    });
  
    // Send message to AI
    sendButton.addEventListener("click", async function () {
      var message = input.value;
      if (message.trim() === "") return;
  
      // Add user message to chat
      var userMessage = document.createElement("div");
      userMessage.innerHTML = "You: " + message;
      messageContainer.appendChild(userMessage);
  
      // Call AI backend
      const response = await fetch("https://hook.us2.make.com/f4qi16fou5mluek1p4hl1bw989tnddz0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_value: message }), // Changed 'message' to 'input_value'
      });
  
      const data = await response.json();
      
      // Display AI response
      var aiMessage = document.createElement("div");
      aiMessage.innerHTML = "AI: " + data.text;
      // Use innerHTML to render the HTML content
      messageContainer.appendChild(aiMessage);

      // Scroll to the bottom of the message container
      messageContainer.scrollTop = messageContainer.scrollHeight;

      input.value = "";
    });
  })();