// ================================================================
// TUẦN 1 - NHÓM 4: NÂNG CAO & TỔNG HỢP (Bài 21 → 30)
// Nội dung: Generic Repository, Stack, Payment strategy, Abstract class,
//           static method, Order-Product, Teacher, protected access,
//           Movable interface, School (tổng hợp).
// ================================================================

import { Person, Student, Product } from "./01-basics";

// ------------------------------------------------------------
// Bài 21: Lớp generic Repository<T> với phương thức add(), getAll().
//         Ứng dụng Generics để tạo kho lưu trữ đa năng.
// ------------------------------------------------------------
export class Repository<T> {
  private items: T[] = [];

  // Thêm phần tử vào repository
  add(item: T): void {
    this.items.push(item);
  }

  // Thêm nhiều phần tử cùng lúc
  addMany(items: T[]): void {
    this.items.push(...items);
  }

  // Lấy toàn bộ phần tử
  getAll(): T[] {
    return [...this.items]; // Trả bản sao để bảo vệ dữ liệu
  }

  // Lấy phần tử theo chỉ mục
  getById(index: number): T | undefined {
    return this.items[index];
  }

  // Đếm số phần tử
  count(): number {
    return this.items.length;
  }

  // Xoá phần tử theo chỉ mục
  remove(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }
}

// ------------------------------------------------------------
// Bài 22: Lớp Stack<T> với push, pop, peek, isEmpty.
//         Cấu trúc dữ liệu ngăn xếp (LIFO - Last In First Out).
// ------------------------------------------------------------
export class Stack<T> {
  private elements: T[] = [];

  // Đẩy phần tử vào đỉnh ngăn xếp
  push(item: T): void {
    this.elements.push(item);
  }

  // Lấy và xoá phần tử ở đỉnh ngăn xếp
  pop(): T | undefined {
    if (this.isEmpty()) {
      console.log("  [Cảnh báo] Ngăn xếp đang rỗng, không thể lấy phần tử ra (pop)!");
      return undefined;
    }
    return this.elements.pop();
  }

  // Xem phần tử đỉnh ngăn xếp (không xoá)
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.elements[this.elements.length - 1];
  }

  // Kiểm tra ngăn xếp có rỗng không
  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  // Lấy kích thước ngăn xếp
  size(): number {
    return this.elements.length;
  }

  // Hiển thị nội dung stack
  display(): string {
    if (this.isEmpty()) return "Ngăn xếp Stack: [rỗng]";
    return `Ngăn xếp Stack (đỉnh -> đáy): [${[...this.elements].reverse().join(", ")}]`;
  }
}

// ------------------------------------------------------------
// Bài 23: Interface Payment với phương thức pay(amount).
//         Cài đặt CashPayment và CardPayment.
//         (Strategy Pattern)
// ------------------------------------------------------------
export interface Payment {
  pay(amount: number): string;
}

// Thanh toán bằng tiền mặt
export class CashPayment implements Payment {
  pay(amount: number): string {
    return `[Tiền mặt] Thanh toán tiền mặt: ${amount.toLocaleString()} VNĐ - Thành công!`;
  }
}

// Thanh toán bằng thẻ ngân hàng
export class CardPayment implements Payment {
  private cardNumber: string;

  constructor(cardNumber: string) {
    // Che bớt số thẻ để bảo mật
    this.cardNumber = "**** **** **** " + cardNumber.slice(-4);
  }

  pay(amount: number): string {
    return `[Thẻ ngân hàng] Thanh toán qua thẻ ${this.cardNumber}: ${amount.toLocaleString()} VNĐ - Thành công!`;
  }
}

// Thanh toán qua ví điện tử (mở rộng thêm)
export class EWalletPayment implements Payment {
  private walletName: string;

  constructor(walletName: string) {
    this.walletName = walletName;
  }

  pay(amount: number): string {
    return `[Ví điện tử] Thanh toán qua ví điện tử ${this.walletName}: ${amount.toLocaleString()} VNĐ - Thành công!`;
  }
}

// ------------------------------------------------------------
// Bài 24: Lớp trừu tượng Appliance với phương thức turnOn().
//         Cài đặt Fan và AirConditioner.
// ------------------------------------------------------------
export abstract class Appliance {
  name: string;
  isOn: boolean = false;

  constructor(name: string) {
    this.name = name;
  }

  // Phương thức trừu tượng: mỗi thiết bị bật khác nhau
  abstract turnOn(): string;

  // Phương thức chung: tắt thiết bị
  turnOff(): string {
    this.isOn = false;
    return `[Tắt] ${this.name} đã được tắt nguồn.`;
  }
}

// Quạt điện
export class Fan extends Appliance {
  private speedLevel: number; // Tốc độ gió (1-5)

  constructor(name: string, speedLevel: number = 3) {
    super(name);
    this.speedLevel = speedLevel;
  }

  turnOn(): string {
    this.isOn = true;
    return `[Quạt điện] ${this.name} đã bật ở mức gió ${this.speedLevel}/5 - Làm mát êm ái!`;
  }
}

// Máy lạnh / Điều hoà
export class AirConditioner extends Appliance {
  private temperature: number; // Nhiệt độ cài đặt (°C)

  constructor(name: string, temperature: number = 24) {
    super(name);
    this.temperature = temperature;
  }

  turnOn(): string {
    this.isOn = true;
    return `[Máy lạnh] ${this.name} đã bật ở nhiệt độ ${this.temperature} độ C - Không khí mát lạnh!`;
  }

  // Phương thức riêng: điều chỉnh nhiệt độ
  setTemperature(temp: number): string {
    this.temperature = temp;
    return `[Nhiệt độ] ${this.name} điều chỉnh nhiệt độ cài đặt -> ${this.temperature} độ C`;
  }
}

// ------------------------------------------------------------
// Bài 25: Lớp ShapeInfo với phương thức static describe().
//         Minh hoạ static method trong class.
// ------------------------------------------------------------
export class ShapeInfo {
  name: string;
  sides: number;

  constructor(name: string, sides: number) {
    this.name = name;
    this.sides = sides;
  }

  // Phương thức static: mô tả tổng quan về hình học
  static describe(): string {
    return "Shape là lớp cơ sở đại diện cho các hình học không gian 2 chiều. Mỗi hình học có tên và số cạnh tương ứng.";
  }

  // Phương thức static: tạo hình từ danh sách cạnh
  static createCommonShapes(): ShapeInfo[] {
    return [
      new ShapeInfo("Tam giác", 3),
      new ShapeInfo("Hình vuông", 4),
      new ShapeInfo("Ngũ giác", 5),
      new ShapeInfo("Lục giác", 6),
    ];
  }

  // Phương thức instance
  getInfo(): string {
    return `Hình học: ${this.name} (${this.sides} cạnh)`;
  }
}

// ------------------------------------------------------------
// Bài 26: Lớp Order chứa danh sách Product.
//         Phương thức tính tổng giá trị đơn hàng.
//         (Sử dụng Product đã import từ 01-basics)
// ------------------------------------------------------------
export class Order {
  orderId: string;
  private products: { product: Product; quantity: number }[] = [];
  createdAt: Date;

  constructor(orderId: string) {
    this.orderId = orderId;
    this.createdAt = new Date();
  }

  // Thêm sản phẩm vào đơn hàng
  addProduct(product: Product, quantity: number = 1): void {
    this.products.push({ product, quantity });
  }

  // Tính tổng giá trị đơn hàng
  calculateTotal(): number {
    return this.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  // Hiển thị chi tiết đơn hàng
  displayOrder(): void {
    console.log(`  Mã đơn hàng: #${this.orderId}`);
    console.log(`  Ngày tạo: ${this.createdAt.toLocaleDateString("vi-VN")}`);
    console.log("  Chi tiết các món hàng:");
    this.products.forEach((item, i) => {
      const subtotal = item.product.price * item.quantity;
      console.log(`    ${i + 1}. ${item.product.name} (Số lượng: ${item.quantity}) = $${subtotal}`);
    });
    console.log(`  ─────────────────────────────`);
    console.log(`  Tổng thành tiền: $${this.calculateTotal()}`);
  }
}

// ------------------------------------------------------------
// Bài 27: Lớp Teacher kế thừa Person.
//         Thêm thuộc tính subject và phương thức introduce().
//         (Sử dụng Person đã import từ 01-basics)
// ------------------------------------------------------------
export class Teacher extends Person {
  subject: string; // Môn giảng dạy

  constructor(name: string, age: number, subject: string) {
    super(name, age);
    this.subject = subject;
  }

  // Giới thiệu bản thân
  introduce(): string {
    return `[Giáo viên] Xin chào! Tôi tên là ${this.name}, ${this.age} tuổi, phụ trách giảng dạy môn ${this.subject}.`;
  }
}

// ------------------------------------------------------------
// Bài 28: Lớp AnimalProtected với phương thức protected makeSound().
//         Kế thừa ProtectedDog và ProtectedCat để ghi đè.
//         Minh hoạ từ khoá protected (truy cập trong class con).
// ------------------------------------------------------------
export class AnimalProtected {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Protected: chỉ truy cập trong class này và class con
  protected makeSound(): string {
    return "(âm thanh mặc định)";
  }

  // Public method gọi protected method
  speak(): string {
    return `${this.name}: ${this.makeSound()}`;
  }
}

// Dog ghi đè makeSound() (truy cập protected từ class con)
export class ProtectedDog extends AnimalProtected {
  constructor(name: string) {
    super(name);
  }

  // Override phương thức protected
  protected makeSound(): string {
    return "Gâu gâu gâu!";
  }
}

// Cat ghi đè makeSound()
export class ProtectedCat extends AnimalProtected {
  constructor(name: string) {
    super(name);
  }

  protected makeSound(): string {
    return "Meo meo~";
  }
}

// ------------------------------------------------------------
// Bài 29: Interface Movable với phương thức move().
//         Cài đặt trong MovableCar và Robot.
// ------------------------------------------------------------
export interface Movable {
  move(): string;
  getPosition(): string;
}

// Xe hơi di chuyển trên đường
export class MovableCar implements Movable {
  private brand: string;
  private position: number = 0; // Vị trí trên trục số (km)

  constructor(brand: string) {
    this.brand = brand;
  }

  move(): string {
    this.position += 10; // Di chuyển 10km
    return `[Ô tô] Xe ${this.brand} di chuyển -> Vị trí: ${this.position} km`;
  }

  getPosition(): string {
    return `Xe ${this.brand} hiện đang ở vị trí: ${this.position} km`;
  }
}

// Robot di chuyển trong nhà máy
export class Robot implements Movable {
  private name: string;
  private x: number = 0;
  private y: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  move(): string {
    this.x += 1;
    this.y += 1;
    return `[Robot] Robot ${this.name} di chuyển -> Toạ độ: (${this.x}, ${this.y})`;
  }

  getPosition(): string {
    return `Robot ${this.name} hiện đang ở toạ độ: (${this.x}, ${this.y})`;
  }
}

// ------------------------------------------------------------
// Bài 30: Lớp School chứa danh sách Student và Teacher.
//         Phương thức hiển thị thông tin.
//         (Tổng hợp: sử dụng Student từ 01-basics, Teacher từ bài 27)
// ------------------------------------------------------------
export class School {
  name: string;
  private students: Student[] = [];
  private teachers: Teacher[] = [];

  constructor(name: string) {
    this.name = name;
  }

  // Thêm sinh viên
  addStudent(student: Student): void {
    this.students.push(student);
  }

  // Thêm giáo viên
  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  // Lấy tổng số người trong trường
  getTotalPeople(): number {
    return this.students.length + this.teachers.length;
  }

  // Hiển thị toàn bộ thông tin trường học
  displayInfo(): void {
    console.log(`  Tên trường: ${this.name}`);
    console.log(`  ══════════════════════════════════════`);
    console.log(`  Tổng số thành viên: ${this.getTotalPeople()} người (${this.teachers.length} Giáo viên, ${this.students.length} Sinh viên)\n`);

    if (this.teachers.length > 0) {
      console.log("  DANH SÁCH GIÁO VIÊN:");
      this.teachers.forEach((t, i) => {
        console.log(`     ${i + 1}. ${t.introduce()}`);
      });
    }

    if (this.students.length > 0) {
      console.log("\n  DANH SÁCH SINH VIÊN:");
      this.students.forEach((s, i) => {
        console.log(`     ${i + 1}. Sinh viên: ${s.name} | Tuổi: ${s.age} | Lớp: ${s.grade}`);
      });
    }
  }
}

// ================================================================
// CÁC HÀM CHẠY TỪNG BÀI RIÊNG LẺ (Bài 21-30)
// ================================================================

export function runBai21(): void {
  console.log("[Bài 21] Lớp tổng quát Repository<T> - Quản lý kho dữ liệu");
  console.log("─".repeat(50));
  const userRepo = new Repository<{ id: number; name: string }>();
  userRepo.add({ id: 1, name: "Nguyễn Văn A" });
  userRepo.add({ id: 2, name: "Trần Thị B" });
  userRepo.add({ id: 3, name: "Lê Văn C" });
  console.log(`  Tổng số phần tử: ${userRepo.count()}`);
  console.log(`  Phần tử đầu tiên: ${JSON.stringify(userRepo.getById(0))}`);
  console.log(`  Toàn bộ danh sách: ${JSON.stringify(userRepo.getAll())}`);
  userRepo.remove(1);
  console.log(`  Sau khi xoá phần tử tại vị trí 1: ${JSON.stringify(userRepo.getAll())}`);
}

export function runBai22(): void {
  console.log("[Bài 22] Cấu trúc dữ liệu Ngăn xếp Stack<T> (LIFO)");
  console.log("─".repeat(50));
  const stack = new Stack<number>();
  console.log(`  Ngăn xếp có rỗng không? ${stack.isEmpty() ? "Có (Đang rỗng)" : "Không"}`);
  stack.push(10);
  stack.push(20);
  stack.push(30);
  console.log(`  ${stack.display()}`);
  console.log(`  Xem phần tử đỉnh (peek): ${stack.peek()}`);
  console.log(`  Lấy phần tử đỉnh ra (pop): ${stack.pop()}`);
  console.log(`  ${stack.display()}`);
  console.log(`  Kích thước hiện tại: ${stack.size()}`);

  const stringStack = new Stack<string>();
  stringStack.push("HTML");
  stringStack.push("CSS");
  stringStack.push("TypeScript");
  console.log(`  ${stringStack.display()}`);
}

export function runBai23(): void {
  console.log("[Bài 23] Giao diện Payment (Thanh toán) -> Tiền mặt & Thẻ");
  console.log("─".repeat(50));
  const payments: Payment[] = [
    new CashPayment(),
    new CardPayment("4532015112830366"),
    new EWalletPayment("MoMo"),
  ];
  payments.forEach((p) => {
    console.log(`  ${p.pay(500_000)}`);
  });
}

export function runBai24(): void {
  console.log("[Bài 24] Lớp trừu tượng Thiết bị điện (Appliance) -> Quạt & Máy lạnh");
  console.log("─".repeat(50));
  const appliances: Appliance[] = [
    new Fan("Quạt trần Panasonic", 4),
    new AirConditioner("Điều hoà Daikin", 22),
  ];
  appliances.forEach((a) => {
    console.log(`  ${a.turnOn()}`);
  });
  const ac = appliances[1] as AirConditioner;
  console.log(`  ${ac.setTemperature(18)}`);
  appliances.forEach((a) => {
    console.log(`  ${a.turnOff()}`);
  });
}

export function runBai25(): void {
  console.log("[Bài 25] Lớp ShapeInfo với phương thức tĩnh (Static method)");
  console.log("─".repeat(50));
  console.log(`  ${ShapeInfo.describe()}`);
  const commonShapes = ShapeInfo.createCommonShapes();
  commonShapes.forEach((s) => console.log(`  - ${s.getInfo()}`));
}

export function runBai26(): void {
  console.log("[Bài 26] Lớp Order (Đơn hàng) với danh sách sản phẩm Product");
  console.log("─".repeat(50));
  const order = new Order("ORD-2024-001");
  order.addProduct(new Product("MacBook Air M3", 1299), 1);
  order.addProduct(new Product("AirPods Pro 2", 249), 2);
  order.addProduct(new Product("USB-C Hub", 45), 1);
  order.displayOrder();
}

export function runBai27(): void {
  console.log("[Bài 27] Lớp Teacher (Giáo viên) kế thừa từ Person");
  console.log("─".repeat(50));
  const teacher1 = new Teacher("Nguyễn Minh Tuấn", 40, "Lập trình Di động");
  const teacher2 = new Teacher("Trần Thị Hương", 35, "Cơ sở Dữ liệu");
  console.log(`  ${teacher1.introduce()}`);
  console.log(`  ${teacher2.introduce()}`);
}

export function runBai28(): void {
  console.log("[Bài 28] Thuộc tính/phương thức được bảo vệ (Protected) - Ghi đè ở lớp con");
  console.log("─".repeat(50));
  const protAnimals: AnimalProtected[] = [
    new ProtectedDog("Rex"),
    new ProtectedCat("Mimi"),
    new AnimalProtected("Thú lạ"),
  ];
  protAnimals.forEach((a) => console.log(`  - ${a.speak()}`));
}

export function runBai29(): void {
  console.log("[Bài 29] Giao diện Movable (Di chuyển) -> Ô tô & Robot");
  console.log("─".repeat(50));
  const movables: Movable[] = [
    new MovableCar("VinFast VF8"),
    new Robot("RoboWorker-01"),
  ];
  movables.forEach((m) => {
    console.log(`  ${m.move()}`);
    console.log(`  ${m.move()}`);
    console.log(`  [Vị trí] ${m.getPosition()}`);
    console.log("");
  });
}

export function runBai30(): void {
  console.log("[Bài 30] Lớp School (Trường học) - Tổng hợp Student & Teacher");
  console.log("─".repeat(50));
  const school = new School("Trường Đại học Công nghệ TP.HCM (HUTECH)");

  school.addTeacher(new Teacher("PGS.TS Nguyễn Văn Minh", 50, "Trí tuệ Nhân tạo"));
  school.addTeacher(new Teacher("ThS. Lê Thị Thuỷ", 38, "Lập trình Web"));
  school.addTeacher(new Teacher("TS. Phạm Hoàng Long", 45, "Mạng Máy tính"));

  school.addStudent(new Student("Trần Minh Khôi", 20, "CNTT-K48A"));
  school.addStudent(new Student("Nguyễn Thị Mai", 21, "CNTT-K48A"));
  school.addStudent(new Student("Lê Hoàng Nam", 20, "CNTT-K48B"));
  school.addStudent(new Student("Phạm Thuỳ Linh", 22, "KTPM-K47"));
  school.addStudent(new Student("Đỗ Văn Thắng", 21, "KTPM-K47"));

  school.displayInfo();
}

// Hàm chạy toàn bộ nhóm 4
export function runAdvancedExercises(): void {
  console.log("+==============================================================+");
  console.log("|     NHÓM 4: NÂNG CAO VÀ TỔNG HỢP (Bài 21 -> 30)              |");
  console.log("+==============================================================+\n");
  for (let i = 21; i <= 30; i++) {
    exerciseRunners4[i]();
    if (i < 30) console.log("");
  }
}

// Map số bài → hàm chạy
export const exerciseRunners4: Record<number, () => void> = {
  21: runBai21, 22: runBai22, 23: runBai23, 24: runBai24, 25: runBai25,
  26: runBai26, 27: runBai27, 28: runBai28, 29: runBai29, 30: runBai30,
};


