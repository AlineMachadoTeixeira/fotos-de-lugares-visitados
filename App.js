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
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Título da Foto/local</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require("./assets/senac.jpg")}
              style={styles.image}
            />
          </View>

          <Button style={styles.button} title="Tirar  foto" />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 250,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
