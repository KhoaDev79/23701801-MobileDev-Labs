// ============================================================
// WEEK 02 - PART B: Async/Await (Exercises 11-20)
// ============================================================
export {};

// Helper function
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

// ------------------------------------------------------------
// Exercise 11: Convert Exercise 1 into async/await
// ------------------------------------------------------------
export async function ex11(): Promise<void> {
  console.log("=== Exercise 11: async/await Hello Async ===");
  const result: string = await new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
  });
  console.log(result);
}

// ------------------------------------------------------------
// Exercise 12: Async function that calls simulateTask(2000)
// ------------------------------------------------------------
export async function ex12(): Promise<void> {
  console.log("=== Exercise 12: Call simulateTask(2000) ===");
  console.log("Starting task...");
  const result: string = await simulateTask(2000);
  console.log("Result:", result);
}

// ------------------------------------------------------------
// Exercise 13: Handle errors using try/catch
// ------------------------------------------------------------
export async function ex13(): Promise<void> {
  console.log("=== Exercise 13: try/catch error handling ===");
  function failingTask(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Something went wrong")), 1000);
    });
  }
  try {
    const result = await failingTask();
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Caught error:", error.message);
    }
  }
}

// ------------------------------------------------------------
// Exercise 14: Wait 1 second and return number × 3
// ------------------------------------------------------------
export async function ex14(): Promise<void> {
  console.log("=== Exercise 14: tripleAfterDelay ===");
  async function tripleAfterDelay(number: number): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return number * 3;
  }
  const result: number = await tripleAfterDelay(7);
  console.log(`7 × 3 = ${result}`);
}

// ------------------------------------------------------------
// Exercise 15: Call multiple async functions sequentially
// ------------------------------------------------------------
export async function ex15(): Promise<void> {
  console.log("=== Exercise 15: Sequential execution ===");
  async function taskA(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Task A completed");
    return "A";
  }
  async function taskB(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Task B completed");
    return "B";
  }
  async function taskC(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Task C completed");
    return "C";
  }
  console.log("Running tasks sequentially...");
  const resultA: string = await taskA();
  const resultB: string = await taskB();
  const resultC: string = await taskC();
  console.log("All results:", resultA, resultB, resultC);
}

// ------------------------------------------------------------
// Exercise 16: Call multiple async functions in parallel
// ------------------------------------------------------------
export async function ex16(): Promise<void> {
  console.log("=== Exercise 16: Parallel with Promise.all() ===");
  async function taskA(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Task A completed");
    return "A";
  }
  async function taskB(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Task B completed");
    return "B";
  }
  async function taskC(): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Task C completed");
    return "C";
  }
  console.log("Running tasks in parallel...");
  const results: string[] = await Promise.all([taskA(), taskB(), taskC()]);
  console.log("All results:", results);
}

// ------------------------------------------------------------
// Exercise 17: Use for await...of to iterate Promises
// ------------------------------------------------------------
export async function ex17(): Promise<void> {
  console.log("=== Exercise 17: for await...of ===");
  const promises: Promise<string>[] = [
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500),
  ];
  let index: number = 1;
  for await (const result of promises) {
    console.log(`Promise ${index} resolved: ${result}`);
    index++;
  }
}

// ------------------------------------------------------------
// Exercise 18: fetchUser(id) simulates API call
// ------------------------------------------------------------
interface User {
  id: number;
  name: string;
  email: string;
}

export async function ex18(): Promise<void> {
  console.log("=== Exercise 18: fetchUser() ===");
  async function fetchUser(id: number): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id, name: `User_${id}`, email: `user${id}@example.com` };
  }
  const user: User = await fetchUser(1);
  console.log("Fetched user:", user);
}

// ------------------------------------------------------------
// Exercise 19: fetchUsers(ids: number[])
// ------------------------------------------------------------
export async function ex19(): Promise<void> {
  console.log("=== Exercise 19: fetchUsers() ===");
  async function fetchUser(id: number): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id, name: `User_${id}`, email: `user${id}@example.com` };
  }
  async function fetchUsers(ids: number[]): Promise<User[]> {
    return await Promise.all(ids.map((id: number) => fetchUser(id)));
  }
  const users: User[] = await fetchUsers([1, 2, 3, 4, 5]);
  console.log("Fetched users:", users);
}

// ------------------------------------------------------------
// Exercise 20: Timeout if API call > 2 seconds
// ------------------------------------------------------------
export async function ex20(): Promise<void> {
  console.log("=== Exercise 20: Timeout ===");
  function fetchUserSlow(id: number): Promise<User> {
    const delay: number = Math.random() * 4000;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, name: `User_${id}`, email: `user${id}@example.com` });
      }, delay);
    });
  }
  function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    const timeoutPromise: Promise<never> = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout: operation took more than ${timeoutMs}ms`)), timeoutMs);
    });
    return Promise.race([promise, timeoutPromise]);
  }
  try {
    const user: User = await withTimeout(fetchUserSlow(42), 2000);
    console.log("Fetched user:", user);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    }
  }
}

// --- Run if executed directly ---
const isMainB = process.argv[1]?.includes("B_Async_Await");
if (isMainB) {
  const exerciseNum = parseInt(process.argv[2]);
  const exercises: Record<number, () => Promise<void> | void> = {
    11: ex11, 12: ex12, 13: ex13, 14: ex14, 15: ex15,
    16: ex16, 17: ex17, 18: ex18, 19: ex19, 20: ex20,
  };

  async function main(): Promise<void> {
    if (exerciseNum && exercises[exerciseNum]) {
      await exercises[exerciseNum]();
    } else if (!process.argv[2]) {
      for (const [, fn] of Object.entries(exercises)) {
        await fn();
      }
    } else {
      console.log(`Exercise ${process.argv[2]} not found. Available: 11-20`);
    }
  }

  main();
}

