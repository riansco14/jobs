import React from 'react';

import { Container, ContainerButton, ImagePokemon, Title, TitleContainer } from './styles';
import PokemonImg from '../../assets/pokemon.png';
import { TouchableWithoutFeedbackProps } from 'react-native';

interface PokemonCardProps extends TouchableWithoutFeedbackProps {
    nome: string
    imageURL: string
}

export function PokemonCard({ nome, imageURL, ...rest }: PokemonCardProps) {
    return (
        <ContainerButton {...rest}>
            <Container colors={['#7CFFD0', '#4A7B42']}>
                <ImagePokemon resizeMode="contain" source={{ uri: imageURL }} />
                <TitleContainer>
                    <Title>
                        {nome}
                    </Title>
                </TitleContainer>
            </Container>
        </ContainerButton>
    );
}
