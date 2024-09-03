import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigators/MainStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import client from './config/Apollo';
import { createContext, useState } from 'react';

// export const AuthContext = createContext()

export default function App() {

  return (
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </SafeAreaView>
      </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});


