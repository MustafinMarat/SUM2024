window.addEventListener("load", (event) => {
  let nameField = document.querySelector("#nameInput");
  let colorField = document.querySelector("#colorInput");
  if (sessionStorage.getItem("name"))
    nameField.value = sessionStorage.getItem("name");
  if (sessionStorage.getItem("color"))
    colorField.value = sessionStorage.getItem("color");
  window.addEventListener("keydown", (event) => {
    if (event.code == "Enter" && nameField.value != "") {
      if (nameField.value.length < 16) {
        sessionStorage.setItem("name", nameField.value);
        sessionStorage.setItem("color", colorField.value);
        window.location.href = "./engine/engine.html";
      } else
        alert("Name needs to be less then 16 symbols!")
    }
  });
});