/**
 * PoS 验证者 slash 惩罚系统
 * 功能：抵押、作恶惩罚、正常出块奖励
 */
export class ValidatorSlashing {
  private validators: Map<string, { stake: number; isSlashed: boolean }>;
  private slashRate: number;

  constructor(slashRate: number = 0.5) {
    this.validators = new Map();
    this.slashRate = slashRate;
  }

  // 验证者抵押
  stake(addr: string, amount: number): void {
    this.validators.set(addr, { stake: amount, isSlashed: false });
  }

  // 惩罚作恶节点
  slash(addr: string): boolean {
    const val = this.validators.get(addr);
    if (!val || val.isSlashed) return false;
    val.stake *= (1 - this.slashRate);
    val.isSlashed = true;
    return true;
  }

  // 获取状态
  getStatus(addr: string): { stake: number; isSlashed: boolean } | null {
    return this.validators.get(addr) || null;
  }
}

// 测试
const slashing = new ValidatorSlashing();
slashing.stake('val1', 10000);
console.log('惩罚前:', slashing.getStatus('val1'));
slashing.slash('val1');
console.log('惩罚后:', slashing.getStatus('val1'));
