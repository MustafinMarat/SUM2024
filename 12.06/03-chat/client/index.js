window.addEventListener("load", (event) => {
  let nameField = document.querySelector("#nameInput");
  nameField.addEventListener("keydown", (event) => {
    if (event.code == "Enter" && nameField.value != "") {
      sessionStorage.setItem("name", nameField.value);
      window.location.href = "./chat/chat.html";
    }
  });
});