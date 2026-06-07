import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
type SavedContextType = {
  savedArticleIds: string[];
  toggleSavedArticleId: (id: string) => Promise<boolean>;
};

export const SavedArticleIdsContext = createContext<SavedContextType>({
  savedArticleIds: [],
  toggleSavedArticleId: async (id: string) => false,
});

export function SavedArticleIdsProvider({ children }: { children: ReactNode }) {
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);

  async function toggleSavedArticleId(id: string): Promise<boolean> {
    let isSaved = !savedArticleIds.includes(id);
    setSavedArticleIds((prev) => {
      const exists = prev.includes(id);

      const newList = exists
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      AsyncStorage.setItem("savedArticleIds", JSON.stringify(newList));

      return newList;
    });
    return isSaved;
  }

  // 保存した記事IDを読み込む
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("savedArticleIds");
      if (data) {
        setSavedArticleIds(JSON.parse(data));
      }
    })();
  }, []);

  return (
    <SavedArticleIdsContext.Provider
      value={{ savedArticleIds, toggleSavedArticleId }}
    >
      {children}
    </SavedArticleIdsContext.Provider>
  );
}
