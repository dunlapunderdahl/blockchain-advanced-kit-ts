/**
 * 交易防抢跑 / 三明治攻击保护
 * 功能：滑点限制、时间锁定、价格保护
 */
export class FrontRunProtect {
  private maxSlippage: number;
  private lockTime: number;

  constructor(maxSlippage: number = 0.01, lockTime: number = 3000) {
    this.maxSlippage = maxSlippage;
    this.lockTime = lockTime;
  }

  // 检查滑点是否安全
  isSlippageSafe(expected: number, actual: number): boolean {
    const slippage = Math.abs(expected - actual) / expected;
    return slippage <= this.maxSlippage;
  }

  // 时间锁：必须等待N毫秒才能执行
  createTimeLock(): () => boolean {
    const unlockTime = Date.now() + this.lockTime;
    return () => Date.now() >= unlockTime;
  }
}

// 测试
const protect = new FrontRunProtect(0.02);
console.log('滑点安全:', protect.isSlippageSafe(100, 101.5));
const canUnlock = protect.createTimeLock();
console.log('立即解锁:', canUnlock()); // false
