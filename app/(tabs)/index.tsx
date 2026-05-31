import CategoryPicker from "@/components/CategoryPicker";
import ReelCard from "@/components/ReelCard";
import { SettingsContext } from "@/context/SettingsContext";
import { getRssArticles } from "@/lib/rss";
import { Article } from "@/types/article";
import { Stack, Tabs, useNavigation, useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  Switch,
  Text,
  View,
} from "react-native";
const appIcon = require("@/assets/images/icon.png");

export default function HomeScreen() {
  const [height, setHeight] = useState(0);
  const { t } = useTranslation();

  const indexRef = useRef(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");

  const [refreshing, setRefreshing] = useState(false);
  const { settings, setSettings, saveSettings, resetSettings } =
    useContext(SettingsContext);

  const router = useRouter();
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);

  const updateArticles = useCallback(
    async (useCache: boolean = true, category?: string): Promise<Article[]> => {
      const hintArticles: Article[] = [
        {
          id: "1",
          title: t("hint1Title"),
          description: t("hint1Description"),
          imageUrl: appIcon,
          url: "https://github.com/ryo08271154/rss-reels",
          pubDate: "2026-05-10 15:30:00",
          summary: t("hint1Summary"),
          source: t("hintSource"),
        },
        {
          id: "2",
          title: t("hint2Title"),
          description: t("hint2Description"),
          imageUrl: appIcon,
          url: "https://github.com/ryo08271154/rss-reels",
          pubDate: "2026-05-10 15:30:00",
          summary: t("hint2Summary"),
          source: t("hintSource"),
        },
        {
          id: "3",
          title: t("hint3Title"),
          description: t("hint3Description"),
          imageUrl: appIcon,
          url: "https://github.com/ryo08271154/rss-reels",
          pubDate: "2026-05-10 15:30:00",
          summary: t("hint3Summary"),
          source: t("hintSource"),
        },
      ];

      const articlesData = await getRssArticles(
        useCache,
        settings,
        category === "All" || category === "すべて" ? undefined : category,
      );
      setArticles(articlesData);

      // 一番上にスクロール
      try {
        flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
      } catch (e) {
        console.log(e);
      }

      if (articlesData.length === 0) {
        setArticles(hintArticles);
      }
      return articlesData;
    },
    [settings, t],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await updateArticles(false);

    setRefreshing(false);
  }, [updateArticles]);

  // 初回読み込み
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onRefresh();
  }, [onRefresh]);

  // ホームタブで再読み込み
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e: any) => {
      if (navigation.isFocused()) {
        onRefresh();
      }
    });
    return unsubscribe;
  }, [navigation, settings, onRefresh]);

  // カテゴリー変更で記事を更新
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateArticles(true, selectedCategory);
  }, [selectedCategory, updateArticles]);

  // 自動スクロール
  useEffect(() => {
    if (!autoScroll) return;

    Alert.alert(t("autoScroll"), t("autoScrollHint"));
    const interval = setInterval(() => {
      if (indexRef.current < articles.length - 1) {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: indexRef.current + 1,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [t, autoScroll, articles.length]);

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      {autoScroll ? (
        <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      ) : (
        <Tabs.Screen options={{ tabBarStyle: { display: "flex" } }} />
      )}

      <Stack.Screen options={{ headerShown: false }} />

      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <CategoryPicker
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={height}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        snapToAlignment="start"
        disableIntervalMomentum
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <ReelCard
            article={item}
            height={height}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={flatListRef}
        onMomentumScrollEnd={(e) => {
          // スクロール位置から現在のインデックスを計算
          indexRef.current =
            height > 0 ? Math.round(e.nativeEvent.contentOffset.y / height) : 0;
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 24,
              marginBottom: 50,
              borderRadius: 10,
            }}
          >
            <Text>{t("autoScroll")}</Text>
            <Switch value={autoScroll} onValueChange={setAutoScroll} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
