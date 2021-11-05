import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login';
import { Home } from '../screens/Home';
import { PokemonDetail } from '../screens/PokemonDetail';

const { Navigator, Screen } = createStackNavigator();


export function AppRoutes() {
    return (
        <Navigator headerMode="none">
            <Screen name="Home" component={Home} />
            <Screen name="PokemonDetail" component={PokemonDetail} />
        </Navigator>
    );
}
