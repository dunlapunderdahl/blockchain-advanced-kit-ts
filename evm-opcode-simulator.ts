/**
 * EVM 虚拟机指令集模拟器
 * 功能：栈操作、ADD、MUL、STORE 基础指令
 */
export class EVMSimulator {
  private stack: bigint[];
  private storage: Map<bigint, bigint>;

  constructor() {
    this.stack = [];
    this.storage = new Map();
  }

  // 入栈
  push(value: bigint): void {
    this.stack.push(value);
  }

  // 加法
  add(): void {
    const a = this.stack.pop()!;
    const b = this.stack.pop()!;
    this.stack.push(a + b);
  }

  // 乘法
  mul(): void {
    const a = this.stack.pop()!;
    const b = this.stack.pop()!;
    this.stack.push(a * b);
  }

  // 存储
  sstore(key: bigint): void {
    const val = this.stack.pop()!;
    this.storage.set(key, val);
  }

  // 查询栈顶
  top(): bigint | null {
    return this.stack.length ? this.stack[this.stack.length - 1] : null;
  }
}

// 测试
const evm = new EVMSimulator();
evm.push(10n);
evm.push(20n);
evm.add();
console.log('计算结果:', evm.top()); // 30n
