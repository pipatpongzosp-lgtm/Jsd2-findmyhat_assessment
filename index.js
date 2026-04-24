import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true }); // เพิ่ม sigint ให้กด Ctrl+C ออกได้

const playerChar = "@"; // "ตัวละครปัจจุบัน" 
const pathWalk = "*";   // รอยเท้าที่ทิ้งไว้
const fieldBlock = "░"; // พื้นน้ำแข็ง
const goal = "^";       // เป้าหมาย
const hole = "O";       // หลุม

let config = {
  width: 5,
  height: 5,
  holePercentage: 0.2,
};

class Field {
  _startPosition = {
    x: 0, // 
    y: 0,
  };
  
  _map = [];

  constructor(config) {
    this.config = config;
    this.generateMap();
    this.findStartPosition(); 
  }

 generateMap() {
    // 1. ปูพื้นแผนที่ด้วย "น้ำแข็ง" 🧊 ทั้งหมดก่อน
    this._map = [];
    for (let x = 0; x < this.config.height; x++) {
      let row = [];
      for (let y = 0; y < this.config.width; y++) {
        row.push(fieldBlock);
      }
      this._map.push(row);
    }

    // --- ฟังก์ชันเสริม: สุ่มหา "ช่องว่าง"
    const getRandomEmptyPosition = () => {
      let rx, ry;
      do {
        rx = Math.floor(Math.random() * this.config.height);
        ry = Math.floor(Math.random() * this.config.width);
      } while (this._map[rx][ry] !== fieldBlock); // ถ้าช่องนั้นโดนทับไปแล้ว ให้สุ่มหาพิกัดใหม่
      return { x: rx, y: ry };
    };

  
    const playerPos = getRandomEmptyPosition();
    this._map[playerPos.x][playerPos.y] = pathWalk;

    this._startPosition.x = playerPos.x;
    this._startPosition.y = playerPos.y;

   
    const goalPos = getRandomEmptyPosition();
    this._map[goalPos.x][goalPos.y] = goal;

    
    const mapSize = this.config.width * this.config.height;
    const holeCount = Math.floor((mapSize - 2) * this.config.holePercentage);
    for (let i = 0; i < holeCount; i++) {
      const holePos = getRandomEmptyPosition();
      this._map[holePos.x][holePos.y] = hole;
    }
  }

  findStartPosition() {
    for (let x = 0; x < this.config.height; x++) {
      for (let y = 0; y < this.config.width; y++) {
        if (this._map[x][y] === pathWalk) {
          this._startPosition.x = x;
          this._startPosition.y = y;
          return; 
        }
      }
    }
  }

 printMap() {
    console.clear();
    console.log(`Current position: {${this._startPosition.x}, ${this._startPosition.y}}\n`);
    
    // วาดตาราง
    for (let x = 0; x < this.config.height; x++) {
      let rowString = "";
      for (let y = 0; y < this.config.width; y++) {
        
        if (x === this._startPosition.x && y === this._startPosition.y) {
          rowString += playerChar + " "; 
        } else {
          rowString += this._map[x][y] + " "; 
        }
        
      }
      console.log(rowString);
    }
    console.log("\n");
  }
  play() {
    let isPlaying = true;
    
    while (isPlaying) {
      this.printMap();

      let move = prompt("เดินไปทางไหน? (w=บน, s=ล่าง, a=ซ้าย, d=ขวา): ");
      if (!move) continue; 
      move = move.toLowerCase();

      let nextX = this._startPosition.x;
      let nextY = this._startPosition.y;

      if (move === "s") nextX++;
      else if (move === "w") nextX--;
      else if (move === "a") nextY--;
      else if (move === "d") nextY++;
      else {
        console.log("กดผิดปุ่มครับ! ใช้ w, a, s, d เท่านั้น");
        prompt("กด Enter เพื่อไปต่อ...");
        continue;
      }

      if (nextX < 0 || nextY < 0 || nextX >= this.config.height || nextY >= this.config.width) {
        console.log("ชนขอบ! เดินไปทางนั้นไม่ได้นะ");
        prompt("กด Enter เพื่อไปต่อ...");
        continue;
      }

      const nextItem = this._map[nextX][nextY];
      
      if (nextItem === hole) {
        console.log("อ๊ากกก ตกหลุม 🕳️! --- GAME OVER ---");
        isPlaying = false; 
        break;
      } else if (nextItem === goal) {
        console.log("เย้! เจอเป้าหมายแล้ว 🪬! --- YOU WIN ---");
        isPlaying = false; 
        break;
      }

      this._startPosition.x = nextX;
      this._startPosition.y = nextY;
      this._map[nextX][nextY] = pathWalk;
    }
  }
}

const myGame = new Field(config);
myGame.play();