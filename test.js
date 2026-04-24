import PromptSync from "prompt-sync";
const prompt = PromptSync();

// const prompt = require('prompt-sync')({ sigint: true });

// 1. สร้างแผนที่แบบตายตัว (ไม่สุ่ม จะได้อ่านง่าย)
// * = ตัวเรา, ░ = ทางเดิน, O = หลุม, ^ = หมวก
const map = [
  ['*', '░', '░'],
  ['░', 'O', '░'],
  ['░', '░', '^']
];

// 2. เก็บตำแหน่งปัจจุบันของเรา (เริ่มต้นที่แถว 0, คอลัมน์ 0)
let playerRow = 0;
let playerCol = 0;

// 3. เริ่มลูปของเกม
while (true) {
  console.clear();
  
  // ปริ้นแผนที่ออกมาให้ดู (แอบใช้ .join() ช่วยให้บรรทัดมันติดกัน)
  for (let i = 0; i < map.length; i++) {
    console.log(map[i].join(' ')); 
  }

  // 4. รับคำสั่งจากผู้เล่น
  const move = prompt("เดินไปทางไหน? (w=บน, s=ล่าง, a=ซ้าย, d=ขวา): ");

  // 5. ลบรอยเท้าเดิมออกก่อน (เปลี่ยนจาก * เป็นทางเดินปกติ ░)
  map[playerRow][playerCol] = '░';

  // 6. คำนวณตำแหน่งใหม่ตามทิศทางที่กด
  if (move === 's') {
    playerRow = playerRow + 1; // เลื่อนลง (แถวเพิ่มขึ้น)
  } else if (move === 'd') {
    playerCol = playerCol + 1; // เลื่อนขวา (คอลัมน์เพิ่มขึ้น)
  } else if (moov ==='a'){
    playerRow = playerRow - 1;
  }else if (moov === 'w'){
    playerCol = playerCol - 1  
  }
  // (เว้น w กับ a ไว้ให้ลองเติมเองเพื่อฝึกฝนครับ!)

  // 7. เช็คว่าตำแหน่งใหม่ที่เดินไปเจออะไร
  const currentItem = map[playerRow][playerCol];

  if (currentItem === 'O') {
    console.log("ตกหลุม! เกมโอเวอร์!");
    break; // จบเกม
  } else if (currentItem === '^') {
    console.log("เจอหมวกแล้ว! ชนะ!!");
    break; // จบเกม
  }

  // 8. ถ้าไม่ตกหลุมและไม่เจอหมวก ให้อัปเดตตำแหน่งใหม่เป็นตัวเรา (*)
  map[playerRow][playerCol] = '*';

}