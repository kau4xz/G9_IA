
import { NativeBaseProvider, StatusBar } from 'native-base'
import { Camera } from 'expo-camera';

import { TEMAS } from './src/estilos/temas';
import Rotas from './src/rotas';



export default function App() {
  return (
    <NativeBaseProvider theme={TEMAS}>
        <StatusBar  backgroundColor={TEMAS.colors.blue["500"]} />
        <Rotas></Rotas>
    </NativeBaseProvider>
  );
}

