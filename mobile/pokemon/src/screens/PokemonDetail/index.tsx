import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PokemonCardBig } from '../../components/PokemonCardBig';
import { TabBar } from '../../components/TabBar';
import { api } from '../../services/api';

import { Container, Header, Content, PokemonInfo, PokemonNomeText, PokemonNumeroText, PokemonInfoTipo, PokemonTipoContent, PokemonTipoNomeText, PokemonInfoImage, Footer, BackButton } from './styles';

export interface SobrePokemonDetailProps {
    especie: string
    tamanho: string
    habilidades: string
    peso: string
}

export interface PokemonDetailProps {
    nome: string
    numero: string
    tipos: string[]
    imageURL: string
    sobre: SobrePokemonDetailProps
}
export function PokemonDetail({ route, navigation }) {
    const colors = {
        fire: '#FF6969',
        water: '#7CC0FF',
        grass: '#7CFFD0',
    };
    const color = (type: string) => {
        const index = Object.keys(colors).indexOf(type);
        if (index === -1) { return colors.fire; }
        return Object.values(colors)[index];
    };
    const [pokemon, setPokemon] = useState(null as PokemonDetailProps);

    const { pokemonNome } = route.params;

    function handleBack() {
        navigation.goBack();
    }

    async function fetchPokemons(pokemonNome: string) {
        try {
            const response = await api.get(`/pokemon/${pokemonNome.toLowerCase()}/`);

            if (!response.data) {
                return;
            }

            const { id, name, types, species, abilities, height, weight } = response.data;
            console.log(Object.keys(response.data.types));

            const tiposTemp = types.map(item => {
                if (item && item.type) { return item.type.name.replace(/(^|\s)\S/g, letter => letter.toUpperCase()); }
            });

            const habilidadesTemp = abilities.map(item => {
                if (item && item.ability) { return item.ability.name.replace(/(^|\s)\S/g, letter => letter.toUpperCase()); }
            });

            const pokemonDetail: PokemonDetailProps = {
                numero: id,
                nome: name.replace(/(^|\s)\S/g, letter => letter.toUpperCase()),
                tipos: tiposTemp,
                imageURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${Number(id)}.png`,
                sobre: {
                    especie: species.name.replace(/(^|\s)\S/g, letter => letter.toUpperCase()),
                    habilidades: habilidadesTemp.join(' , '),
                    peso: weight + 'kg',
                    tamanho: height + 'm',
                },
            };
            setPokemon(pokemonDetail);
            //console.log(pokemonDetail);
        } catch (error) {
            Alert.alert('Ops...Aconteceu um imprevisto', 'Não foi possível carregar.');
            handleBack();
        }

    }

    useEffect(() => {
        fetchPokemons(pokemonNome);
    }, []);

    if (!pokemon) { return <ActivityIndicator />; }
    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack}>
                    <Icon name="arrow-back" size={28} color="#5E5D5D" />
                </BackButton>
            </Header>

            <Content>
                <PokemonInfo>
                    <PokemonNomeText>{pokemon.nome}</PokemonNomeText>
                    <PokemonNumeroText>#{pokemon.numero}</PokemonNumeroText>
                </PokemonInfo>
                <PokemonInfoTipo>
                    {pokemon.tipos && pokemon.tipos.map(item => (
                        <PokemonTipoContent colorSelected={color(pokemon.tipos[0].toLowerCase())} key={item}>
                            <PokemonTipoNomeText>
                                {item}
                            </PokemonTipoNomeText>
                        </PokemonTipoContent>
                    ))}
                </PokemonInfoTipo>
                <PokemonInfoImage>
                    <PokemonCardBig imageURL={pokemon.imageURL}
                        type={pokemon.tipos[0].toLowerCase()} />
                </PokemonInfoImage>
            </Content>
            <Footer>
                <TabBar pokemon={pokemon} />
            </Footer>
        </Container>
    );
}
