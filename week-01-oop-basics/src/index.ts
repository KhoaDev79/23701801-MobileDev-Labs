// ================================================================
// TUẦN 1: LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG (OOP) - BÀI TẬP THỰC HÀNH
// Môn: Lập trình Thiết bị Di động
// Ngôn ngữ: TypeScript
// File chạy chính: Menu tương tác - chọn bài tập để kiểm tra kết quả
// ================================================================

import * as readline from "readline";

import { runBasicsExercises, exerciseRunners } from "./01-basics";
import { runInheritanceExercises, exerciseRunners2 } from "./02-inheritance";
import { runPolymorphismExercises, exerciseRunners3 } from "./03-polymorphism";
import { runAdvancedExercises, exerciseRunners4 } from "./04-advanced";

// Gộp tất cả runners vào 1 map duy nhất
const allRunners: Record<number, () => void> = {
  ...exerciseRunners,
  ...exerciseRunners2,
  ...exerciseRunners3,
  ...exerciseRunners4,
};

// ================================================================
// HEADER - THÔNG TIN CHUNG
// ================================================================
function printHeader(): void {
  console.log("+-----------------------------------------------------------------+");
  console.log("|                                                                 |");
  console.log("|   LẬP TRÌNH THIẾT BỊ DI ĐỘNG - BÀI TẬP THỰC HÀNH OOP            |");
  console.log("|   Tuần 1: Lập trình Hướng đối tượng (TypeScript)                |");
  console.log("|   Tổng số bài tập: 30 bài                                       |");
  console.log("|                                                                 |");
  console.log("+-----------------------------------------------------------------+\n");
}

// ================================================================
// MENU TƯƠNG TÁC
// ================================================================
function printMenu(): void {
  console.log("+=================================================================+");
  console.log("|                     MENU CHỌN BÀI TẬP KIỂM TRA                  |");
  console.log("+=================================================================+");
  console.log("|                                                                 |");
  console.log("|   1. Nhập số bài cụ thể:    1 -> 30       (Ví dụ: 5)            |");
  console.log("|   2. Nhập một khoảng bài:   1-10          (Chạy từ bài 1 đến 10)|");
  console.log("|   3. Nhập danh sách bài:    1,5,10        (Chạy bài 1, 5, 10)   |");
  console.log("|   4. Nhập theo nhóm:        nhom1         (Bài 01 -> 10)        |");
  console.log("|                             nhom2         (Bài 11 -> 15)        |");
  console.log("|                             nhom3         (Bài 16 -> 20)        |");
  console.log("|                             nhom4         (Bài 21 -> 30)        |");
  console.log("|   5. Chạy tất cả 30 bài:    all hoặc tatca                      |");
  console.log("|   6. Thoát chương trình:    exit hoặc q                         |");
  console.log("|                                                                 |");
  console.log("+=================================================================+");
}

// ================================================================
// XỬ LÝ INPUT
// ================================================================
function runExercise(num: number): boolean {
  if (allRunners[num]) {
    allRunners[num]();
    return true;
  }
  console.log(`  [Cảnh báo] Bài tập số ${num} không tồn tại! (Chỉ có từ bài 1 -> bài 30)`);
  return false;
}

function processInput(input: string): boolean {
  const trimmed = input.trim().toLowerCase();

  // Thoát
  if (trimmed === "exit" || trimmed === "q" || trimmed === "quit" || trimmed === "thoat") {
    console.log("\nCảm ơn bạn đã sử dụng chương trình! Chúc bạn học tập tốt!\n");
    return false; // Thoát vòng lặp
  }

  // Chạy tất cả
  if (trimmed === "all" || trimmed === "tatca" || trimmed === "tat ca" || trimmed === "tất cả") {
    console.log("\n");
    runBasicsExercises();
    runInheritanceExercises();
    runPolymorphismExercises();
    runAdvancedExercises();
    return true;
  }

  // Chạy theo nhóm
  if (trimmed.startsWith("nhom") || trimmed.startsWith("nhóm")) {
    const groupNum = trimmed.replace(/nhóm|nhom|\s+/g, "").trim();
    switch (groupNum) {
      case "1":
        console.log("\n");
        runBasicsExercises();
        break;
      case "2":
        console.log("\n");
        runInheritanceExercises();
        break;
      case "3":
        console.log("\n");
        runPolymorphismExercises();
        break;
      case "4":
        console.log("\n");
        runAdvancedExercises();
        break;
      default:
        console.log("  [Cảnh báo] Nhóm không hợp lệ! Vui lòng chọn nhom1, nhom2, nhom3 hoặc nhom4.");
    }
    return true;
  }

  // Chạy khoảng bài (VD: 1-10, 5-8)
  if (trimmed.includes("-")) {
    const parts = trimmed.split("-").map((s) => parseInt(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const [start, end] = parts;
      if (start >= 1 && end <= 30 && start <= end) {
        console.log(`\n>> Đang thực thi từ bài ${start} -> bài ${end}:\n`);
        for (let i = start; i <= end; i++) {
          runExercise(i);
          if (i < end) console.log("");
        }
        return true;
      }
    }
    console.log("  [Cảnh báo] Khoảng bài không hợp lệ! Ví dụ đúng: 1-10, 5-8, 21-30.");
    return true;
  }

  // Chạy nhiều bài (VD: 1,5,10)
  if (trimmed.includes(",")) {
    const nums = trimmed.split(",").map((s) => parseInt(s.trim()));
    if (nums.every((n) => !isNaN(n))) {
      console.log(`\n>> Đang thực thi danh sách bài: ${nums.join(", ")}:\n`);
      nums.forEach((n, i) => {
        runExercise(n);
        if (i < nums.length - 1) console.log("");
      });
      return true;
    }
  }

  // Chạy 1 bài duy nhất (VD: 5)
  const num = parseInt(trimmed);
  if (!isNaN(num)) {
    console.log("");
    runExercise(num);
    return true;
  }

  console.log("  [Cảnh báo] Lệnh nhập không hợp lệ! Vui lòng nhập số bài (1-30), khoảng (1-10), nhóm (nhom1), all, hoặc exit.");
  return true;
}

// ================================================================
// CHƯƠNG TRÌNH CHÍNH - MENU TƯƠNG TÁC
// ================================================================
function main(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  printHeader();
  printMenu();

  const prompt = (): void => {
    rl.question("\n>> Nhập lựa chọn của bạn: ", (answer) => {
      const shouldContinue = processInput(answer);
      if (shouldContinue) {
        prompt(); // Hỏi tiếp
      } else {
        rl.close();
      }
    });
  };

  prompt();
}

// Khởi chạy chương trình
main();
