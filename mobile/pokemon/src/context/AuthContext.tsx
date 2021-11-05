import React from 'react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://reqres.in/api',
    timeout: 1000 * 4,
});


export const AuthContext = createContext({} as AuthContextData);

interface User {
    email: string
}

interface AuthContextData {
    user: User
    login(email: string, senha: string): Promise<void>
    logout(): Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState({} as User);


    useEffect(() => {
        async function loadStorageDate() {

            const userStoraged = await AsyncStorage.getItem('@Pokemon:User');
            //const userStoraged = JSON.stringify({ id: "12345", name: "Rian R", image: "https://github.com/riansco14.png", email: "riantal@gmail.com" })
            if (userStoraged) {
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
        }
        loadStorageDate();
    }, []);

    async function login(email: string, senha: string) {
        console.log(email);
        console.log(senha);

        try {
            const response = await api.post('/login', {
                'email': String(email),
                'password': String(senha),
            });
            if (response.status == 200) {
                const userLogged = {
                    email: email,
                } as User;
                setUser(userLogged);
                await AsyncStorage.setItem('@Pokemon:User', JSON.stringify(userLogged));
            }

            console.log(response.status);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.status);

            if (error.response.status == 400) {
                return Alert.alert('Não foi possível autenticar', 'Credenciais incorretas');
            } else {
                console.log(error.response.status);
            }
        }
    }

    async function logout() {
        setUser({} as User);
        await AsyncStorage.removeItem('@Pokemon:User');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
