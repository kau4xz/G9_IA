import { VStack, Image, Text, Box, FormControl, Input, Button, Link, HStack} from "native-base"
import { Platform, TouchableOpacity, View}  from 'react-native'
import Rosto from './assets/Rosto.png'
import { Titulo } from "./componentes/Titulo"
import EntradaTexto  from "./componentes/EntradaTexto";
import  { Botao } from "./componentes/Botao";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaInicial({ navigation }) {
    
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const usuario = await AsyncStorage.getItem('usuario');
        if (usuario) {
          setAutenticado(true);
        } else {
          navigation.navigate('Login'); 
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    verificarAutenticacao();
  }, []); 

  return (
    <View style={{ flex: 1 }}>  
      <VStack flex={1} justifyContent="space-around" alignItems="center" p={5} bg="white"> 
          <Box mb={5} w="100%" alignItems="center">
            <Image source={Rosto} alt="Logo Camera" marginTop={70} />
            
            <Titulo color="blue.500">
                IA FACIAL
            </Titulo>

            
          </Box>
          

        <Text 
          textAlign="center" 
          color="gray.600" 
          fontSize="md"
        >
          Realize uma captura de imagem e experimente o modelo de detecção facial Expo Face Detector
        </Text>

        <HStack w="100%" justifyContent="space-around" alignItems="center" mb={50}> 
         
          <Box mb={100}>

          <Botao 
            onPress={() => navigation.navigate('CameraTela')} 
            mb={-5}
            children={"Realizar Captura"} 
            style={{ width: '100%', paddingVertical: 10}} 
          />

          <Botao 
            onPress={() => navigation.navigate('MinhasCapturas')} 
            children={"Visualizar Capturas"} 
            style={{ width: '100%', paddingVertical: 10 }} 
          /> 

          </Box>

        </HStack>
      </VStack>
    </View>
  );
}