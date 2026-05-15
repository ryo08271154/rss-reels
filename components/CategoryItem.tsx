import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  category: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryItem({ category, selected, onPress }: Props) {
  const c = useContext(ThemeContext);
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.category,
        { backgroundColor: c.background },
        selected ? styles.selected : null,
      ]}
    >
      <Text style={[styles.text, { color: c.title }]}>{category}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  category: {
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
  },
  selected: {
    backgroundColor: "#ADD8E6",
  },
  text: {
    fontSize: 10,
  },
});
