import { Text } from "react-native";
import { TextRegular } from "../component/StyledText";

export const splitIntoParagraphs = (text: string) => {
  return text
    .split(".")                  // split by full stop
    .map((s) => s.trim())        // remove extra spaces
    .filter(Boolean)             // remove empty strings
    .map((sentence, index) => (
      <TextRegular
        key={index}
        style={{ marginBottom: 10, fontSize: 14, lineHeight: 20 }}
      >
        {sentence}.
      </TextRegular>
    ));
};