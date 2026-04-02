/**
 * BRC20 铭文协议模拟器
 * 支持：部署、mint、转账、余额查询
 */
export class BRC20Inscribe {
  private balances: Map<string, Map<string, number>>;
  private ticker: string;

  constructor(ticker: string) {
    this.ticker = ticker.toUpperCase();
    this.balances = new Map();
  }

  // 部署代币
  deploy(maxSupply: number, limitPerMint: number): object {
    return { op: 'deploy', tick: this.ticker, maxSupply, limitPerMint };
  }

  // Mint代币
  mint(address: string, amount: number): object {
    if (!this.balances.has(address)) this.balances.set(address, new Map());
    const userBal = this.balances.get(address)!;
    userBal.set(this.ticker, (userBal.get(this.ticker) || 0) + amount);
    return { op: 'mint', tick: this.ticker, to: address, amount };
  }

  // 转账
  transfer(from: string, to: string, amount: number): boolean {
    const fromBal = this.balances.get(from)?.get(this.ticker) || 0;
    if (fromBal < amount) return false;
    this.balances.get(from)!.set(this.ticker, fromBal - amount);
    const toBal = this.balances.get(to) || new Map();
    toBal.set(this.ticker, (toBal.get(this.ticker) || 0) + amount);
    this.balances.set(to, toBal);
    return true;
  }
}

// 测试
const brc20 = new BRC20Inscribe('TSBT');
console.log(brc20.deploy(21000000, 1000));
console.log(brc20.mint('user1', 1000));
console.log('转账:', brc20.transfer('user1', 'user2', 500));
