import * as React from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import theme from './src/global/styles/theme';
import { Home } from './src/screens/Home';
import { PokemonDetail } from './src/screens/PokemonDetail';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';


const themePaper = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E6EB5',
  },
};


const Stack = createStackNavigator();

function App() {
  return (

      <ThemeProvider theme={theme}>
        <PaperProvider theme={themePaper}>
          <StatusBar />
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </PaperProvider>
      </ThemeProvider>

  );
}

export default App;

