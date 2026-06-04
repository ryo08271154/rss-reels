import { Article } from "@/types/article";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
type SavedContextType = {
  savedArticleIds: string[];
  toggleSavedArticleId: (article: Article) => Promise<boolean>;
};

export const SavedArticleIdsContext = createContext<SavedContextType>({
  savedArticleIds: [],
  toggleSavedArticleId: async (article: Article) => false,
});

export function SavedArticleIdsProvider({ children }: { children: ReactNode }) {
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);

  async function toggleSavedArticleId(article: Article): Promise<boolean> {
    let isSaved = !savedArticleIds.includes(article.id);
    setSavedArticleIds((prev) => {
      const exists = prev.includes(article.id);

      const newList = exists
        ? prev.filter((id) => id !== article.id)
        : [...prev, article.id];

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
