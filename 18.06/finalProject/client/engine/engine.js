import { vec3 } from "./src/mth/mth_vec3.js";
import { renderer } from "./src/rnd/rnd.js";
import * as unit from "./src/units/units.js";

let playerName, playerColor, players = {}, me;

// Main project function
function main() {
  const rnd = renderer("#glCanvas");

  me = unit.playerUnit(rnd, playerName, playerColor);
  unit.plateUnit(rnd, 30, 0);
  let shoot = unit.shootingUnit(rnd, playerName, playerColor);
  unit.crossUnit(rnd);

  let socket = new WebSocket("ws:/localhost:3030");
  let chatWindow = document.querySelector("#playersWindow");
  {
    let newPlayer = document.createElement('div');
    newPlayer.id = playerName;
    newPlayer.innerText = `${playerName}; kills: 0; deads: 0`;
    newPlayer.style.color = sessionStorage.getItem("color");
    chatWindow.appendChild(newPlayer);
  }

  if (window.socket == undefined)
    window.socket = socket;

  socket.onopen = () => {
    socket.send(JSON.stringify({type: "connect", text: playerName, color: playerColor}));
  };

  socket.onmessage = (event) => {
    let info = JSON.parse(event.data);
    if (info.type == "nameError") {
      alert(info.data)
      window.location.href = "/index.html";
    }
    if (info.type == "newPlayer") {
      players[info.data.name] = unit.enemyUnit(rnd, info.data.name, vec3(info.data.pos), vec3(info.data.color));
      if (info.data.name) {
        let newPlayer = document.createElement('div');
        newPlayer.id = info.data.name;
        newPlayer.innerText = `${info.data.name}; kills: 0; deads: 0`;
        newPlayer.style.color = '#' + [Math.trunc(info.data.color.x * 255), 
                                       Math.trunc(info.data.color.y * 255), 
                                       Math.trunc(info.data.color.z * 255)].map(x => x.toString(16).padStart(2, '0')).join('');
        chatWindow.appendChild(newPlayer);
      }
    }
    if (info.type == "start") {
      for (let character in info.data)  
        if (character != playerName) {
          players[character] = unit.enemyUnit(rnd, character, vec3(info.data[character].pos), vec3(info.data[character].color));
          let newPlayer = document.createElement('div');
          newPlayer.id = character;
          newPlayer.innerText = `${character}; kills: ${info.data[character].kills}; deads: ${info.data[character].deads}`;;
          newPlayer.style.color = '#' + [Math.trunc(info.data[character].color.x * 255), 
                                         Math.trunc(info.data[character].color.y * 255), 
                                         Math.trunc(info.data[character].color.z * 255)].map(x => x.toString(16).padStart(2, '0')).join('');
          chatWindow.appendChild(newPlayer);
        }
    }
    if (info.type == "setPos")
      for (let character in info.data)
        if (character != playerName)
          if (players[character]) {
            players[character].getPos(info.data[character].pos);
            players[character].getDir(info.data[character].dir);
          }
    if (info.type == "die") {
      if (info.data.die == playerName) {
        me.reset();
        socket.send(JSON.stringify({type: "myPos", name: playerName, pos: me.pos, dir: rnd.cam.dir}));
      }
      let msg = document.createElement("div");
      msg.innerText = `\"${info.data.kill}\" killed \"${info.data.die}\"`;
      let msgWin = document.querySelector("#stat")
      msgWin.appendChild(msg);
      msgWin.scrollTop = msgWin.scrollHeight;

      document.getElementById(info.data.kill).innerText = `${info.data.kill}; kills: ${info.data.killInfo.kills}; deads: ${info.data.killInfo.deads}`;
      document.getElementById(info.data.die).innerText = `${info.data.die}; kills: ${info.data.dieInfo.kills}; deads: ${info.data.dieInfo.deads}`;
    }
    if (info.type == "playerClose") {
      players[info.data].close();
      delete players[info.data];
      let toDel =  document.getElementById(info.data);
      toDel.remove();
    }
    if (info.type == "shoot") {
      shoot.addHit(vec3(info.data.start), vec3(info.data.end), vec3(info.data.color));
      if (info.data.hit == playerName) {
        me.hp--;
        document.querySelector("#healthPoints").textContent = `HP: ${me.hp}`;
        document.querySelector("#damage").className = "isDamaged";
        setTimeout(() => {
          document.querySelector("#damage").className = "nonDamaged";
        }, 100);
        if (me.hp <= 0) {
          socket.send(JSON.stringify({type: "die", kill: info.data.name, die: playerName}));
        }
      }
    }
  };

  setInterval(() => {
    socket.send(JSON.stringify({type: "myPos", name: playerName, pos: me.pos, dir: rnd.cam.dir}));
  }, 10);

  setInterval(() => {
    document.querySelector("#title").textContent = `MM6 FPS: ${rnd.timer.FPS}`;
  }, 1000);
} // End of 'main' function


window.addEventListener("load", () => {
  playerName = sessionStorage.getItem("name");
  playerColor = vec3(parseInt(sessionStorage.getItem("color").slice(1, 3), 16) / 255, 
                     parseInt(sessionStorage.getItem("color").slice(3, 5), 16) / 255, 
                     parseInt(sessionStorage.getItem("color").slice(5, 7), 16) / 255);
  main();
});
