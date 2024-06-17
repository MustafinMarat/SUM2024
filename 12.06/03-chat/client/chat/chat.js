let authorName;
let socket;

function initializeCommunication() {
  socket = new WebSocket("ws:/localhost:3030");

  socket.onopen = (event) => {
    console.log("Socket open");
    // socket.send("Hello server!");
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

    let messageText = document.createElement("div");
    messageText.className = "messageText";
    messageText.innerText = info.message.trim();

    message.appendChild(author);
    message.appendChild(messageText);
    //message.id = info.id;

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

window.addEventListener("load", () => {
  authorName = sessionStorage.getItem("name");
  document.querySelector("#name").innerText = authorName;
  document.querySelector("#messageSender").addEventListener("click", () => {
    let message = document.querySelector("#messageInput").value.trimStart();
    
    document.querySelector("#messageInput").value = "";

    socket.send(JSON.stringify({ "message": message, "author": authorName }));  
  });
  document.querySelector("#messageInput").addEventListener("keydown", (event) => {
    if (event.code == "Enter" && event.shiftKey == false) {
      let message = document.querySelector("#messageInput").value.trimStart();

      document.querySelector("#messageInput").value = "";

      socket.send(JSON.stringify({ "message": message, "author": authorName }));
    }
  });
});
