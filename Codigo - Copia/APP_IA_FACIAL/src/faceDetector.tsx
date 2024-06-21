import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Botao } from "./componentes/Botao";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
import { styles } from './estilos/estilo';
import Canvas, { Image as CanvasImage } from 'react-native-canvas'; // Import Canvas

export default function DetectFaces() {
  const [markedPhoto, setMarkedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const photoUri = route.params?.photoUri;
  const isFrontCamera = route.params?.isFrontCamera;
  const zoom = route.params?.zoom || 0;

  useEffect(() => {
    const detectFaces = async () => {
      if (!photoUri) {
        Alert.alert("Erro", "Não foi possível obter a foto.");
        return;
      }

      const options = {
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
      };

      try {
        const { faces } = await FaceDetector.detectFacesAsync(photoUri, options);
        if (faces.length > 0) {
          const markedImage = await markFaces(photoUri, faces);
          setMarkedPhoto(markedImage);
          setOpen(true);
        } else {
          Alert.alert("Detecção de Rosto", "Nenhum rosto detectado na foto.");
        }
      } catch (error) {
        console.error("Erro na detecção de faces:", error);
        Alert.alert("Erro na Detecção de Rostos", error.message);
      }
    };

    detectFaces(); 
  }, [photoUri]);

  const markFaces = async (uri, faces) => {
    let currentUri = uri;
    for (const face of faces) {
      const cropAction = {
        crop: {
          originX: face.bounds.origin.x,
          originY: face.bounds.origin.y,
          width: face.bounds.size.width,
          height: face.bounds.size.height
        }
      };
      // Apply cropping to each detected face
      const manipulated = await ImageManipulator.manipulateAsync(currentUri, [cropAction], { compress: 1, format: ImageManipulator.SaveFormat.PNG });
      currentUri = manipulated.uri;
    }
    return currentUri;
  };

  const savePicture = async () => {
    if (markedPhoto) {
      let imageUri = markedPhoto;
      let actions = [];

      if (isFrontCamera) {
        actions.push({ flip: ImageManipulator.FlipType.Horizontal });
      }
      if (zoom !== 0) {
        const { width, height } = someCalculationBasedOnZoom(zoom, 1080);
        actions.push({ crop: { originX: 0, originY: 0, width, height } });
      }

      const manipulated = await ImageManipulator.manipulateAsync(
        imageUri,
        actions,
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      imageUri = manipulated.uri;

      const asset = await MediaLibrary.createAssetAsync(imageUri);
      await MediaLibrary.createAlbumAsync("Saved Photos", asset, false);
      Alert.alert("Sucesso", "Foto salva com sucesso!");
      navigation.navigate('MinhasCapturas', { newImage: asset });
    }
  };

  function someCalculationBasedOnZoom(zoomLevel, imageSize) {
    const zoomFactor = 1 - zoomLevel;
    const width = imageSize * zoomFactor;
    const height = imageSize * zoomFactor;
    return { width, height };
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" transparent={false} visible={open}>
        <View style={styles.modalContent}>
          <Image
            style={[styles.modalImage,
              isFrontCamera && { transform: [{ scaleX: -1 }],
              zoom: zoom } // Aplica a transformação se a foto veio da câmera frontal
            ]}
            source={{ uri: markedPhoto }}
          />
          <Botao mt={10} mb={1} children="Salvar" onPress={savePicture} />
          <Botao mt={1} mb={1} children="Descartar" onPress={() => navigation.navigate('TelaInicial')} />
          <Botao mt={1} mb={1} children="Visualizar Capturas" onPress={() => navigation.navigate('MinhasCapturas')} />
        </View>
      </Modal>
    </View>
  );
}
