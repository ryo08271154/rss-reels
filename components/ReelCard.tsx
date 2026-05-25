import { ThemeContext } from "@/context/ThemeContext";
import { Article } from "@/types/article";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { openBrowserAsync } from "expo-web-browser";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    padding: 24,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  source: { fontSize: 14, marginBottom: 8 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 12 },
  description: { fontSize: 20 },
  summary: { fontSize: 18 },
});

type Props = {
  article: Article;
  height: number;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};
export default function ReelCard({
  article,
  height,
  modalVisible,
  setModalVisible,
}: Props) {
  const c = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => openBrowserAsync(article.url)}
      onLongPress={() => setModalVisible(true)}
    >
      <View style={[{ height }]}>
        <ImageBackground
          source={article.imageUrl}
          style={[styles.card, { height }]}
          contentFit="cover"
          cachePolicy="memory-disk"
        >
          <LinearGradient
            colors={c.gradientColors}
            locations={[0.4, 1]}
            style={styles.gradient}
          />

          <Text style={[styles.source, { color: c.source }]}>
            {article.source}
            {article.pubDate
              ? ` · ${new Date(article.pubDate).toLocaleString()}`
              : ""}
          </Text>
          <Text style={[styles.title, { color: c.text }]}>{article.title}</Text>
          <Text style={[styles.summary, { color: c.text }]}>
            {article.summary}
          </Text>
          <Text style={[styles.description, { color: c.text }]}>
            {article.description}
          </Text>
        </ImageBackground>
      </View>
    </Pressable>
  );
}
