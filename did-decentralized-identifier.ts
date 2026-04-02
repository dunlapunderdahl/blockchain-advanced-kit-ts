/**
 * DID 去中心化身份实现
 * 功能：DID创建、VC凭证、身份验证
 */
export interface DIDDocument {
  did: string;
  publicKey: string;
  credentials: string[];
}

export class DIDSystem {
  private didMap: Map<string, DIDDocument>;

  constructor() {
    this.didMap = new Map();
  }

  // 创建DID
  createDID(publicKey: string): DIDDocument {
    const did = `did:web:blockchain:${publicKey.slice(-10)}`;
    const doc: DIDDocument = { did, publicKey, credentials: [] };
    this.didMap.set(did, doc);
    return doc;
  }

  // 添加可验证凭证
  addCredential(did: string, credential: string): boolean {
    const doc = this.didMap.get(did);
    if (!doc) return false;
    doc.credentials.push(credential);
    return true;
  }

  // 验证DID
  verifyDID(did: string, publicKey: string): boolean {
    const doc = this.didMap.get(did);
    return !!doc && doc.publicKey === publicKey;
  }
}

// 测试
const didSys = new DIDSystem();
const userDID = didSys.createDID('0xPK12345678');
didSys.addCredential(userDID.did, 'KYC_verified');
console.log('DID文档:', userDID);
console.log('验证:', didSys.verifyDID(userDID.did, '0xPK12345678'));
