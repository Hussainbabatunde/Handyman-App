import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type StarRatingProps = {
  rating: number; // number of filled stars
  max?: number;   // total stars (default 5)
};

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
      {Array.from({ length: max }).map((_, index) => (
        <AntDesign
          key={index}
          name="star"
          size={14}
          color={index < rating ? "#FFC61C" : "#FFFFFF99"}
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );
}
