// ================================================================
// TUẦN 1 - NHÓM 2: KẾ THỪA VÀ TRỪU TƯỢNG HOÁ (Bài 11 → 15)
// Nội dung: Kế thừa class, implement interface, abstract class,
//           composition (Library chứa Book + User).
// ================================================================

import { Book, User } from "./01-basics";

// ------------------------------------------------------------
// Bài 11: Lớp cơ sở Animal. Kế thừa thành Dog và Cat
//         với phương thức bark() và meow().
// ------------------------------------------------------------
export class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Phương thức chung cho mọi động vật
  speak(): string {
    return `${this.name} đang phát ra âm thanh tiếng kêu.`;
  }
}

// Lớp Dog kế thừa Animal, thêm phương thức bark()
export class Dog extends Animal {
  breed: string; // Giống chó

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  // Phương thức riêng của Dog
  bark(): string {
    return `[Chó] ${this.name} (Giống: ${this.breed}): Gâu gâu!`;
  }
}

// Lớp Cat kế thừa Animal, thêm phương thức meow()
export class Cat extends Animal {
  color: string; // Màu lông

  constructor(name: string, color: string) {
    super(name);
    this.color = color;
  }

  // Phương thức riêng của Cat
  meow(): string {
    return `[Mèo] ${this.name} (Lông màu ${this.color}): Meo meo!`;
  }
}

// ------------------------------------------------------------
// Bài 12: Định nghĩa interface Flyable và Swimmable.
//         Cài đặt trong lớp Bird và Fish.
// ------------------------------------------------------------
export interface Flyable {
  fly(): string; // Khả năng bay
}

export interface Swimmable {
  swim(): string; // Khả năng bơi
}

// Lớp Bird cài đặt interface Flyable
export class Bird implements Flyable {
  name: string;
  wingspan: number; // Sải cánh (cm)

  constructor(name: string, wingspan: number) {
    this.name = name;
    this.wingspan = wingspan;
  }

  fly(): string {
    return `[Chim] ${this.name} (sải cánh ${this.wingspan}cm) đang bay lượn trên bầu trời!`;
  }
}

// Lớp Fish cài đặt interface Swimmable
export class Fish implements Swimmable {
  name: string;
  depth: number; // Độ sâu hoạt động (m)

  constructor(name: string, depth: number) {
    this.name = name;
    this.depth = depth;
  }

  swim(): string {
    return `[Cá] ${this.name} đang bơi ở độ sâu ${this.depth} mét dưới nước!`;
  }
}

// Lớp Duck cài đặt cả Flyable VÀ Swimmable (đa kế thừa interface)
export class Duck implements Flyable, Swimmable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  fly(): string {
    return `[Vịt] ${this.name} đang vỗ cánh bay!`;
  }

  swim(): string {
    return `[Vịt] ${this.name} đang bơi lội trên mặt hồ!`;
  }
}

// ------------------------------------------------------------
// Bài 13: Lớp trừu tượng Shape với phương thức area().
//         Cài đặt Square và Circle.
// ------------------------------------------------------------
export abstract class Shape {
  abstract name: string;

  // Phương thức trừu tượng: bắt buộc lớp con phải cài đặt
  abstract area(): number;

  // Phương thức thông thường: lớp con kế thừa trực tiếp
  describe(): string {
    return `Hình ${this.name} có diện tích: ${this.area().toFixed(2)}`;
  }
}

// Hình vuông: cài đặt phương thức area()
export class Square extends Shape {
  name: string = "vuông";
  side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}

// Hình tròn: cài đặt phương thức area()
export class Circle extends Shape {
  name: string = "tròn";
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// ------------------------------------------------------------
// Bài 14: Lớp cơ sở Employee. Kế thừa Manager và Developer
//         với các phương thức riêng biệt.
// ------------------------------------------------------------
export class Employee {
  name: string;
  salary: number;
  department: string;

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  // Hiển thị thông tin nhân viên
  getInfo(): string {
    return `${this.name} | Phòng ban: ${this.department} | Lương: ${this.salary.toLocaleString()} VNĐ`;
  }
}

// Manager: quản lý nhóm nhân viên
export class Manager extends Employee {
  teamSize: number; // Số nhân viên trong nhóm

  constructor(name: string, salary: number, department: string, teamSize: number) {
    super(name, salary, department);
    this.teamSize = teamSize;
  }

  // Phương thức riêng: tổ chức cuộc họp
  holdMeeting(): string {
    return `[Họp] Quản lý ${this.name} đang chủ trì cuộc họp với ${this.teamSize} thành viên trong nhóm.`;
  }
}

// Developer: lập trình viên với ngôn ngữ chuyên môn
export class Developer extends Employee {
  programmingLanguage: string;

  constructor(name: string, salary: number, department: string, language: string) {
    super(name, salary, department);
    this.programmingLanguage = language;
  }

  // Phương thức riêng: viết code
  writeCode(): string {
    return `[Lập trình] Lập trình viên ${this.name} đang phát triển phần mềm bằng ngôn ngữ ${this.programmingLanguage}.`;
  }
}

// ------------------------------------------------------------
// Bài 15: Lớp Library lưu trữ Book và User.
//         Phương thức thêm sách, đăng ký người dùng, tìm kiếm.
//         (Minh hoạ composition - "has-a" relationship)
// ------------------------------------------------------------
export class Library {
  name: string;
  private books: Book[] = [];
  private users: User[] = [];

  constructor(name: string) {
    this.name = name;
  }

  // Thêm sách vào thư viện
  addBook(book: Book): void {
    this.books.push(book);
  }

  // Đăng ký người dùng
  registerUser(user: User): void {
    this.users.push(user);
  }

  // Lấy danh sách toàn bộ sách
  getAllBooks(): Book[] {
    return this.books;
  }

  // Tìm sách theo tên tác giả
  findBooksByAuthor(author: string): Book[] {
    return this.books.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Hiển thị thông tin thư viện
  displayInfo(): void {
    console.log(`  Tên thư viện: ${this.name}`);
    console.log(`  -> Tổng số lượng sách: ${this.books.length}`);
    console.log(`  -> Tổng số người dùng đã đăng ký: ${this.users.length}`);
    if (this.books.length > 0) {
      console.log("  -> Danh sách các đầu sách:");
      this.books.forEach((b) => b.displayInfo());
    }
    if (this.users.length > 0) {
      console.log("  -> Danh sách độc giả đăng ký:");
      this.users.forEach((u) => console.log(`     - Độc giả: ${u.name}`));
    }
  }
}

// ================================================================
// CÁC HÀM CHẠY TỪNG BÀI RIÊNG LẺ (Bài 11-15)
// ================================================================

export function runBai11(): void {
  console.log("[Bài 11] Kế thừa Animal -> Dog & Cat");
  console.log("─".repeat(50));
  const dog = new Dog("Buddy", "Golden Retriever");
  const cat = new Cat("Luna", "trắng");
  console.log(`  ${dog.speak()}`);
  console.log(`  ${dog.bark()}`);
  console.log(`  ${cat.speak()}`);
  console.log(`  ${cat.meow()}`);
}

export function runBai12(): void {
  console.log("[Bài 12] Giao diện Flyable (Bay) & Swimmable (Bơi)");
  console.log("─".repeat(50));
  const eagle = new Bird("Đại bàng", 200);
  const shark = new Fish("Cá mập trắng", 350);
  const duck = new Duck("Vịt Donald");
  console.log(`  ${eagle.fly()}`);
  console.log(`  ${shark.swim()}`);
  console.log(`  ${duck.fly()}`);
  console.log(`  ${duck.swim()}`);
}

export function runBai13(): void {
  console.log("[Bài 13] Lớp trừu tượng Shape -> Square & Circle");
  console.log("─".repeat(50));
  const shapes: Shape[] = [
    new Square(5),
    new Circle(7),
    new Square(10),
    new Circle(3.5),
  ];
  shapes.forEach((s) => console.log(`  - ${s.describe()}`));
}

export function runBai14(): void {
  console.log("[Bài 14] Kế thừa Employee -> Manager & Developer");
  console.log("─".repeat(50));
  const manager = new Manager("Trần Văn Nam", 35_000_000, "Kỹ thuật", 8);
  const dev1 = new Developer("Nguyễn Thị Lan", 25_000_000, "Kỹ thuật", "TypeScript");
  const dev2 = new Developer("Lê Hoàng Phúc", 28_000_000, "Kỹ thuật", "Python");
  console.log(`  ${manager.getInfo()}`);
  console.log(`  ${manager.holdMeeting()}`);
  console.log(`  ${dev1.getInfo()}`);
  console.log(`  ${dev1.writeCode()}`);
  console.log(`  ${dev2.getInfo()}`);
  console.log(`  ${dev2.writeCode()}`);
}

export function runBai15(): void {
  console.log("[Bài 15] Lớp Library (Kết hợp Composition với Book & User)");
  console.log("─".repeat(50));
  const library = new Library("Thư viện Đại học Bách Khoa");
  library.addBook(new Book("Introduction to Algorithms", "Thomas H. Cormen", 2009));
  library.addBook(new Book("The Pragmatic Programmer", "Andy Hunt", 2019));
  library.addBook(new Book("TypeScript in Action", "Evan Burchard", 2023));
  library.registerUser(new User("sinh_vien_01"));
  library.registerUser(new User("giang_vien_02"));
  library.displayInfo();

  const found = library.findBooksByAuthor("Andy");
  console.log(`\n  Kết quả tìm sách của tác giả "Andy":`);
  found.forEach((b) => b.displayInfo());
}

// Hàm chạy toàn bộ nhóm 2
export function runInheritanceExercises(): void {
  console.log("+==============================================================+");
  console.log("|     NHÓM 2: KẾ THỪA VÀ TRỪU TƯỢNG HOÁ (Bài 11 -> 15)         |");
  console.log("+==============================================================+\n");
  for (let i = 11; i <= 15; i++) {
    exerciseRunners2[i]();
    if (i < 15) console.log("");
  }
}

// Map số bài → hàm chạy
export const exerciseRunners2: Record<number, () => void> = {
  11: runBai11, 12: runBai12, 13: runBai13, 14: runBai14, 15: runBai15,
};


