import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, Button, Image } from 'react-native';
import { gql, useMutation } from "@apollo/client";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const REGISTER = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $name: String) {
      register(username: $username, email: $email, password: $password, name: $name)
    }
  `;
  const [register, { loading }] = useMutation(REGISTER)

  const registSubmit = async () => {
    try {
      await register({ variables: {email, password, username, name} });
      navigation.navigate("Login");
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}
          title={loading ? "loading..." : "register"}
          onPress={registSubmit}
          disabled={loading}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}> Login</Text>
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
  loginText: {
    color: '#3b5998',
  },
});

export default RegisterScreen;