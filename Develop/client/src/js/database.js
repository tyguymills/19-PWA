import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// DONE: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  const result = await store.add({ content });
  await transaction.complete;
  console.log("🚀 - data saved to the database", result);
};

// DONE: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readonly");
  const store = transaction.objectStore("jate");
  const results = await store.getAll();
  const content = results?.at(-1)?.content;

  console.log("value of store", { content, results });
  return content;
};

initdb();
