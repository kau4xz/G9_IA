import React, { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { VStack, Box, Image, Text } from 'native-base';
import Logo from './assets/face_id.png';
import { Titulo } from "./componentes/Titulo";
import EntradaTexto from "./componentes/EntradaTexto";
import { Botao } from "./componentes/Botao";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecuperarSenha({ navigation }) {
  const [emailOuUsuario, setEmailOuUsuario] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const handleRecuperarSenha = async () => {
    if (!emailOuUsuario || !novaSenha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    if (novaSenha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const usuariosCadastrados = await AsyncStorage.getItem('usuarios');
      if (usuariosCadastrados) {
        const listaUsuarios = JSON.parse(usuariosCadastrados);
        const usuarioIndex = listaUsuarios.findIndex(
          (user) => user.email === emailOuUsuario || user.usuario === emailOuUsuario
        );

        if (usuarioIndex !== -1) {
          listaUsuarios[usuarioIndex].senha = novaSenha;
          await AsyncStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
          alert('Senha alterada com sucesso!');
          navigation.navigate('Login');
        } else {
          alert('Email ou usuário não encontrado!');
        }
      } else {
        alert('Nenhum usuário encontrado.');
      }
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      alert('Ocorreu um erro ao recuperar a senha. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Platform.OS === 'web' ? '#E6F0FA' : 'white' }}>
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        p={5}
        space={4}
        style={{ minHeight: Platform.OS === 'web' ? '100vh' : '100%' }}
      >
        {Platform.OS === 'web' ? (
          <Box
            bg="white"
            p={12}
            borderRadius="md"
            shadow={2}
            width="100%"
            maxWidth="600px"
            alignItems="center"
            justifyContent="center"
          >
            <Image source={Logo} alt="Logo Camera" marginBottom={5} />

            <Titulo color="blue.500" fontSize="2xl">
              Recuperação de Senha
            </Titulo>

            <Text
              fontSize="lg"
              marginBottom={8}
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
              mt={2}
            >
              Para redefinição de senha digite seu email ou usuário e uma nova senha
            </Text>

            <Box w="100%">
              <EntradaTexto
                label="E-mail ou Usuário"
                placeholder="Insira seu email ou usuário"
                onChangeText={setEmailOuUsuario}
                value={emailOuUsuario}
              />
              <EntradaTexto
                label="Nova Senha"
                placeholder="Insira sua nova senha"
                onChangeText={setNovaSenha}
                value={novaSenha}
                isPassword={true}
              />
            </Box>

            <Botao mt={10} mb={8} children={"Enviar"} onPress={handleRecuperarSenha} style={{ width: '85%', paddingVertical: 10 }} />
            <Botao mt={-2} mb={1} children={"Cancelar"} onPress={() => navigation.navigate('Login')} style={{ width: '85%', paddingVertical: 10 }} />
          </Box>
        ) : (
          <>
            <Image source={Logo} alt="Logo Camera" marginTop={1}  />

            <Titulo color="blue.500" fontSize="2xl">
              Recuperação de Senha
            </Titulo>

            <Text
              fontSize="16"
              marginBottom={8}
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
              mt={2}
            >
              Para redefinição de senha digite seu email ou usuário e uma nova senha
            </Text>

            <Box w="100%" px={5}>
              <EntradaTexto
                label="E-mail ou Usuário"
                placeholder="Insira seu email ou usuário"
                onChangeText={setEmailOuUsuario}
                value={emailOuUsuario}
              />
              <EntradaTexto
                label="Nova Senha"
                placeholder="Insira sua nova senha"
                onChangeText={setNovaSenha}
                value={novaSenha}
                isPassword={true}
              />
            </Box>

            <Botao mt={5} children={"Enviar"} onPress={handleRecuperarSenha} style={{ width: '85%', paddingVertical: 10 }} />
            <Botao mt={-3} mb={1} children={"Cancelar"} onPress={() => navigation.navigate('Login')} style={{ width: '85%', paddingVertical: 10 }} />
          </>
        )}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  webBackground: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  mobileBackground: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});