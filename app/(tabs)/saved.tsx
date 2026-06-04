import ArticleCard from "@/components/ArticleCard";
import { SavedArticleIdsContext } from "@/context/SavedArticleIdsContext";
import { SettingsContext } from "@/context/SettingsContext";
import { ThemeContext } from "@/context/ThemeContext";
import { getArticleById } from "@/lib/rss";
import { Article } from "@/types/article";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function SavedScreen() {
  const { settings, setSettings, saveSettings, resetSettings } =
    useContext(SettingsContext);
  const { savedArticleIds } = useContext(SavedArticleIdsContext);
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  // 保存した記事IDから記事の詳細を読み込む
  useEffect(() => {
    (async () => {
      const articles: Article[] = [];

      for (const articleId of savedArticleIds) {
        const article = await getArticleById(settings, articleId);

        if (article?.id) {
          articles.push(article);
        }
      }
      setSavedArticles(articles);
    })();
  }, [savedArticleIds, settings]);

  return (
    <FlatList
      data={savedArticles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ArticleCard article={item} />}
      contentContainerStyle={
        savedArticles.length === 0 ? styles.emptyContent : undefined
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            {t("noSavedArticlesTitle")}
          </Text>
          <Text style={[styles.emptyMessage, { color: theme.text }]}>
            {t("noSavedArticlesDescription")}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyContainer: {
    maxWidth: 360,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
