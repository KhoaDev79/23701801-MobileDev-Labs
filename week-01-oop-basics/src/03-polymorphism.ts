// ================================================================
// TUẦN 1 - NHÓM 3: ĐA HÌNH, GENERICS & CÁC MẪU THIẾT KẾ (Bài 16 → 20)
// Nội dung: Generic class, Singleton pattern, static methods,
//           method overriding (đa hình), interface implementation.
// ================================================================

// ------------------------------------------------------------
// Bài 16: Lớp generic Box<T> có thể lưu trữ bất kỳ kiểu dữ liệu.
//         Minh hoạ TypeScript Generics.
// ------------------------------------------------------------
export class Box<T> {
  private content: T;

  constructor(value: T) {
    this.content = value;
  }

  // Lấy giá trị bên trong hộp
  getValue(): T {
    return this.content;
  }

  // Đặt giá trị mới
  setValue(value: T): void {
    this.content = value;
  }

  // Hiển thị thông tin
  describe(): string {
    return `Hộp Box đang chứa giá trị: ${JSON.stringify(this.content)} (Kiểu dữ liệu: ${typeof this.content})`;
  }
}

// ------------------------------------------------------------
// Bài 17: Lớp Singleton Logger - Ghi log ra console.
//         Đảm bảo chỉ có DUY NHẤT 1 instance trong toàn ứng dụng.
// ------------------------------------------------------------
export class Logger {
  private static instance: Logger; // Biến static lưu instance duy nhất
  private logs: string[] = [];     // Mảng lưu lịch sử log

  // Constructor private → không thể new Logger() từ bên ngoài
  private constructor() {}

  // Phương thức static: lấy instance duy nhất (tạo mới nếu chưa có)
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Ghi log với timestamp
  log(message: string): void {
    const timestamp = new Date().toLocaleTimeString("vi-VN");
    const entry = `[${timestamp}] [Thông tin]: ${message}`;
    this.logs.push(entry);
    console.log(`  ${entry}`);
  }

  // Ghi log cảnh báo
  warn(message: string): void {
    const timestamp = new Date().toLocaleTimeString("vi-VN");
    const entry = `[${timestamp}] [Cảnh báo]: ${message}`;
    this.logs.push(entry);
    console.log(`  ${entry}`);
  }

  // Ghi log lỗi
  error(message: string): void {
    const timestamp = new Date().toLocaleTimeString("vi-VN");
    const entry = `[${timestamp}] [Lỗi]: ${message}`;
    this.logs.push(entry);
    console.log(`  ${entry}`);
  }

  // Lấy toàn bộ lịch sử log
  getHistory(): string[] {
    return [...this.logs]; // Trả về bản sao để bảo vệ dữ liệu gốc
  }
}

// ------------------------------------------------------------
// Bài 18: Lớp MathUtil với các phương thức static.
//         (TypeScript không có static class, dùng class với toàn static method)
// ------------------------------------------------------------
export class MathUtil {
  // Ngăn tạo instance (chỉ dùng qua tên class)
  private constructor() {}

  // Cộng
  static add(a: number, b: number): number {
    return a + b;
  }

  // Trừ
  static subtract(a: number, b: number): number {
    return a - b;
  }

  // Nhân
  static multiply(a: number, b: number): number {
    return a * b;
  }

  // Chia (kiểm tra chia cho 0)
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Không thể chia một số cho 0!");
    }
    return a / b;
  }

  // Luỹ thừa
  static power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
}

// ------------------------------------------------------------
// Bài 19: Minh hoạ Method Overriding (ghi đè phương thức)
//         sử dụng đa hình (polymorphism) với Animal và các lớp con.
// ------------------------------------------------------------
export class PolyAnimal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Phương thức sẽ được ghi đè bởi lớp con
  makeSound(): string {
    return `${this.name}: (tiếng kêu chung của loài động vật)`;
  }

  // Phương thức chung không bị ghi đè
  info(): string {
    return `Động vật: ${this.name}`;
  }
}

// Ghi đè makeSound() trong từng lớp con
export class PolyDog extends PolyAnimal {
  constructor(name: string) {
    super(name);
  }

  // Override: ghi đè phương thức của lớp cha
  makeSound(): string {
    return `[Chó] ${this.name}: Gâu! Gâu! Gâu!`;
  }
}

export class PolyCat extends PolyAnimal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): string {
    return `[Mèo] ${this.name}: Meo~ Meo~`;
  }
}

export class PolyCow extends PolyAnimal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): string {
    return `[Bò] ${this.name}: Ụm bò~ Ụm bò~`;
  }
}

// ------------------------------------------------------------
// Bài 20: Interface Vehicle - Cài đặt trong Car và Bike.
//         Minh hoạ "program to an interface".
// ------------------------------------------------------------
export interface Vehicle {
  brand: string;
  speed: number;
  start(): string;
  stop(): string;
  accelerate(amount: number): void;
}

// Lớp VehicleCar cài đặt Vehicle interface
export class VehicleCar implements Vehicle {
  brand: string;
  speed: number;
  private engine: string;

  constructor(brand: string, engine: string) {
    this.brand = brand;
    this.speed = 0;
    this.engine = engine;
  }

  start(): string {
    return `[Ô tô] ${this.brand} (${this.engine}) đã khởi động máy!`;
  }

  stop(): string {
    this.speed = 0;
    return `[Ô tô] ${this.brand} đã dừng lại an toàn.`;
  }

  accelerate(amount: number): void {
    this.speed += amount;
  }
}

// Lớp Bike cài đặt Vehicle interface
export class Bike implements Vehicle {
  brand: string;
  speed: number;
  private type: string; // Loại xe: thể thao, đường phố, địa hình

  constructor(brand: string, type: string) {
    this.brand = brand;
    this.speed = 0;
    this.type = type;
  }

  start(): string {
    return `[Xe máy] ${this.brand} (${this.type}) nổ máy khởi hành!`;
  }

  stop(): string {
    this.speed = 0;
    return `[Xe máy] ${this.brand} đã dừng xe.`;
  }

  accelerate(amount: number): void {
    this.speed += amount;
  }
}

// ================================================================
// CÁC HÀM CHẠY TỪNG BÀI RIÊNG LẺ (Bài 16-20)
// ================================================================

export function runBai16(): void {
  console.log("[Bài 16] Lớp tổng quát Generic Box<T> - Lưu trữ đa kiểu dữ liệu");
  console.log("─".repeat(50));
  const numberBox = new Box<number>(42);
  const stringBox = new Box<string>("Xin chào TypeScript!");
  const objectBox = new Box<{ id: number; name: string }>({ id: 1, name: "Vật phẩm 1" });
  console.log(`  ${numberBox.describe()}`);
  console.log(`  ${stringBox.describe()}`);
  console.log(`  ${objectBox.describe()}`);
  numberBox.setValue(100);
  console.log(`  Sau khi gán giá trị mới (100): ${numberBox.describe()}`);
}

export function runBai17(): void {
  console.log("[Bài 17] Singleton Pattern: Lớp Logger - Duy nhất một thực thể");
  console.log("─".repeat(50));
  const logger1 = Logger.getInstance();
  const logger2 = Logger.getInstance();
  console.log(`  Hai biến cùng trỏ vào 1 thực thể? ${logger1 === logger2 ? "Đúng (Cùng Instance)" : "Sai"}`);
  logger1.log("Hệ thống ứng dụng đã khởi động thành công.");
  logger1.warn("Mức sử dụng bộ nhớ RAM đang tăng cao!");
  logger1.error("Mất kết nối tới cơ sở dữ liệu máy chủ!");
  console.log(`  Tổng số nhật ký (log) đã ghi: ${logger1.getHistory().length}`);
}

export function runBai18(): void {
  console.log("[Bài 18] Lớp MathUtil - Các phương thức tĩnh (Static methods)");
  console.log("─".repeat(50));
  console.log(`  Phép cộng (15 + 7)        = ${MathUtil.add(15, 7)}`);
  console.log(`  Phép trừ (20 - 8)         = ${MathUtil.subtract(20, 8)}`);
  console.log(`  Phép nhân (6 * 9)         = ${MathUtil.multiply(6, 9)}`);
  console.log(`  Phép chia (100 / 4)       = ${MathUtil.divide(100, 4)}`);
  console.log(`  Luỹ thừa (2^10)           = ${MathUtil.power(2, 10)}`);
  try {
    MathUtil.divide(10, 0);
  } catch (e: unknown) {
    const error = e as Error;
    console.log(`  Phép chia (10 / 0)        -> [Bắt lỗi]: ${error.message}`);
  }
}

export function runBai19(): void {
  console.log("[Bài 19] Tính đa hình (Polymorphism) - Ghi đè phương thức");
  console.log("─".repeat(50));
  const zoo: PolyAnimal[] = [
    new PolyDog("Rex"),
    new PolyCat("Kitty"),
    new PolyCow("Bò sữa"),
    new PolyAnimal("Động vật lạ"),
  ];
  zoo.forEach((animal) => {
    console.log(`  - ${animal.makeSound()}`);
  });
}

export function runBai20(): void {
  console.log("[Bài 20] Giao diện Vehicle (Phương tiện) -> Ô tô & Xe máy");
  console.log("─".repeat(50));
  const vehicles: Vehicle[] = [
    new VehicleCar("Toyota Corolla", "Động cơ 1.8L"),
    new Bike("Yamaha Exciter", "Kiểu thể thao"),
  ];
  vehicles.forEach((v) => {
    console.log(`  ${v.start()}`);
    v.accelerate(60);
    console.log(`  -> Tốc độ hiện tại: ${v.speed} km/h`);
    v.accelerate(30);
    console.log(`  -> Tăng tốc thêm -> Tốc độ mới: ${v.speed} km/h`);
    console.log(`  ${v.stop()}`);
    console.log("");
  });
}

// Hàm chạy toàn bộ nhóm 3
export function runPolymorphismExercises(): void {
  console.log("+==============================================================+");
  console.log("|     NHÓM 3: ĐA HÌNH, GENERICS & MẪU THIẾT KẾ (Bài 16 -> 20)  |");
  console.log("+==============================================================+\n");
  for (let i = 16; i <= 20; i++) {
    exerciseRunners3[i]();
    if (i < 20) console.log("");
  }
}

// Map số bài → hàm chạy
export const exerciseRunners3: Record<number, () => void> = {
  16: runBai16, 17: runBai17, 18: runBai18, 19: runBai19, 20: runBai20,
};


