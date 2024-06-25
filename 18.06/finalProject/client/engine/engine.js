import { vec3 } from "./src/mth/mth_vec3.js";
import { renderer } from "./src/rnd/rnd.js";
import * as unit from "./src/units/units.js";

let socket, playerName;

// Main project function
function main() {
  const rnd = renderer("#glCanvas");

  unit.playerUnit(rnd);
  unit.plateUnit(rnd, 30, 0);
  unit.shootingUnit(rnd);
  unit.crossUnit(rnd);

  socket = new WebSocket("ws:/localhost:3030");

  socket.onopen = (event) => {
    socket.send(JSON.stringify({type: "name", text: playerName}));
  };

  socket.onmessage = (event) => {
    let info = JSON.parse(event.data);
    if (info.type == "start")
      for (let character of info.data)
        if (character.name != playerName)
          unit.enemyUnit(rnd, vec3(character.pos));
  };

  //unit.testUnit(rnd);
  //unit.controlUnit(rnd);

  setInterval(() => {
    document.querySelector("#title").textContent = `MM6 FPS: ${rnd.timer.FPS}`;
  }, 1000);
} // End of 'main' function


window.addEventListener("load", () => {
  playerName = sessionStorage.getItem("name");
  main();
});
