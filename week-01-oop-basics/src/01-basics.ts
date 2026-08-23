// ================================================================
// TUẦN 1 - NHÓM 1: CƠ BẢN VỀ LỚP VÀ ĐỐI TƯỢNG (Bài 1 → 10)
// Nội dung: Khai báo class, thuộc tính, phương thức, access modifiers,
//           interface cơ bản, getter/setter, mảng đối tượng.
// ================================================================


// Bài 1: Tạo lớp Person với thuộc tính name và age.
//        Viết phương thức hiển thị thông tin.

export class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Phương thức hiển thị thông tin cá nhân
  displayInfo(): void {
    console.log(`  Tên: ${this.name}, Tuổi: ${this.age}`);
  }
}

// ------------------------------------------------------------
// Bài 2: Lớp Student kế thừa Person, thêm thuộc tính grade.
//        Phương thức hiển thị toàn bộ thông tin.
// ------------------------------------------------------------
export class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age); // Gọi constructor của lớp cha
    this.grade = grade;
  }

  // Hiển thị đầy đủ thông tin sinh viên (bao gồm lớp)
  displayAllInfo(): void {
    console.log(`  Tên: ${this.name}, Tuổi: ${this.age}, Lớp: ${this.grade}`);
  }
}

// Bài 3: Lớp Car với thuộc tính brand, model, year.
//        Phương thức hiển thị thông tin xe.
export class Car {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
  // Hiển thị thông tin xe ô tô
  showCarInfo(): void {
    console.log(`  Hãng: ${this.brand}, Mẫu xe: ${this.model}, Năm sản xuất: ${this.year}`);
  }
}


// Bài 4: Lớp Rectangle với width và height. Phương thức tính diện tích và chu vi.
export class Rectangle {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  // Tính diện tích hình chữ nhật
  calculateArea(): number {
    return this.width * this.height;
  }
  // Tính chu vi hình chữ nhật
  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}


// Bài 5: Lớp BankAccount với balance.
//        Phương thức deposit() nạp tiền và withdraw() rút tiền.

export class BankAccount {
  private balance: number; // Số dư là private, chỉ truy cập qua phương thức

  constructor(initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  // Nạp tiền vào tài khoản
  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("  [Cảnh báo] Số tiền nạp phải lớn hơn 0!");
      return;
    }
    this.balance += amount;
    console.log(`  [Thành công] Nạp ${amount.toLocaleString()} VNĐ -> Số dư hiện tại: ${this.balance.toLocaleString()} VNĐ`);
  }

  // Rút tiền từ tài khoản (kiểm tra số dư trước khi rút)
  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("  [Cảnh báo] Số tiền rút phải lớn hơn 0!");
      return;
    }
    if (amount > this.balance) {
      console.log(`  [Thất bại] Không đủ số dư! Hiện có: ${this.balance.toLocaleString()} VNĐ, yêu cầu rút: ${amount.toLocaleString()} VNĐ`);
      return;
    }
    this.balance -= amount;
    console.log(`  [Thành công] Rút ${amount.toLocaleString()} VNĐ -> Số dư hiện tại: ${this.balance.toLocaleString()} VNĐ`);
  }

  // Lấy số dư hiện tại
  getBalance(): number {
    return this.balance;
  }
}


// Bài 6: Lớp Book với thuộc tính title, author, year.
export class Book {
  title: string;
  author: string;
  year: number;

  constructor(title: string, author: string, year: number) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  // Hiển thị thông tin sách
  displayInfo(): void {
    console.log(`  Tựa sách: "${this.title}" - Tác giả: ${this.author} (${this.year})`);
  }
}


// Bài 7: Lớp User với thuộc tính private name và getter/setter.
//        Minh hoạ tính đóng gói (encapsulation).
export class User {
  private _name: string; // Thuộc tính private, đặt prefix _ theo convention
  constructor(name: string) {
    this._name = name;
  }
  // Getter: lấy giá trị name
  get name(): string {
    return this._name;
  }
  // Setter: cập nhật name kèm validation
  set name(value: string) {
    if (value.trim().length === 0) {
      console.log("  [Cảnh báo] Tên không được để trống!");
      return;
    }
    this._name = value;
  }
}

// Bài 8: Lớp Product với name, price.
//        Tạo mảng sản phẩm và lọc sản phẩm có giá > 100.
export class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
  // Hiển thị thông tin sản phẩm
  displayInfo(): void {
    console.log(`  Sản phẩm: ${this.name} - Giá: $${this.price}`);
  }
}
// Hàm tiện ích: lọc sản phẩm có giá lớn hơn ngưỡng cho trước
export function filterProductsByPrice(products: Product[], minPrice: number): Product[] {
  return products.filter((p) => p.price > minPrice);
}


// Bài 9: Định nghĩa interface Animal với thuộc tính name
//        và phương thức sound().
export interface IAnimal {
  name: string;
  sound(): string; // Trả về chuỗi mô tả âm thanh
}
// Lớp cài đặt (implement) interface IAnimal
export class SimpleAnimal implements IAnimal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  // Cài đặt phương thức sound() từ interface
  sound(): string {
    return `${this.name} đang phát ra âm thanh tiếng kêu`;
  }
}

// Bài 10: Lớp Account minh hoạ public, private, readonly fields.
//         Hiểu rõ sự khác biệt giữa các access modifiers.
export class Account {
  public username: string;       // Public: truy cập từ bất kỳ đâu
  private password: string;      // Private: chỉ truy cập trong nội bộ class
  readonly createdAt: Date;      // Readonly: gán 1 lần, không thể thay đổi

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.createdAt = new Date();
  }

  // Kiểm tra mật khẩu (phương thức public truy cập field private)
  validatePassword(input: string): boolean {
    return this.password === input;
  }

  // Hiển thị thông tin tài khoản
  displayInfo(): void {
    console.log(`  Tên đăng nhập (username): ${this.username} (công khai - public)`);
    console.log(`  Mật khẩu (password): ${"*".repeat(this.password.length)} (riêng tư - private)`);
    console.log(`  Ngày tạo: ${this.createdAt.toLocaleDateString("vi-VN")} (chỉ đọc - readonly)`);
  }
}

// ================================================================
// CÁC HÀM CHẠY TỪNG BÀI RIÊNG LẺ (Bài 1-10)
// ================================================================

export function runBai1(): void {
  console.log("[Bài 1] Lớp Person - Hiển thị thông tin cá nhân");
  console.log("─".repeat(50));
  const person1 = new Person("Nguyễn Văn An", 25);
  const person2 = new Person("Trần Thị Bình", 30);
  person1.displayInfo();
  person2.displayInfo();
}

export function runBai2(): void {
  console.log("[Bài 2] Lớp Student kế thừa Person");
  console.log("─".repeat(50));
  const student1 = new Student("Lê Minh Cường", 20, "CNTT-K46");
  const student2 = new Student("Phạm Thị Dung", 21, "KTPM-K45");
  student1.displayAllInfo();
  student2.displayAllInfo();
}

export function runBai3(): void {
  console.log("[Bài 3] Lớp Car - Thông tin xe");
  console.log("─".repeat(50));
  const car1 = new Car("Toyota", "Camry", 2024);
  const car2 = new Car("Honda", "Civic", 2023);
  car1.showCarInfo();
  car2.showCarInfo();
}

export function runBai4(): void {
  console.log("[Bài 4] Lớp Rectangle - Diện tích và Chu vi");
  console.log("─".repeat(50));
  const rect = new Rectangle(10, 5);
  console.log(`  Hình chữ nhật: ${rect.width} x ${rect.height}`);
  console.log(`  -> Diện tích: ${rect.calculateArea()}`);
  console.log(`  -> Chu vi: ${rect.calculatePerimeter()}`);
}

export function runBai5(): void {
  console.log("[Bài 5] Lớp BankAccount - Nạp và Rút tiền");
  console.log("─".repeat(50));
  const bankAcc = new BankAccount(5_000_000);
  console.log(`  Số dư ban đầu: ${bankAcc.getBalance().toLocaleString()} VNĐ`);
  bankAcc.deposit(2_000_000);
  bankAcc.withdraw(1_500_000);
  bankAcc.withdraw(10_000_000); // Thử rút quá số dư
}

export function runBai6(): void {
  console.log("[Bài 6] Lớp Book - Thông tin sách");
  console.log("─".repeat(50));
  const book1 = new Book("Lập Trình TypeScript Nâng Cao", "Nguyễn Văn Hùng", 2024);
  const book2 = new Book("Clean Code", "Robert C. Martin", 2008);
  const book3 = new Book("Design Patterns", "Gang of Four", 1994);
  book1.displayInfo();
  book2.displayInfo();
  book3.displayInfo();
}

export function runBai7(): void {
  console.log("[Bài 7] Lớp User - Getter/Setter (Đóng gói dữ liệu)");
  console.log("─".repeat(50));
  const user = new User("admin_user");
  console.log(`  Tên hiện tại (getter): ${user.name}`);
  user.name = "super_admin"; // Dùng setter
  console.log(`  Tên sau khi đổi (setter): ${user.name}`);
  user.name = "   "; // Test validation: tên rỗng
}

export function runBai8(): void {
  console.log("[Bài 8] Lớp Product - Lọc sản phẩm có giá > $100");
  console.log("─".repeat(50));
  const products: Product[] = [
    new Product("Chuột không dây Logitech", 45),
    new Product("Bàn phím cơ Keychron K2", 150),
    new Product("Tai nghe Sony WH-1000XM5", 280),
    new Product("Cáp USB-C Anker", 12),
    new Product("Màn hình Dell 27\" 4K", 450),
    new Product("Webcam Logitech C920", 80),
  ];
  console.log("  Danh sách tất cả sản phẩm:");
  products.forEach((p) => p.displayInfo());
  const expensive = filterProductsByPrice(products, 100);
  console.log(`\n  Danh sách sản phẩm có giá > $100 (${expensive.length} sản phẩm):`);
  expensive.forEach((p) => p.displayInfo());
}

export function runBai9(): void {
  console.log("[Bài 9] Giao diện (Interface) IAnimal");
  console.log("─".repeat(50));
  const animals: IAnimal[] = [
    new SimpleAnimal("Chó"),
    new SimpleAnimal("Mèo"),
    new SimpleAnimal("Chim"),
  ];
  animals.forEach((a) => console.log(`  - ${a.sound()}`));
}

export function runBai10(): void {
  console.log("[Bài 10] Lớp Account - Phạm vi truy cập (public/private/readonly)");
  console.log("─".repeat(50));
  const acc = new Account("john_doe", "P@ssw0rd!2024");
  acc.displayInfo();
  console.log(`  [Kiểm tra] Mật khẩu đúng? ${acc.validatePassword("P@ssw0rd!2024") ? "Đúng" : "Sai"}`);
  console.log(`  [Kiểm tra] Mật khẩu sai?  ${acc.validatePassword("wrong_pass") ? "Đúng" : "Sai"}`);
}

// Hàm chạy toàn bộ nhóm 1
export function runBasicsExercises(): void {
  console.log("+==============================================================+");
  console.log("|     NHÓM 1: CƠ BẢN VỀ LỚP VÀ ĐỐI TƯỢNG (Bài 1 -> 10)         |");
  console.log("+==============================================================+\n");
  for (let i = 1; i <= 10; i++) {
    exerciseRunners[i]();
    if (i < 10) console.log("");
  }
}

// Map số bài → hàm chạy (dùng cho menu tương tác)
export const exerciseRunners: Record<number, () => void> = {
  1: runBai1, 2: runBai2, 3: runBai3, 4: runBai4, 5: runBai5,
  6: runBai6, 7: runBai7, 8: runBai8, 9: runBai9, 10: runBai10,
};

