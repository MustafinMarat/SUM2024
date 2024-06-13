let authorName;

function initializeCommunication() {
  let socket = new WebSocket("ws:/localhost:3030");

  socket.onopen = (event) => {
    console.log("Socket open");
    // socket.send("Hello server!");
    window.addEventListener("load", () => {
      document.querySelector("#messageSender").addEventListener("click", () => {
        let message = document.querySelector("#messageInput").value;
        let author = document.querySelector("#nameInput").value;
        
        if (author != "")
          authorName = author;

        document.querySelector("#messageInput").value = "";

        socket.send(JSON.stringify({"message": message, "author": author}));
      });
      document.querySelector("#messageInput").addEventListener("keydown", (event) => {
        if (event.code == "Enter" && event.shiftKey == false) {
          let message = document.querySelector("#messageInput").value;
          let author = document.querySelector("#nameInput").value;
          
          if (author != "")
            authorName = author;
          
          document.querySelector("#messageInput").value = "";

          socket.send(JSON.stringify({"message": message, "author": author}));
        }
      });
      document.querySelector("#fileInput").addEventListener("change", (event) => {
        let data = URL.createObjectURL(document.querySelector("#fileInput").files[0]);
        socket.send(JSON.stringify({"author": document.querySelector("#nameInput").value, "url": data}))
      });
    });
  };

  socket.onmessage = (event) => {
    let info = JSON.parse(event.data);

    let message = document.createElement("div");
    if (info.author == "System")
      message.className = "messegeBoxSystem";
    else if (info.author == authorName)
      message.className = "messageBoxSelf";
    else
      message.className = "messageBox";
    
    let author = document.createElement("div");
    author.className = "authorName";
    author.innerText = info.author;

    if (info.url == undefined) {
      let messageText = document.createElement("div");
      messageText.className = "messageText";
      messageText.innerText = info.message.trim();
    }
    else {
      let messageText = document.createElement("div");
      messageText.innerHTML = "<img src=\"" + info.message + "\" />";
    }

    message.appendChild(author);
    message.appendChild(messageText);

    let messageTr = document.createElement("tr");
    messageTr.appendChild(message);

    let win = document.querySelector("#chatWindow");
    let chat = document.querySelector("#chatTable");
    chat.appendChild(messageTr);
    
    win.scroll({
      top: win.scrollHeight,
      behavior: "smooth"
    });
  };
}

initializeCommunication(); 
