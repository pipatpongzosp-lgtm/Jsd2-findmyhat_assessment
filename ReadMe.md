<h1>Thinking process</h1>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>


มันคือกระดานประเภทหนึ่ง
declare กระดาน[areawalk] หมาก[character] กับดัก[spawn] itemfind [คิดไม่ออกรอก่อน]
defind
 - กระดาน ขนาด 12x12 และอัพเดตแมพได้ด้วย[เดินตกแล้ว? เดินออกแมพ? ตกหลุมแล้ว?]
 - หมาก จำนวน 1 ตัว
 - กับดัก จำนวน 1 อัน แบบสุ่ม
 - itemfind จำนวน 1 อัน สุ่มละกัน
 - การเดินทาง L U D R ด้วย W A S D
 - 
 -
 method
 - เราต้องสร้างหมาก ไอเท็มที่หา ทางที่เดินผ่าน  และ กับดัก ด้วยการประกาศตัวแปร 
 - จากนั้นเราจำต้องมาสร้างขนาดของพื้นที่ทางเดินทั้งหมดโดยกำหนดให้มีขนาด 5*5 และเซ็ตจุดที่เดินได้ หลุม ด้วย การใช้ if-else ตรวจสอบ
 - สามารถบังคับให้ตัวละครเดินได้ ด้วย w = up a =left  s = down d = right
 - จุดเกิด ของไอเทมที่หา หมาก กับดัก จะเป็นแบบสุ่ม
 -  





 
  //check state: canwalk
  limitCoordinates(x, y) {
    let canWalk = false;
    if (0 < x < 5 && 0 < y < 5) {
      console.log("walk");
      canWalk = true;
    }

    //check status path
    if (canWalk === false) {
      console.log("you fall down !!!");
    } else {
      console.log("you safe");
    }
    return canWalk;
  }
}