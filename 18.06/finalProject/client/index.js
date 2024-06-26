window.addEventListener("load", (event) => {
  let nameField = document.querySelector("#nameInput");
  let colorField = document.querySelector("#colorInput");
  nameField.addEventListener("keydown", (event) => {
    if (event.code == "Enter" && nameField.value != "") {
      sessionStorage.setItem("name", nameField.value);
      sessionStorage.setItem("color", colorField.value);
      window.location.href = "./engine/engine.html";
    }
  });
});