import { VStack, Image, Text, Box, FormControl, Input, Button, Link, View} from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import Logo from './assets/face_id.png';
import { Titulo } from "./componentes/Titulo";
import EntradaTexto from "./componentes/EntradaTexto";
import { Botao } from "./componentes/Botao";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";



export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !usuario || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!email.includes('@')) { 
      alert('Por favor, insira um endereço de email válido.');
      return;
    }

    try {
      const usuariosCadastrados = await AsyncStorage.getItem('usuarios');
      if (usuariosCadastrados) {
        const listaUsuarios = JSON.parse(usuariosCadastrados);
        const usuarioExistente = listaUsuarios.find(
          (user) => user.email === email || user.usuario === usuario
        );

        if (usuarioExistente) {
          alert('Já existe um usuário cadastrado com este email ou usuário.');
          return;
        }
      }

      const novoUsuario = { nome, email, usuario, senha };
      let listaUsuarios = usuariosCadastrados ? JSON.parse(usuariosCadastrados) : [];
      listaUsuarios.push(novoUsuario);
      await AsyncStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

      alert('Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      alert('Ocorreu um erro durante o cadastro. Tente novamente mais tarde.');
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
            <Image source={Logo} alt="Logo Camera" marginBottom={70} />

            <Titulo color="blue.500" fontSize="2xl">
              Bem Vindo a IA Facial
            </Titulo>

            <Text
              fontSize="lg"
              marginBottom={8}
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
              mt={2}
            >
              Por favor, inscreva-se para continuar
            </Text>

    <EntradaTexto  label="E-mail" 
          placeholder="exemplo@gmail.com" 
          onChangeText={setEmail} // Adicione onChangeText para o email
          value={email}           // Adicione o valor do estado aqui
          isPassword={false} />

            <Botao mt={10} mb={8} children={"Criar Cadastro"} onPress={handleCadastro} style={{ width: '85%', paddingVertical: 10 }} />

    <EntradaTexto label="Senha" 
          placeholder="A senha deve conter mais de 6 caracteres" 
          onChangeText={setSenha} // Adicione onChangeText para a senha
          value={senha}           // Adicione o valor do estado aqui
          isPassword={true}  />
            <Botao mt={-2} mb={1} children={"Cancelar"} onPress={() => navigation.navigate('Login')} style={{ width: '85%', paddingVertical: 10 }} />
          </Box>
        ) : (
          <>
            <Image source={Logo} alt="Logo Camera" marginTop={1} />

            <Titulo color="blue.500" fontSize="2xl">
              Bem Vindo a IA Facial
            </Titulo>

            <Text
              fontSize="15"
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
              mt={2}
            >
              Por favor, inscreva-se para continuar
            </Text>

            <Box w="100%" px={5}>
              <EntradaTexto
                label="Nome"
                placeholder="Insira seu nome"
                value={nome}
                onChangeText={setNome}
                isPassword={false}
              />
              <EntradaTexto
                label="E-mail"
                placeholder="Insira seu email"
                value={email}
                onChangeText={setEmail}
                isPassword={false}
              />
              <EntradaTexto
                label="Usuário"
                placeholder="Insira seu usuário"
                value={usuario}
                onChangeText={setUsuario}
                isPassword={false}
              />
              <EntradaTexto
                label="Senha"
                placeholder="Mínimo de caracteres: 6"
                value={senha}
                onChangeText={setSenha}
                isPassword={true}
              />
            </Box>

            <Botao mt={5}  children={"Criar Cadastro"} onPress={handleCadastro} style={{ width: '85%', paddingVertical: 10 }} />

            <Botao mt={-3} mb={1} children={"Cancelar"} onPress={() => navigation.navigate('Login')} style={{ width: '85%', paddingVertical: 10 }} />
          </>
        )}
      </VStack>
    </View>
  );
}