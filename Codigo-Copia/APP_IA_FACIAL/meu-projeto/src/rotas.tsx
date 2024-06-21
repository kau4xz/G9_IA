import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de que este pacote está instalado
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Login from "./login";
import Cadastro from "./cadastro";
import RecuperarSenha from "./recuperarSenha";
import TelaInicial from './telaInicial';
import CameraTela from './cameraTela';
import MinhasCapturas from './minhasCapturas';


const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -5,
    },
    headerLeftText: {
        marginLeft: 25,
        color: "black",
        fontSize: 18,
    },
});

const CustomHeaderLeft = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeftContainer}>
        {Platform.OS !== 'web' && (
            <Ionicons name="arrow-back" size={24} color="black" />
        )}
        <Text style={styles.headerLeftText}>Voltar</Text>
    </TouchableOpacity>
);

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Cadastro" 
                    component={Cadastro} 
                    options={({ navigation }) => ({
                        headerShown: true, 
                        title: '',
                        headerLeft: () => <CustomHeaderLeft navigation={navigation} />
                    })}
                />
                <Stack.Screen 
                    name="RecuperarSenha" 
                    component={RecuperarSenha} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: '',
                        headerLeft: () => <CustomHeaderLeft navigation={navigation} />
                    })}
                />
                <Stack.Screen 
                    name="TelaInicial" 
                    component={TelaInicial} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: '',
                        headerLeft: () => <CustomHeaderLeft navigation={navigation} />
                    })}
                />
                <Stack.Screen 
                    name="CameraTela" 
                    component={CameraTela} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="MinhasCapturas" 
                    component={MinhasCapturas} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: '',
                        headerLeft: () => <CustomHeaderLeft navigation={navigation} />
                    })}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}