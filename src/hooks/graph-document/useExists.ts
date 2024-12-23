import { type DocumentGraph } from "contexts/graph-document-context";
import { getGraph } from "db/indexedDB";

export const useExists = () => {
  const existsGraphDocument = async (name: string) => {
    const openedDocument: DocumentGraph = await getGraph(name);

    return Boolean(openedDocument);
  };

  return {
    existsGraphDocument,
  };
};
