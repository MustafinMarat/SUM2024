function initializeCommunication() {
  let socket = new WebSocket("ws:/localhost:3030");

  socket.onopen = (event) => {
    console.log("Socket open");
    // socket.send("Hello server!");
    document.querySelector("#messageSender").addEventListener("click", () => {
      let message = document.querySelector("#messageInput").value;
      document.querySelector("#messageInput").value = "";

      socket.send(message);
    });
  };

  socket.onmessage = (event) => {
      let mess = document.createElement("div");
      mess.className = "messageBox";
      mess.innerHTML = event.data;
      let win = document.querySelector("#chatWindow")
      win.appendChild(mess);
      win.scrollTop = win.scrollHeight;
  };
}

initializeCommunication(); 
