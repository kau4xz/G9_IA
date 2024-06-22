import { VStack, Image, Text, Box, View } from "native-base"; // Importa componentes da biblioteca NativeBase
import { TouchableOpacity, Platform } from "react-native"; // Importa componentes do React Native
import Logo from './assets/face_id.png'; // Importa a imagem do logo
import { Titulo } from "./componentes/Titulo"; // Importa o componente de título
import EntradaTexto from "./componentes/EntradaTexto"; // Importa o componente de entrada de texto
import { Botao } from "./componentes/Botao"; // Importa o componente de botão
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa a biblioteca para armazenamento local
import { useNavigation } from '@react-navigation/native'; // Importa a função para navegação entre telas
import React, { useState } from "react"; // Importa a função para gerenciar estados

export default function Login({ navigation }) { 
  // Define estados para armazenar o email/usuário e a senha
  const [emailOuUsuario, setEmailOuUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => { 
    // Função para lidar com o evento de login
    if (!emailOuUsuario || !senha) {
      // Verifica se todos os campos foram preenchidos
      alert('Por favor, preencha todos os campos!');
      return; 
    }

    try {
      // Tenta recuperar os usuários cadastrados do armazenamento local
      const usuariosCadastrados = await AsyncStorage.getItem('usuarios');

      if (usuariosCadastrados) {
        // Se usuários cadastrados forem encontrados, parseia a lista
        const listaUsuarios = JSON.parse(usuariosCadastrados);
        // Procura o usuário na lista
        const usuario = listaUsuarios.find(
          (user) => user.email === emailOuUsuario || user.usuario === emailOuUsuario
        );

        if (usuario && usuario.senha === senha) {
          // Se o usuário for encontrado e a senha estiver correta, exibe mensagem de sucesso e navega para a tela inicial
          alert('Login realizado com sucesso!');
          navigation.navigate('TelaInicial'); 
        } else {
          // Se as credenciais estiverem inválidas, exibe um alerta
          alert('Credenciais inválidas!');
        }
      } else {
        // Se não houver usuários cadastrados, exibe um alerta para o usuário criar uma conta
        alert('Nenhum usuário cadastrado. Crie uma conta.');
      }
    } catch (error) {
      // Trata erros durante o login
      console.error('Erro durante o login:', error);
      alert('Ocorreu um erro durante o login. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Platform.OS === 'web' ? '#E6F0FA' : 'white' }}>
      {/* Define o estilo da tela de login */}
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        p={5}
        space={4}
        style={{ minHeight: Platform.OS === 'web' ? '100vh' : '100%' }}
      >
        {/* Renderiza o conteúdo da tela de login de acordo com a plataforma */}
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
            {/* Exibe o logo da aplicação */}

            <Titulo color="blue.500">Seja Bem-vindo</Titulo> 
            {/* Exibe o título da tela de login */}

            <Text
              fontSize="md"
              marginBottom={8}
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
            >
              Efetue seu login
            </Text> 
            {/* Exibe a mensagem de instrução para o usuário */}

            <Box w="100%">
              <EntradaTexto
                label="E-mail ou usuário" 
                placeholder="Insira seu email ou usuário" 
                onChangeText={setEmailOuUsuario} // Define a função que lida com a mudança de texto no campo de email ou usuário
                value={emailOuUsuario} 
              />
              {/* Componente de entrada de texto para email ou usuário */}
              <EntradaTexto
                label="Senha" 
                placeholder="Insira sua senha" 
                onChangeText={setSenha} // Define a função que lida com a mudança de texto no campo de senha
                value={senha} 
                isPassword={true} 
              />
              {/* Componente de entrada de texto para a senha */}
            </Box>

            <Botao
              children={"Acessar"}
              onPress={handleLogin} 
              style={{ width: '100%', paddingVertical: 10,}} 

            />

            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}> 
              {/* Componente para navegar para a tela de recuperação de senha */}
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
              {/* Define a estrutura para a mensagem "Não tem cadastro?" */}
              <Text fontSize='md'> Não tem cadastro? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                {/* Componente para navegar para a tela de cadastro */}
                <Text fontSize="md" color="blue.500">
                  Inscreva-se!
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        ) : (
          <>
            <Image source={Logo} alt="Logo Camera" marginBottom={10} /> 
            {/* Exibe o logo da aplicação */}

            <Titulo color="blue.500">Seja Bem-vindo</Titulo> 
            {/* Exibe o título da tela de login */}

            <Text
              fontSize="md"
              marginBottom={8}
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
            >
              Efetue seu login
            </Text> 
            {/* Exibe a mensagem de instrução para o usuário */}

            <Box w="100%" px={5}> 
              {/* Define o estilo da caixa de entrada de dados */}
              <EntradaTexto
                label="E-mail ou usuário" 
                placeholder="Insira seu email ou usuário" 
                onChangeText={setEmailOuUsuario} // Define a função que lida com a mudança de texto no campo de email ou usuário
                value={emailOuUsuario} 
                isPassword={false} 
              />
              {/* Componente de entrada de texto para email ou usuário */}
              <EntradaTexto
                label="Senha" 
                placeholder="Insira sua senha" 
                onChangeText={setSenha} // Define a função que lida com a mudança de texto no campo de senha
                value={senha} 
                isPassword={true} 
              />
              {/* Componente de entrada de texto para a senha */}
            </Box>

            <Botao
              children={"Acessar"}
              onPress={handleLogin} 
              style={{ width: '80%', paddingVertical: 10 }} 
              mt={1} 
              
            />

            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}> 
              {/* Componente para navegar para a tela de recuperação de senha */}
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
                {/* Componente para navegar para a tela de cadastro */}
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