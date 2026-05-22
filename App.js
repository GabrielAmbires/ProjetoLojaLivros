import "./firebase";
import { useFonts } from "expo-font";
import TelaLogin from "./telas/TelaLogin";

export default function App() {
  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Italic": require("./fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <TelaLogin />;
}