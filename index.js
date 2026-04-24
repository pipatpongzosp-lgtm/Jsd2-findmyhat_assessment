import PromptSync from "prompt-sync";
const prompt = PromptSync();

const chess = "👾";
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
    x: null,
    y: null,
  };
  constructor(config) {
    // this.width = config.width,
    // this.height = config.height
    // this.holePercentage = config.holePercentage
    ((this.config = config), this.generateMap());
  }
  generateMap() {
    const newMap = [];
    const mapSize = this.config.width * this.config.height;
    const holeCount = Math.floor((mapSize - 2) * this.config.holePercentage);
    const fieldBlockCout = mapSize - holeCount - 2;
    const mapElements = [goal, pathWalk]
      .concat(Array(holeCount).fill(hole))
      //เราทำการเชื่อม array หลุม กับ array ทางเดินเข้าด้วยกัน
      .concat(Array(fieldBlockCout).fill(fieldBlock));

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
  printMap() {
    console.clear();
    console.log(
      `Current position: {${this._startPosition.x},${this._startPosition.y}}\n`,
    );
    for (let x = 0; x < this.config.height; x++) {
      let rowString = "";
      for (let y = 0; y < this._width; y++) {
        const currentItem = this._map[x][y].toString();
        rowString += currentItem + " ";
      }
      console.log(rowString);
    }
  }

  moovPlayer() {
    let isPlaying = true; // ตัวแปรคอยคุมว่าเกมยังเล่นอยู่ไหม
    while (isPlaying) {
      // 1. พิมพ์แผนที่และพิกัดปัจจุบันออกมาก่อน
      this.printMapWithoutColor();
      // 2. รับคำสั่งจากผู้เล่น (แปลงเป็นตัวพิมพ์เล็กให้หมดด้วย .toLowerCase())
      let move = prompt("เดินไปทางไหน? (w=บน, s=ล่าง, a=ซ้าย, d=ขวา): ");
      move = move.toLowerCase();
      // 3. เตรียมตัวแปรจำลองตำแหน่งล่วงหน้า
      let nextX = this._playerPosition.x;
      let nextY = this._playerPosition.y;


      if (move === "s") {
        playerRow = playerRow + 1; // เลื่อนลง (แถวเพิ่มขึ้น)
      } else if (move === "d") {
        playerCol = playerCol + 1; // เลื่อนขวา (คอลัมน์เพิ่มขึ้น)
      } else if (move === "a") {
        playerRow = playerRow - 1; // เลื่อนซ้าย
      } else if (move === "w") {
        playerCol = playerCol - 1; // เลื่อนขึ้น
      }
      if (
        nextX < 0 ||
        nextY < 0 ||
        nextX >= this.config.height ||
        nextY >= this.config.width
      ) {
        console.log("ชนขอบ! เดินไปทางนั้นไม่ได้นะ");
        // เพื่อให้เห็นข้อความชนขอบ เราอาจจะให้ prompt รอให้เรากด enter รับทราบ
        prompt("กด Enter เพื่อไปต่อ...");
        continue;
      }
      // 6. อัปเดตตำแหน่งจริง!
      this._playerPosition.x = nextX;
      this._playerPosition.y = nextY;
    }
  }
}
// class game {

// }
const myGame = new Field(config); // สร้างเกมใหม่โดยโยน config เข้าไป
myGame.printMap(); // สั่งให้พิมพ์แผนที่ออกมา
