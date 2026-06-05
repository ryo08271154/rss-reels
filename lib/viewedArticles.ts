import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getViewedArticleIds(): Promise<string[]> {
  const data = await AsyncStorage.getItem("viewedArticleIds");
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

export async function addViewedArticleId(id: string) {
  const viewedArticleIds = await getViewedArticleIds();
  if (viewedArticleIds.includes(id)) {
    return;
  }

  viewedArticleIds.push(id);
  await AsyncStorage.setItem(
    "viewedArticleIds",
    JSON.stringify(viewedArticleIds),
  );
}
export async function clearViewedArticleIds() {
  await AsyncStorage.removeItem("viewedArticleIds");
}
