/**
 * 区块链轻节点客户端
 * 功能：同步区块头、验证状态根、无需存储全链
 */
interface BlockHeader {
  height: number;
  hash: string;
  prevHash: string;
  stateRoot: string;
}

export class LightClient {
  private latestHeader: BlockHeader | null;
  private headerStore: Map<number, BlockHeader>;

  constructor() {
    this.latestHeader = null;
    this.headerStore = new Map();
  }

  // 同步区块头
  syncHeader(header: BlockHeader): boolean {
    if (this.latestHeader && header.prevHash !== this.latestHeader.hash) return false;
    this.headerStore.set(header.height, header);
    this.latestHeader = header;
    return true;
  }

  // 获取最新高度
  getLatestHeight(): number {
    return this.latestHeader?.height || 0;
  }

  // 获取状态根
  getStateRoot(height: number): string | null {
    return this.headerStore.get(height)?.stateRoot || null;
  }
}

// 测试
const light = new LightClient();
light.syncHeader({ height: 1, hash: 'h1', prevHash: '0', stateRoot: 's1' });
console.log('最新高度:', light.getLatestHeight());
