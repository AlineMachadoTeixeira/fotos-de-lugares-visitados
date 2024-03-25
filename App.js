import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={estilos.titulo}>Título da Foto/local</Text>
          <View style={estilos.imagemContainer}>
            <Image
              source={require("./assets/senac.jpg")}
              style={estilos.imagem}
            />
          </View>

          <Button style={estilos.botao} title="Tirar  foto" color="#f3b453" />
        </ScrollView>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
    backgroundColor: "#ffe5c5",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#4c3a20",
  },
  imagemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagem: {
    width: 300,
    height: 250,
    borderWidth: 5,
    borderColor: "#f3b453",
  },
  botao: {
    padding: 10,
    borderRadius: 5,
  },
});
