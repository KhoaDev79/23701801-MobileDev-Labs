// ============================================================
// WEEK 02 - PART C: Fetch API & Simulated I/O (Exercises 21-30)
// ============================================================
export {};

// Helper
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function simulateTask(name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${name} completed in ${time}ms`), time);
  });
}

// Type definitions
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface TaskItem {
  name: string;
  time: number;
}

// ------------------------------------------------------------
// Exercise 21: Use fetch to get data from a public API
// ------------------------------------------------------------
export async function ex21(): Promise<void> {
  console.log("=== Exercise 21: Fetch single todo ===");
  try {
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data: Todo = await response.json();
    console.log("Fetched todo:", data);
  } catch (error) {
    if (error instanceof Error) console.log("Error:", error.message);
  }
}

// ------------------------------------------------------------
// Exercise 22: Call API multiple times
// ------------------------------------------------------------
export async function ex22(): Promise<void> {
  console.log("=== Exercise 22: Fetch multiple todos ===");
  try {
    const ids: number[] = [1, 2, 3, 4, 5];
    const promises: Promise<Todo>[] = ids.map((id: number) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res: Response) => res.json())
    );
    const results: Todo[] = await Promise.all(promises);
    results.forEach((todo: Todo) => {
      console.log(`Todo ${todo.id}: ${todo.title} [${todo.completed ? "✓" : "✗"}]`);
    });
  } catch (error) {
    if (error instanceof Error) console.log("Error:", error.message);
  }
}

// ------------------------------------------------------------
// Exercise 23: Fetch todos and filter completed
// ------------------------------------------------------------
export async function ex23(): Promise<void> {
  console.log("=== Exercise 23: Filter completed todos ===");
  try {
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await response.json();
    const completedTodos: Todo[] = todos.filter((todo: Todo) => todo.completed);
    console.log(`Completed todos: ${completedTodos.length} / ${todos.length}`);
    completedTodos.slice(0, 5).forEach((todo: Todo) => {
      console.log(`  - [${todo.id}] ${todo.title}`);
    });
  } catch (error) {
    if (error instanceof Error) console.log("Error:", error.message);
  }
}

// ------------------------------------------------------------
// Exercise 24: POST request
// ------------------------------------------------------------
export async function ex24(): Promise<void> {
  console.log("=== Exercise 24: POST request ===");
  try {
    const response: Response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Hello from Week 02",
        body: "This is a test post using async/await and fetch.",
        userId: 1,
      }),
    });
    const data: Post = await response.json();
    console.log("POST response:", data);
  } catch (error) {
    if (error instanceof Error) console.log("Error:", error.message);
  }
}

// ------------------------------------------------------------
// Exercise 25: Simulate downloading a file in 3 seconds
// ------------------------------------------------------------
export async function ex25(): Promise<void> {
  console.log("=== Exercise 25: downloadFile ===");
  function downloadFile(filename: string): Promise<string> {
    console.log(`Starting download: ${filename}...`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(`${filename} downloaded successfully!`), 3000);
    });
  }
  const result: string = await downloadFile("report.pdf");
  console.log(result);
}

// ------------------------------------------------------------
// Exercise 26: async/await with setTimeout (5-second wait)
// ------------------------------------------------------------
export async function ex26(): Promise<void> {
  console.log("=== Exercise 26: 5-second wait ===");
  console.log("Waiting 5 seconds...");
  await delay(5000);
  console.log("5 seconds have passed!");
}

// ------------------------------------------------------------
// Exercise 27: fetchWithRetry
// ------------------------------------------------------------
export async function ex27(): Promise<void> {
  console.log("=== Exercise 27: fetchWithRetry ===");
  async function fetchWithRetry(url: string, retries: number): Promise<unknown> {
    for (let attempt: number = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${retries}...`);
        const response: Response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data: unknown = await response.json();
        console.log("Fetch succeeded on attempt", attempt);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Attempt ${attempt} failed: ${error.message}`);
          if (attempt === retries) {
            throw new Error(`All ${retries} attempts failed. Last error: ${error.message}`);
          }
        }
        await delay(1000 * attempt);
      }
    }
  }
  try {
    const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
    console.log("Data:", data);
  } catch (error) {
    if (error instanceof Error) console.log("Final error:", error.message);
  }
}

// ------------------------------------------------------------
// Exercise 28: batchProcess (5 tasks at once)
// ------------------------------------------------------------
export async function ex28(): Promise<void> {
  console.log("=== Exercise 28: batchProcess ===");
  console.log("Starting batch processing...");
  const tasks: Promise<string>[] = [
    simulateTask("Task 1", 1000),
    simulateTask("Task 2", 2000),
    simulateTask("Task 3", 1500),
    simulateTask("Task 4", 800),
    simulateTask("Task 5", 2500),
  ];
  const results: string[] = await Promise.all(tasks);
  results.forEach((result: string) => console.log(" ", result));
  console.log("Batch processing complete!");
}

// ------------------------------------------------------------
// Exercise 29: queueProcess (sequential)
// ------------------------------------------------------------
export async function ex29(): Promise<void> {
  console.log("=== Exercise 29: queueProcess ===");
  console.log("Starting queue processing...");
  const taskQueue: TaskItem[] = [
    { name: "Task 1", time: 1000 },
    { name: "Task 2", time: 1500 },
    { name: "Task 3", time: 800 },
    { name: "Task 4", time: 2000 },
    { name: "Task 5", time: 1200 },
  ];
  for (const task of taskQueue) {
    const result: string = await simulateTask(task.name, task.time);
    console.log(" ", result);
  }
  console.log("Queue processing complete!");
}

// ------------------------------------------------------------
// Exercise 30: Promise.allSettled()
// ------------------------------------------------------------
export async function ex30(): Promise<void> {
  console.log("=== Exercise 30: Promise.allSettled() ===");
  const urls: string[] = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://invalid-url-that-does-not-exist.xyz/api",
    "https://jsonplaceholder.typicode.com/todos/3",
    "https://another-invalid-url.xyz/data",
  ];
  const promises: Promise<unknown>[] = urls.map((url: string) =>
    fetch(url).then((res: Response) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
  );
  const results: PromiseSettledResult<unknown>[] = await Promise.allSettled(promises);
  results.forEach((result: PromiseSettledResult<unknown>, index: number) => {
    if (result.status === "fulfilled") {
      console.log(`✅ API ${index + 1}: Success -`, JSON.stringify(result.value).substring(0, 60));
    } else {
      console.log(`❌ API ${index + 1}: Failed -`, result.reason.message);
    }
  });
}

// --- Run if executed directly ---
const isMainC = process.argv[1]?.includes("C_Fetch_API_Simulated_IO");
if (isMainC) {
  const exerciseNum = parseInt(process.argv[2]);
  const exercises: Record<number, () => Promise<void>> = {
    21: ex21, 22: ex22, 23: ex23, 24: ex24, 25: ex25,
    26: ex26, 27: ex27, 28: ex28, 29: ex29, 30: ex30,
  };

  async function main(): Promise<void> {
    if (exerciseNum && exercises[exerciseNum]) {
      await exercises[exerciseNum]();
    } else if (!process.argv[2]) {
      for (const [, fn] of Object.entries(exercises)) {
        await fn();
      }
    } else {
      console.log(`Exercise ${process.argv[2]} not found. Available: 21-30`);
    }
  }

  main();
}

