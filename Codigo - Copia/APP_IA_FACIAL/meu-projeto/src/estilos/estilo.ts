
import { extendTheme } from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';

export const styles = extendTheme({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 2,
  },
  flashButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 3,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlsTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'transparent',
    padding: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captureButtonContainer: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
 controlsRight: {
    // Contêiner para os botões à direita
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    justifyContent: 'space-around', // Distribui os botões igualmente
  },

  zoomControls: {
    flexDirection: 'column',
    position: 'absolute',
    right: 10, // Ajuste conforme necessário para posicionar os botões
    top: '35%', // Ajusta para centralizar verticalmente na tela
    height: 190, // Ajuste a altura para espaçar adequadamente os botões
    width: 50, // Largura suficiente para acomodar o slider e os botões
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10, // Reduz o padding para menos espaço interno
    alignItems: 'center', // Centraliza horizontalmente os itens dentro do container
    borderRadius: 30, // Arredonda as bordas do container
    },
    zoomButtonPlus: {
        marginBottom: 20, // Espaço entre o botão de zoom mais e o slider
    },
    zoomButtonMinus: {
        marginTop: 40, // Espaço entre o slider e o botão de zoom menos
    },



  //ESTILIZAÇÃO DO MARCADOR VISUAL
  gridContainer: {
    width: '70%', // Define a largura do quadrado
    height: '50%', // Define a altura do quadrado
    flex: 1, 
    position: 'absolute',
    top: '20%', // Posiciona o quadrado no centro
    left: '15%', // Posiciona o quadrado no centro
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  topLeftCorner: {
    top: 95, 
    left: 60, 
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 10,
  },
  topRightCorner: {
    top: 95, 
    right: 60, 
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 10,
  },
  bottomLeftCorner: {
    bottom: 95, 
    left: 60, 
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderWidth: 10,
  },
  bottomRightCorner: {
    bottom: 95, 
    right: 60, 
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderWidth: 10,
  },
  centralRectangle: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    
  },
  gridLineVertical: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 2,
    height: '60%',
    left: '50%', 
  },
  gridLineHorizontal: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '60%',
    height: 2,
    top: '50%', 
  },

  // Modal styles
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalImage: {
    width: '100%',
    height: 500,
    borderRadius: 20,
  },
  savePicture: {
    margin: 10,
    marginTop: 20
  },
  closeModal: {
    margin: 10,
    marginTop: 20
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20, // Ajuste o espaçamento conforme necessário
  },

  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%', // Ocupa toda a largura do modalView
    borderRadius: 5,
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  faceDetected: {
    color: 'green',
    fontSize: 18,
    marginTop: 20,
  },
  noFaces: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
},
  
});

export default styles;