/**
 * ERC721 NFT 标准实现
 * 功能：铸造、转账、余额、元数据URI
 */
export class ERC721NFT {
  private name: string;
  private symbol: string;
  private ownerOfMap: Map<string, string>;
  private tokenURI: Map<string, string>;

  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
    this.ownerOfMap = new Map();
    this.tokenURI = new Map();
  }

  // 铸造NFT
  mint(to: string, tokenId: string, uri: string): boolean {
    if (this.ownerOfMap.has(tokenId)) return false;
    this.ownerOfMap.set(tokenId, to);
    this.tokenURI.set(tokenId, uri);
    return true;
  }

  // 转账
  transfer(from: string, to: string, tokenId: string): boolean {
    if (this.ownerOfMap.get(tokenId) !== from) return false;
    this.ownerOfMap.set(tokenId, to);
    return true;
  }

  // 获取元数据
  getTokenURI(tokenId: string): string | null {
    return this.tokenURI.get(tokenId) || null;
  }
}

// 测试
const nft = new ERC721NFT('BlockchainNFT', 'BNFT');
nft.mint('user1', 'nft001', 'ipfs://metadata');
console.log('URI:', nft.getTokenURI('nft001'));
