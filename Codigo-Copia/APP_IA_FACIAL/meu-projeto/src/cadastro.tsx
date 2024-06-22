import { VStack, Image, Text, Box, FormControl, Input, Button, Link, View } from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import Logo from './assets/face_id.png'; // Importa a imagem do logo
import { Titulo } from "./componentes/Titulo"; // Importa o componente de título
import EntradaTexto from "./componentes/EntradaTexto"; // Importa o componente de entrada de texto
import { Botao } from "./componentes/Botao"; // Importa o componente de botão
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa a biblioteca para armazenamento local
import { useNavigation } from '@react-navigation/native'; // Importa a função para navegar entre telas
import { useState } from "react"; // Importa a função para gerenciar estados

export default function Cadastro({ navigation }) {
  // Define estados para armazenar os dados do usuário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => { 
    // Função para lidar com o evento de cadastro
    if (!nome || !email || !usuario || !senha) {
      // Verifica se todos os campos foram preenchidos
      alert('Por favor, preencha todos os campos!');
      return;
    }

    if (senha.length < 6) { 
      // Verifica se a senha tem pelo menos 6 caracteres
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!email.includes('@')) { 
      // Verifica se o email é válido
      alert('Por favor, insira um endereço de email válido.');
      return;
    }

    try {
      // Tenta recuperar os usuários cadastrados do armazenamento local
      const usuariosCadastrados = await AsyncStorage.getItem('usuarios');
      if (usuariosCadastrados) {
        // Se usuários cadastrados forem encontrados, parseia a lista
        const listaUsuarios = JSON.parse(usuariosCadastrados);
        const usuarioExistente = listaUsuarios.find(
          (user) => user.email === email || user.usuario === usuario 
        );

        // Verifica se o usuário já existe
        if (usuarioExistente) {
          alert('Já existe um usuário cadastrado com este email ou usuário.');
          return;
        }
      }

      // Cria um novo objeto de usuário com os dados fornecidos
      const novoUsuario = { nome, email, usuario, senha };
      // Cria ou recupera a lista de usuários
      let listaUsuarios = usuariosCadastrados ? JSON.parse(usuariosCadastrados) : [];
      // Adiciona o novo usuário à lista
      listaUsuarios.push(novoUsuario);
      // Salva a lista de usuários atualizada no armazenamento local
      await AsyncStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

      // Exibe mensagem de sucesso e redireciona para a tela de login
      alert('Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      // Trata erros durante o cadastro
      console.error('Erro durante o cadastro:', error);
      alert('Ocorreu um erro durante o cadastro. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Platform.OS === 'web' ? '#E6F0FA' : 'white' }}> 
      {/* Define o estilo da tela */}
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        p={5}
        space={4}
        style={{ minHeight: Platform.OS === 'web' ? '100vh' : '100%' }}
      >
        {/* Renderiza o conteúdo da tela de acordo com a plataforma */}
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
            {/* Exibe o logo da aplicação */}

            <Titulo color="blue.500" fontSize="2xl">
              Bem Vindo a IA Facial
            </Titulo> 
            {/* Exibe o título da tela */}

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
            {/* Exibe a mensagem de instrução para o usuário */}

            <EntradaTexto  label="E-mail" 
              placeholder="exemplo@gmail.com" 
              onChangeText={setEmail} // Define a função que lida com a mudança de texto no campo de email
              value={email}           // Define o valor do estado para o campo de email
              isPassword={false} /> 
            {/* Componente de entrada de texto para o email */}

            <Botao mt={10} mb={8} children={"Criar Cadastro"} onPress={handleCadastro} style={{ width: '85%', paddingVertical: 10 }} /> 
            {/* Componente de botão para realizar o cadastro */}

            <EntradaTexto label="Senha" 
              placeholder="A senha deve conter mais de 6 caracteres" 
              onChangeText={setSenha} // Define a função que lida com a mudança de texto no campo de senha
              value={senha}           // Define o valor do estado para o campo de senha
              isPassword={true}  /> 
            {/* Componente de entrada de texto para a senha */}

            <Botao mt={-2} mb={1} children={"Cancelar"} onPress={() => navigation.navigate('Login')} style={{ width: '85%', paddingVertical: 10 }} />
            {/* Componente de botão para cancelar o cadastro */}
          </Box>
        ) : (
          <>
            <Image source={Logo} alt="Logo Camera" marginTop={1} /> 
            {/* Exibe o logo da aplicação */}

            <Titulo color="blue.500" fontSize="2xl">
              Bem Vindo a IA Facial
            </Titulo> 
            {/* Exibe o título da tela */}

            <Text
              fontSize="15"
              fontWeight="normal"
              color="gray.800"
              textAlign="center"
              mt={2}
            >
              Por favor, inscreva-se para continuar
            </Text> 
            {/* Exibe a mensagem de instrução para o usuário */}

            <Box w="100%" px={5}> 
              {/* Define o estilo da caixa de entrada de dados */}
              <EntradaTexto
                label="Nome"
                placeholder="Insira seu nome"
                value={nome}
                onChangeText={setNome} // Define a função que lida com a mudança de texto no campo de nome
                isPassword={false}
              /> 
              {/* Componente de entrada de texto para o nome */}
              <EntradaTexto
                label="E-mail"
                placeholder="Insira seu email"
                value={email}
                onChangeText={setEmail} // Define a função que lida com a mudança de texto no campo de email
                isPassword={false}
              /> 
              {/* Componente de entrada de texto para o email */}
              <EntradaTexto
                label="Usuário"
                placeholder="Insira seu usuário"
                value={usuario}
                onChangeText={setUsuario} // Define a função que lida com a mudança de texto no campo de usuário
                isPassword={false}
              />
              {/* Componente de entrada de texto para o usuário */}
              <EntradaTexto
                label="Senha"
                placeholder="Mínimo de caracteres: 6"
                value={senha}
                onChangeText={setSenha} // Define a função que lida com a mudança de texto no campo de senha
                isPassword={true}
              />
              {/* Componente de entrada de texto para a senha */}
            </Box>

            <Botao mt={5}  children={"Criar Cadastro"} onPress={handleCadastro} style={{ width: '85%', paddingVertical: 10 }} /> 
            {/* Componente de botão para realizar o cadastro */}

            <Botao mt={-3} mb={1} children={"Cancelar"} onPress={() => navigation.navigate('Login')} style={{ width: '85%', paddingVertical: 10 }} />
            {/* Componente de botão para cancelar o cadastro */}
          </>
        )}
      </VStack>
    </View>
  );
}