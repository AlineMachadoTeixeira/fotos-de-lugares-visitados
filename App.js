import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <Button title="Escolher foto" />
        <Button title="Tirar uma nova foto" />
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
