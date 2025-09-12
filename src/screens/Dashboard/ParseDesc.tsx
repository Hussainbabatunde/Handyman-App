import { View, Text, Image } from "react-native";

// Utility: split text & image urls
const parseDescription = (text: string) => {
  console.log("parts regex: ", text);
  const regex = /(https?:\/\/\S+\.(?:png|jpe?g|gif|webp))/gi;
  const parts = text?.split(regex);


  return parts.map((part, index) => {
    if (regex.test(part)) {
      return { type: "image", content: part, key: index.toString() };
    } else {
      return { type: "text", content: part.trim(), key: index.toString() };
    }
  });
};

export default function DescriptionRenderer({ description }: { description: string }) {

  const parsedContent = parseDescription(description);
  // console.log("description: ", parsedContent);

  return (
    <View style={{ flex: 1 }}>
      {parsedContent.map((item) =>
        item.type === "image" ? (

          <Image key={item?.key} source={{ uri: item?.content ? item?.content : "https://runnershive.s3.eu-west-1.amazonaws.com/Portrait_Placeholder-lnhuBpImRh.png" }} style={{ width: "100%", height: 200, marginVertical: 10 }} resizeMode="cover" />
        ) : (
          <Text key={item.key} style={{ fontSize: 16, lineHeight: 24, marginBottom: 8 }}>
            {item.content}
          </Text>
        )
      )}
    </View>
  );
}
