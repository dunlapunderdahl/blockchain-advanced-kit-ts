/**
 * 区块链交易内存池 Mempool
 * 功能：交易排队、按Gas费排序、去重、打包出块
 */
interface MempoolTx {
  hash: string;
  gasPrice: number;
  data: string;
}

export class MempoolManager {
  private txPool: Map<string, MempoolTx>;

  constructor() {
    this.txPool = new Map();
  }

  // 添加交易
  addTx(tx: MempoolTx): boolean {
    if (this.txPool.has(tx.hash)) return false;
    this.txPool.set(tx.hash, tx);
    return true;
  }

  // 获取排序后的交易（Gas从高到低）
  getSortedTxs(limit: number = 5): MempoolTx[] {
    return Array.from(this.txPool.values())
      .sort((a, b) => b.gasPrice - a.gasPrice)
      .slice(0, limit);
  }

  // 打包后移除交易
  removeTxs(hashes: string[]): void {
    hashes.forEach(h => this.txPool.delete(h));
  }
}

// 测试
const mempool = new MempoolManager();
mempool.addTx({ hash: 'tx1', gasPrice: 50, data: 'transfer' });
mempool.addTx({ hash: 'tx2', gasPrice: 100, data: 'approve' });
console.log('排序交易:', mempool.getSortedTxs());
