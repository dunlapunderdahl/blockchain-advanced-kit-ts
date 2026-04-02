/**
 * 白名单空投 - 默克尔树分发器
 * 功能：生成白名单根、验证资格、空投发放
 */
import { sha256 } from '@noble/hashes/sha256';

export class MerkleAirdrop {
  private merkleRoot: string;
  private claimed: Set<string>;

  constructor(root: string) {
    this.merkleRoot = root;
    this.claimed = new Set();
  }

  // 哈希函数
  private hash(data: string): string {
    return Buffer.from(sha256(data)).toString('hex');
  }

  // 验证白名单
  verifyProof(account: string, proof: string[]): boolean {
    let leaf = this.hash(account);
    for (const p of proof) leaf = this.hash(leaf + p);
    return leaf === this.merkleRoot;
  }

  // 领取空投
  claim(account: string, proof: string[]): boolean {
    if (!this.verifyProof(account, proof) || this.claimed.has(account)) return false;
    this.claimed.add(account);
    return true;
  }
}

// 测试
const airdrop = new MerkleAirdrop('root123');
console.log('验证资格:', airdrop.verifyProof('user1', ['p1', 'p2']));
