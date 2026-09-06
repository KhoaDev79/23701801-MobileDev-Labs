// ============================================================
// WEEK 02 - PART A: Basics with Promise (Exercises 1-10)
// ============================================================
export {};

// ------------------------------------------------------------
// Exercise 1: Create a Promise that returns "Hello Async" after 2 seconds
// ------------------------------------------------------------
export function ex01(): void {
  console.log("=== Exercise 1: Promise returns 'Hello Async' after 2s ===");
  const exercise1: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
  exercise1.then((result: string) => console.log(result));
}

// ------------------------------------------------------------
// Exercise 2: Function that returns a Promise resolving with 10 after 1 second
// ------------------------------------------------------------
export function ex02(): void {
  console.log("=== Exercise 2: Promise resolves with 10 ===");
  function getNumberTen(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(10);
      }, 1000);
    });
  }
  getNumberTen().then((num: number) => console.log("Resolved with:", num));
}

// ------------------------------------------------------------
// Exercise 3: Function that rejects a Promise with "Something went wrong"
// ------------------------------------------------------------
export function ex03(): void {
  console.log("=== Exercise 3: Promise rejects with error ===");
  function rejectWithError(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Something went wrong"));
      }, 1000);
    });
  }
  rejectWithError().catch((err: Error) => console.log("Rejected:", err.message));
}

// ------------------------------------------------------------
// Exercise 4: Use .then() and .catch() to handle a random number Promise
// ------------------------------------------------------------
export function ex04(): void {
  console.log("=== Exercise 4: Handle random number Promise ===");
  function getRandomNumber(): Promise<number> {
    return new Promise((resolve, reject) => {
      const num: number = Math.random();
      if (num >= 0.5) {
        resolve(num);
      } else {
        reject(new Error(`Number too small: ${num}`));
      }
    });
  }
  getRandomNumber()
    .then((num: number) => console.log("Random number:", num))
    .catch((err: Error) => console.log("Error:", err.message));
}

// ------------------------------------------------------------
// Exercise 5: simulateTask(time) returns "Task done" after time ms
// ------------------------------------------------------------
export function ex05(): void {
  console.log("=== Exercise 5: simulateTask() ===");
  function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Task done");
      }, time);
    });
  }
  simulateTask(1500).then((result: string) => console.log(result));
}

// ------------------------------------------------------------
// Exercise 6: Use Promise.all() to run 3 Promises in parallel
// ------------------------------------------------------------
export function ex06(): void {
  console.log("=== Exercise 6: Promise.all() ===");
  function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Task done"), time);
    });
  }
  Promise.all([
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500),
  ]).then((results: string[]) => {
    console.log("All tasks completed:", results);
  });
}

// ------------------------------------------------------------
// Exercise 7: Use Promise.race() to return first resolved
// ------------------------------------------------------------
export function ex07(): void {
  console.log("=== Exercise 7: Promise.race() ===");
  function simulateTaskWithLabel(label: string, time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`${label} done in ${time}ms`), time);
    });
  }
  Promise.race([
    simulateTaskWithLabel("Task A", 3000),
    simulateTaskWithLabel("Task B", 1000),
    simulateTaskWithLabel("Task C", 2000),
  ]).then((winner: string) => {
    console.log("First to finish:", winner);
  });
}

// ------------------------------------------------------------
// Exercise 8: Promise chain: square 2, double it, add 5
// ------------------------------------------------------------
export function ex08(): void {
  console.log("=== Exercise 8: Promise chain ===");
  Promise.resolve(2)
    .then((num: number): number => {
      console.log(`Square: ${num} => ${num * num}`);
      return num * num; // 4
    })
    .then((num: number): number => {
      console.log(`Double: ${num} => ${num * 2}`);
      return num * 2; // 8
    })
    .then((num: number): number => {
      console.log(`Add 5: ${num} => ${num + 5}`);
      return num + 5; // 13
    })
    .then((result: number) => console.log("Final result:", result));
}

// ------------------------------------------------------------
// Exercise 9: Read array after 1s and filter even numbers
// ------------------------------------------------------------
export function ex09(): void {
  console.log("=== Exercise 9: Filter even numbers ===");
  function filterEvenNumbers(arr: number[]): Promise<number[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const evens: number[] = arr.filter((num: number) => num % 2 === 0);
        resolve(evens);
      }, 1000);
    });
  }
  filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).then((evens: number[]) => {
    console.log("Even numbers:", evens);
  });
}

// ------------------------------------------------------------
// Exercise 10: Use .finally() to log "Done"
// ------------------------------------------------------------
export function ex10(): void {
  console.log("=== Exercise 10: .finally() ===");
  function riskyOperation(): Promise<string> {
    return new Promise((resolve, reject) => {
      const success: boolean = Math.random() > 0.5;
      setTimeout(() => {
        if (success) {
          resolve("Operation succeeded!");
        } else {
          reject(new Error("Operation failed!"));
        }
      }, 500);
    });
  }
  riskyOperation()
    .then((result: string) => console.log(result))
    .catch((err: Error) => console.log(err.message))
    .finally(() => console.log("Done"));
}

// --- Run if executed directly ---
const isMainA = process.argv[1]?.includes("A_Basics_with_Promise");
if (isMainA) {
  const exerciseNum = parseInt(process.argv[2]);
  const exercises: Record<number, () => void> = {
    1: ex01, 2: ex02, 3: ex03, 4: ex04, 5: ex05,
    6: ex06, 7: ex07, 8: ex08, 9: ex09, 10: ex10,
  };

  if (exerciseNum && exercises[exerciseNum]) {
    exercises[exerciseNum]();
  } else if (!process.argv[2]) {
    Object.values(exercises).forEach((fn) => fn());
  } else {
    console.log(`Exercise ${process.argv[2]} not found. Available: 1-10`);
  }
}

