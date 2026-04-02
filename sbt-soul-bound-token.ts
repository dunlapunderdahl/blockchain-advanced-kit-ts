/**
 * SBT 灵魂绑定代币实现（不可转让）
 * 功能：铸造、销毁、查询、禁止转账
 */
export class SBTContract {
  private name: string;
  private tokenHolders: Map<string, string>; // tokenId => owner

  constructor(name: string) {
    this.name = name;
    this.tokenHolders = new Map();
  }

  // 铸造SBT
  mint(to: string, tokenId: string): boolean {
    if (this.tokenHolders.has(tokenId)) return false;
    this.tokenHolders.set(tokenId, to);
    return true;
  }

  // 禁止转账（SBT核心）
  transfer(from: string, to: string, tokenId: string): boolean {
    return false;
  }

  // 查询持有者
  ownerOf(tokenId: string): string | null {
    return this.tokenHolders.get(tokenId) || null;
  }

  // 销毁
  burn(tokenId: string): boolean {
    if (!this.tokenHolders.has(tokenId)) return false;
    this.tokenHolders.delete(tokenId);
    return true;
  }
}

// 测试
const sbt = new SBTContract('DeveloperSBT');
sbt.mint('user1', 'sbt001');
console.log('持有者:', sbt.ownerOf('sbt001'));
console.log('转账结果(必须失败):', sbt.transfer('user1', 'user2', 'sbt001'));
