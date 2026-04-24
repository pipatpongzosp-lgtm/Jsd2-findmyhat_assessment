import PromptSync from "prompt-sync";
const prompt = PromptSync();

const chess = "👾";
const fieldBlock = "🧊";
const pathWalk = "💠";
const goal = "🪬"
const hole ="🕳️"

let config = {
    width: 5,
    height: 5,
    holePercentage:0.2 

}


class Field {
    _startposition = {
        x: null,
        y: null
    };
    constructor (config) {
        // this.width = config.width,
        // this.height = config.height
        // this.holePercentage = config.holePercentage
        this.config = config,
        this.generateMap();
    }
    generateMap() {
        const newMap = [];
        const mapSize = this.config.width * this.config.height;
        const holeCount = Math.floor((mapSize - 2)*this.holePercentage)
        const fieldBlockCout = mapSize - holeCount - 2
        const mapElements = [hat,pathWalk]
        .concat(Array(holeCount).fill(hole))
        //เราทำการเชื่อม array หลุม กับ array ทางเดินเข้าด้วยกัน
        .concat(Array(fieldBlockCout).fill(fieldBlock))

        for (let i = 0; i < height; i++) {
            newMap[i] = [];
            for (let r = 0;r < width;r++) {
                const rand = Math.floor(Math.random() * mapElements.length);
                newMap[i].push(mapElements[rand]);
                mapElements.splice(rand, 1);
            }
        }
    }
    printMapWithoutColor() {
        console.clear();
        console.log(`Current position: {${this._playerPosition.x},${this._playerPosition.y}}\n`);

        let rowString = ""; // เตรียม string ว่างๆ สำหรับสร้างข้อความในแต่ละแถว// ลูปคอลัมน์ (Column) ในแถวนั้นๆ
        for (let y = 0; y < this._width; y++) {
            const currentItem = this._map[x][y].toString();
            rowString += currentItem + " "; 
        }
        console.log(rowString);
    }
}


    

