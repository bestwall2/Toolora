'use client';

export interface ChainHandoff {
  blob: Blob;
  fileName: string;
  mime: string;
  source: string;
}

const DB_NAME = 'toollora-chain';
const STORE = 'handoffs';
const VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Stores a file handoff for a target tool. The blob is kept in IndexedDB so it survives navigation. */
export async function setChainHandoff(targetSlug: string, handoff: ChainHandoff): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(handoff, targetSlug);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch (err) {
    console.error('[toolchain] failed to store handoff', err);
  }
}

/** Reads and removes a pending handoff for the given tool, if any. */
export async function consumeChainHandoff(targetSlug: string): Promise<ChainHandoff | null> {
  try {
    const db = await openDb();
    const result = await new Promise<ChainHandoff | null>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      const getReq = store.get(targetSlug);
      getReq.onsuccess = () => {
        const value = (getReq.result as ChainHandoff) ?? null;
        if (value) store.delete(targetSlug);
        resolve(value);
      };
      getReq.onerror = () => reject(getReq.error);
    });
    db.close();
    return result;
  } catch (err) {
    console.error('[toolchain] failed to read handoff', err);
    return null;
  }
}