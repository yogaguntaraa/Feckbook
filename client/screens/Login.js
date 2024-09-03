import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../App';
import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';


const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    userId
    username
  }
}
`;

const LoginScreen = ({ navigation }) => {
    const [login, {loading}] = useMutation(LOGIN);
    // const { setIsSignedIn } = useContext(AuthContext)
    // const { setIsSignedIn } = useState(true)

    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');


    const loginSubmit = async () => {
        // console.log({email, password})
        try {
            const result = await login({ variables: { email: email, password: password } });
            // console.log({ email, password });
            await SecureStore.setItemAsync(
                "accessToken",
                result.data.login.accessToken
            );
            await SecureStore.setItemAsync("userId", result.data.login.userId);
            await SecureStore.setItemAsync("username", result.data.login.username);
            navigation.navigate("Main")
            // console.log(result.data.login.accessToken)
            // setIsSignedIn(true);
            console.log(result)
        } catch (error) {
            Alert.alert(error.message);
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feckbook</Text>
            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={loginSubmit}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.orText}> Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#3b5998',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#3b5998',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orText: {
        marginVertical: 16,
        color: '#333',
    },
    registerText: {
        color: '#3b5998',
    },
});

export default LoginScreen;