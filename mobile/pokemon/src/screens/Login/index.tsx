import React, { useEffect, useState } from 'react';
import { Container, Content, TextInputEmail, Logo, SubTitle, Title, TextInputSenha, ButtonLogin, ButtonText, Background } from './styles';
import { TextInput } from 'react-native-paper';
import LogoImg from '../../assets/logo.png';
import BackgroundImg from '../../assets/background.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/core';



export function Login() {
    const navigation = useNavigation();

    const [email, setText] = useState('eve.holt@reqres.in');
    const [senha, setSenha] = useState('cityslicka');
    const [hidePass, setHidePass] = useState(true);

    const { user, login } = useAuth();
    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            navigation.navigate('Home');
        }
    }, [user]);

    return (
        <Container>
            <Background source={BackgroundImg}>
                <Logo source={LogoImg} />
                <Content>
                    <Title>Bem-vindo</Title>
                    <SubTitle>
                        Insira os seus dados para acessar
                    </SubTitle>

                    <TextInputEmail
                        label="Email"
                        value={email}
                        onChangeText={text => setText(text)}
                    />

                    <TextInputSenha
                        label="Senha"
                        value={senha}
                        onChangeText={text => setSenha(text)}
                        secureTextEntry={hidePass}
                        right={<TextInput.Icon onPress={() => setHidePass(!hidePass)} name="eye" />}
                    />


                    <ButtonLogin onPress={() => login(email, senha)} mode="contained" theme={{ roundness: 3 }}>
                        <ButtonText>Login</ButtonText>
                    </ButtonLogin>
                </Content>
            </Background>
        </Container>
    );
}
