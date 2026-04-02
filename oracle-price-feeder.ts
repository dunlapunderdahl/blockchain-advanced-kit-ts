/**
 * 去中心化预言机价格喂价器
 * 功能：多数据源聚合、价格验证、防止恶意数据
 */
export class OraclePriceFeeder {
  private priceSources: Map<string, () => number>;

  constructor() {
    this.priceSources = new Map();
    // 模拟3个价格源
    this.priceSources.set('source1', () => 60000 + Math.random() * 100);
    this.priceSources.set('source2', () => 60000 + Math.random() * 100);
    this.priceSources.set('source3', () => 60000 + Math.random() * 100);
  }

  // 聚合价格（中位数）
  getAggregatedPrice(): number {
    const prices = Array.from(this.priceSources.values()).map(fn => fn());
    prices.sort((a, b) => a - b);
    return prices[1]; // 中位数
  }

  // 验证价格合法性
  isPriceValid(price: number): boolean {
    const avg = Array.from(this.priceSources.values()).reduce((sum, fn) => sum + fn(), 0) / this.priceSources.size;
    return Math.abs(price - avg) < 500;
  }
}

// 测试
const oracle = new OraclePriceFeeder();
console.log('BTC聚合价格:', oracle.getAggregatedPrice().toFixed(2));
console.log('价格有效:', oracle.isPriceValid(60100));
