import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  /* #### COMEÇO FOTO */
  /* State tradicional para armazenar a referência da foto (quando existir) */
  const [foto, setFoto] = useState(null);

  /* State de checagem de permissões de uso (através do hook useCameraPermission) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  //console.log(status);

  /* Ao entrar no app, será executada a verificação de permissões de uso  */
  useEffect(() => {
    /* Esta função mostrará um popup para o usuário perguntando
      se ele autoriza a utilização do recurso móvel (no caso, selecionar/tirar foto). */
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      /* Ele dando autorização (granted), isso será armazenado
        no state de requestPermission. */
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  const acessarCamera = async () => {
    /* Ao executar esta função quando o usuário escolhe tirar uma foto, utilizamos o launchCameraAsync para abrir a câmera do sistema operacional */
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5 /* Qualidade pela metade */,
    });

    //console.log(imagem);

    /* Se o usuário não cancelar, atualizamos o state com novo foto capturada */
    if (!imagem.canceled) {
      /* Usando a API do MediaLibrary para salvar no armazenamento físico do dispositivo */
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };
  //console.log(foto);

  /* #### FIM FOTO */

  /* #### COMEÇO LOCALIZAÇÃO */

  /* State para monitorar dados da atualização atual do usuario. 
  Inicialmente, nulo. */
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      /* Acessando o status da requisição de permissão de uso dos recursos de geolocalização */
      const { status } = await Location.requestForegroundPermissionsAsync();

      /* Se o status NÃO FOR liberado/permitido, então será dado um alerta notificando o usuário */
      if (status !== "granted") {
        Alert.alert("Ops!", "Você não autorizou o uso de geolocalização");
        return;
      }

      /* Se o status estiver OK, obtemos os dados da localização atual. E atualizamos o state de minhaLocalizacao  */
      let localizacaoAtaul = await Location.getCurrentPositionAsync({});

      setMinhaLocalizacao(localizacaoAtaul);
    }
    obterLocalizacao();
  }, []);

  //console.log(minhaLocalizacao);

  const [localizacao, setLocalizacao] = useState(null);

  /* Coordenadas para o MapView */
  const regiaoInicialMapa = {
    latitude: -23.533773,
    longitude: -46.65529,

    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  const marcaLocal = () => {
    setLocalizacao({
      latitude: minhaLocalizacao.coords.latitude,
      longitude: minhaLocalizacao.coords.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.01,
    });
  };

  /* #### FIM LOCALIZAÇÃO */

  return (
    <>
      <StatusBar />
      {/* FOTO */}
      <View style={estilos.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Text style={estilos.titulo}>Título da Foto/local</Text> */}

          <TextInput
            style={estilos.campo}
            placeholder="Digite o Título da Foto/local"
            placeholderTextColor="#999999"
            axLength={40}
            autoFocus
            enterKeyHint="search"
            textColor="#001a3a"
          />

          <View style={estilos.imagemContainer}>
            {foto ? (
              <Image source={{ uri: foto }} style={estilos.imagem} />
            ) : (
              <View style={estilos.caixaSubtitulo}>
                <Text style={estilos.subtitulo}>
                  Você ainda não tirou uma foto{" "}
                </Text>
              </View>
            )}
          </View>

          <Button
            style={estilos.botao}
            onPress={acessarCamera}
            title="Tirar foto"
            color="#f3b453"
          />

          {/* LOCALIZAÇÃO */}
          {/* O LOCALIZAÇÃO, só vai aparecer ser a "foto" for verdadeira/tirada. */}

          {foto && (
            <>
              <View style={estilos.imagemContainer}>
                <MapView
                  style={estilos.mapa}
                  initialRegion={regiaoInicialMapa}
                  mapType="standard"
                  region={localizacao ?? regiaoInicialMapa}
                >
                  {localizacao && <Marker coordinate={localizacao} />}
                </MapView>
              </View>
              <Button
                style={estilos.botao}
                onPress={marcaLocal}
                title="Localizar no mapa"
                color="#f3b453"
              />
            </>
          )}
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
    color: "#001a3a",
  },
  imagemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  imagem: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderColor: "#f3b453",
    marginTop: 15,
  },

  caixaSubtitulo: {
    borderWidth: 5,
    borderColor: "#f3b453",
    marginTop: 15,
    fontSize: 16,
    width: 300,
    height: 300,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  subtitulo: {
    color: "#e4541f",
    fontWeight: "bold",
    padding: 5,
  },

  mapa: {
    marginTop: 15,
    borderWidth: 5,
    borderColor: "#f3b453",
    width: 300,
    height: 300,
  },

  campo: {
    marginVertical: 5,
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderColor: "#f3b453",
    alignItems: "center",
    fontSize: 20,
    marginVertical: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  // botao: {
  //   padding: 10,
  //   borderRadius: 5,
  // },
});
