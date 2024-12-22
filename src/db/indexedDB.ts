import { DocumentGraph } from "contexts/graph-document-context";

const dbName = "graphDatabase";
const storeName = "graphs";

const openIndexedDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;

      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "name" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, ms);
  });
};

export const addGraph = async (graphName: string, graphData: any) => {
  const db = await openIndexedDB();
  //   await sleep(2000);
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const createdDate = new Date().toISOString();
    const request = store.put({
      name: graphName,
      data: graphData,
      createdDate: createdDate,
      modifiedDate: createdDate,
    });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateGraph = async (graphName: string, graphData: any) => {
  const db = await openIndexedDB();

  return new Promise<DocumentGraph>(async (resolve, reject) => {
    // Start a read transaction to get the existing item
    const readTransaction = db.transaction([storeName], "readonly");
    const readStore = readTransaction.objectStore(storeName);
    const getRequest = readStore.get(graphName);

    getRequest.onsuccess = () => {
      const existingGraph = getRequest.result;

      if (existingGraph) {
        // Use the existing createdDate if it exists
        const createdDate = existingGraph.createdDate;

        // Start a write transaction to update the item
        const writeTransaction = db.transaction([storeName], "readwrite");
        const writeStore = writeTransaction.objectStore(storeName);
        const updateRequest = writeStore.put({
          name: graphName,
          data: graphData,
          createdDate: createdDate,
          modifiedDate: new Date().toISOString(),
        });

        updateRequest.onsuccess = async () => {
          // Retrieve the updated document
          const updatedTransaction = db.transaction([storeName], "readonly");
          const updatedStore = updatedTransaction.objectStore(storeName);
          const updatedGetRequest = updatedStore.get(graphName);

          updatedGetRequest.onsuccess = () => {
            resolve(updatedGetRequest.result);
          };

          updatedGetRequest.onerror = () => {
            reject(updatedGetRequest.error);
          };
        };

        updateRequest.onerror = () => {
          reject(updateRequest.error);
        };
      } else {
        reject(new Error(`Graph with name ${graphName} not found.`));
      }
    };

    getRequest.onerror = () => {
      reject(getRequest.error);
    };
  });
};

export const getGraph = async (graphName: string) => {
  const db = await openIndexedDB();
  return new Promise<DocumentGraph>((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(graphName);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteGraph = async (graphName: string) => {
  const db = await openIndexedDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(graphName);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const renameGraph = async (oldName: string, newName: string) => {
  const db = await openIndexedDB();
  const graphData = await getGraph(oldName);
  if (graphData) {
    await addGraph(newName, graphData);
    await deleteGraph(oldName);
  }
};

export const getAllGraphs = async () => {
  const db = await openIndexedDB();
  return new Promise<any[]>((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result.map((item: any) => item));
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
