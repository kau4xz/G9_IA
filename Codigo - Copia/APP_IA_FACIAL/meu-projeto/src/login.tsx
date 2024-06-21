import { VStack, Image, Text, Box, View } from "native-base";
import { TouchableOpacity, Platform } from "react-native";
import Logo from './assets/face_id.png';
import { Titulo } from "./componentes/Titulo";
import EntradaTexto from "./componentes/EntradaTexto";
import { Botao } from "./componentes/Botao";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";

export default function Login({ navigation }) {
  const [emailOuUsuario, setEmailOuUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!emailOuUsuario || !senha) {
      alert('Por favor, preencha todos os campos!');
      return; 
    }

    try {
      const usuariosCadastrados = await AsyncStorage.getItem('usuarios');

      if (usuariosCadastrados) {
        const listaUsuarios = JSON.parse(usuariosCadastrados);
        const usuario = listaUsuarios.find(
          (user) => user.email === emailOuUsuario || user.usuario === emailOuUsuario
        );

        if (usuario && usuario.senha === senha) {
          alert('Login realizado com sucesso!');
          navigation.navigate('TelaInicial'); 
        } else {
          alert('Credenciais inválidas!');
        }
      } else {
        alert('Nenhum usuário cadastrado. Crie uma conta.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      alert('Ocorreu um erro durante o login. Tente novamente mais tarde.');
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
            p={10}
            borderRadius="md"
            shadow={2}
            width="90%"
            maxWidth="500px"
            alignItems="center"
          >
            <Image source={Logo} alt="Logo Camera" marginBottom={10} />

            <Titulo color="blue.500">Seja Bem-vindo</Titulo>

            <Text
              fontSize="md"
              marginBottom={8}
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
            >
              Efetue seu login
            </Text>

            <Box w="100%">
              <EntradaTexto
                label="E-mail ou usuário" 
                placeholder="Insira seu email ou usuário" 
                onChangeText={setEmailOuUsuario} 
                value={emailOuUsuario} 
              />
              <EntradaTexto
                label="Senha" 
                placeholder="Insira sua senha" 
                onChangeText={setSenha} 
                value={senha} 
                isPassword={true} 
              />
            </Box>

            <Botao
              children={"Acessar"}
              onPress={handleLogin}
              style={{ width: '100%', paddingVertical: 10,}}

            />

            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
              <Text fontSize="md" color="blue.500" mt={4}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            <Box
              w="100%"
              mt={8}
              flexDirection="row"
              justifyContent="center"
            >
              <Text fontSize='md'> Não tem cadastro? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text fontSize="md" color="blue.500">
                  Inscreva-se!
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        ) : (
          <>
            <Image source={Logo} alt="Logo Camera" marginBottom={10} />

            <Titulo color="blue.500">Seja Bem-vindo</Titulo>

            <Text
              fontSize="md"
              marginBottom={8}
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
            >
              Efetue seu login
            </Text>

            <Box w="100%" px={5}>
              <EntradaTexto
                label="E-mail ou usuário" 
                placeholder="Insira seu email ou usuário" 
                onChangeText={setEmailOuUsuario} 
                value={emailOuUsuario} 
              />
              <EntradaTexto
                label="Senha" 
                placeholder="Insira sua senha" 
                onChangeText={setSenha} 
                value={senha} 
                isPassword={true} 
              />
            </Box>

            <Botao
              children={"Acessar"}
              onPress={handleLogin}
              style={{ width: '80%', paddingVertical: 10 }}
              mt={1}
            />

            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
              <Text fontSize="18" color="blue.500" mt={2}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            <Box
              w="100%"
              mt={3}
              flexDirection="row"
              justifyContent="center"
            >
              <Text fontSize='18'> Não tem cadastro? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text fontSize="18" color="blue.500">
                  Inscreva-se!
                </Text>
              </TouchableOpacity>
            </Box>
          </>
        )}
      </VStack>
    </View>
  );
}