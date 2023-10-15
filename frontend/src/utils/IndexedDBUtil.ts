export interface IndexedDBDataType<K, T> {
  id: K;
  data: T;
}

/**
 * 기능 안정성 확보를 위해 사용하고 싶은 objectStore를 이곳에서 추가해줘야 합니다.
 */
const OBJECT_STORE_NAMES = ['stations', 'cities'] as const;
export type ObjectStoreNamesType = (typeof OBJECT_STORE_NAMES)[number];

class IndexedDBUtil<K, T> {
  private readonly dbName: string;
  private readonly dbVersion: number;
  private db: IDBDatabase | null;

  constructor(dbName: string, dbVersion: number) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.db = null;
  }

  public async open(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        for (const storeName of OBJECT_STORE_NAMES) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          }
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  public close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  public async addData(
    storeName: ObjectStoreNamesType,
    data: IndexedDBDataType<K, T>
  ): Promise<void> {
    return this.performDBOperation(storeName, (store) => store.add(data));
  }

  public async addMultipleData(
    storeName: ObjectStoreNamesType,
    dataArray: IndexedDBDataType<K, T>[]
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('.open()이 호출되지 않았습니다.'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      const promises = dataArray.map((data) => {
        return new Promise<void>((resolve, reject) => {
          const request = objectStore.add(data);

          request.onsuccess = () => {
            resolve();
          };

          request.onerror = (event) => {
            const error = (event.target as IDBRequest).error;
            console.error('Error:', error);
            reject(error);
          };
        });
      });

      Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async removeAllData(storeName: ObjectStoreNamesType): Promise<void> {
    return this.performDBOperation(storeName, (store) => store.clear());
  }

  public async getAllData(storeName: ObjectStoreNamesType): Promise<IndexedDBDataType<K, T>[]> {
    return new Promise<IndexedDBDataType<K, T>[]>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('.open()이 호출되지 않았습니다.'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const data = request.result;
        resolve(data);
      };

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        console.error('Error:', error);
        reject(error);
      };
    });
  }

  private async performDBOperation(
    storeName: ObjectStoreNamesType,
    operation: (store: IDBObjectStore) => IDBRequest
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.db) {
        reject(new Error('.open()이 호출되지 않았습니다.'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      const request = operation(objectStore);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        console.error('Error:', error);
        reject(error);
      };
    });
  }
}

export default IndexedDBUtil;
