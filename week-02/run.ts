// ============================================================
// Runner: chạy từng bài tập theo số
// Usage: npx tsx week-02/run.ts <số bài>
//   Ví dụ: npx tsx week-02/run.ts 5
//          npm run ex -- 14
// ============================================================

import { ex01, ex02, ex03, ex04, ex05, ex06, ex07, ex08, ex09, ex10 } from "./A_Basics_with_Promise";
import { ex11, ex12, ex13, ex14, ex15, ex16, ex17, ex18, ex19, ex20 } from "./B_Async_Await";
import { ex21, ex22, ex23, ex24, ex25, ex26, ex27, ex28, ex29, ex30 } from "./C_Fetch_API_Simulated_IO";

const exercises: Record<number, () => void | Promise<void>> = {
  1: ex01, 2: ex02, 3: ex03, 4: ex04, 5: ex05,
  6: ex06, 7: ex07, 8: ex08, 9: ex09, 10: ex10,
  11: ex11, 12: ex12, 13: ex13, 14: ex14, 15: ex15,
  16: ex16, 17: ex17, 18: ex18, 19: ex19, 20: ex20,
  21: ex21, 22: ex22, 23: ex23, 24: ex24, 25: ex25,
  26: ex26, 27: ex27, 28: ex28, 29: ex29, 30: ex30,
};

async function main(): Promise<void> {
  const arg = process.argv[2];

  if (!arg) {
    console.log("╔══════════════════════════════════════════════╗");
    console.log("║   WEEK 02 - Async/Await & Promise Exercises ║");
    console.log("╠══════════════════════════════════════════════╣");
    console.log("║                                              ║");
    console.log("║  Cách chạy:                                  ║");
    console.log("║    npm run ex -- <số bài>                    ║");
    console.log("║                                              ║");
    console.log("║  Ví dụ:                                      ║");
    console.log("║    npm run ex -- 1      (chạy bài 1)         ║");
    console.log("║    npm run ex -- 14     (chạy bài 14)        ║");
    console.log("║    npm run ex -- 1-10   (chạy bài 1 đến 10)  ║");
    console.log("║    npm run ex -- all    (chạy tất cả 30 bài) ║");
    console.log("║                                              ║");
    console.log("║  Part A (1-10):  Promise basics               ║");
    console.log("║  Part B (11-20): Async/Await                  ║");
    console.log("║  Part C (21-30): Fetch API & I/O              ║");
    console.log("║                                              ║");
    console.log("╚══════════════════════════════════════════════╝");
    return;
  }

  // Handle "all"
  if (arg === "all") {
    for (const [num, fn] of Object.entries(exercises)) {
      console.log(`\n${"─".repeat(50)}`);
      await fn();
    }
    return;
  }

  // Handle range: "1-10"
  const rangeMatch = arg.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1]);
    const end = parseInt(rangeMatch[2]);
    for (let i = start; i <= end; i++) {
      if (exercises[i]) {
        console.log(`\n${"─".repeat(50)}`);
        await exercises[i]();
      }
    }
    return;
  }

  // Handle single number
  const num = parseInt(arg);
  if (exercises[num]) {
    await exercises[num]();
  } else {
    console.log(`❌ Bài ${arg} không tồn tại. Có bài 1-30.`);
  }
}

main();
