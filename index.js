import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true }); // เพิ่ม sigint ให้กด Ctrl+C ออกได้

const chess = "👾"; // (ตัวนี้สร้างไว้แต่ยังไม่ได้ใช้ในแผนที่)
const fieldBlock = "🧊";
const pathWalk = "💠";
const goal = "🪬";
const hole = "🕳️";

let config = {
  width: 5,
  height: 5,
  holePercentage: 0.2,
};

class Field {
  _startPosition = {
    x: 0, // เปลี่ยนจาก null เป็น 0 ไว้ก่อน
    y: 0,
  };
  
  _map = []; // อย่าลืมประกาศตัวแปรเก็บแผนที่

  constructor(config) {
    this.config = config;
    this.generateMap();
    this.findStartPosition(); // 🛑 เพิ่มบรรทัดนี้! เพื่อหาตำแหน่ง 💠 ทันทีที่สร้างแผนที่เสร็จ
  }

  generateMap() {
    const newMap = [];
    const mapSize = this.config.width * this.config.height;
    const holeCount = Math.floor((mapSize - 2) * this.config.holePercentage);
    const fieldBlockCount = mapSize - holeCount - 2; // แก้ Cout เป็น Count

    const mapElements = [goal, pathWalk]
      .concat(Array(holeCount).fill(hole))
      .concat(Array(fieldBlockCount).fill(fieldBlock));

    for (let i = 0; i < this.config.height; i++) {
      newMap[i] = [];
      for (let r = 0; r < this.config.width; r++) {
        const rand = Math.floor(Math.random() * mapElements.length);
        newMap[i].push(mapElements[rand]);
        mapElements.splice(rand, 1);
      }
    }
    this._map = newMap;
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
        rowString += this._map[x][y] + " ";
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