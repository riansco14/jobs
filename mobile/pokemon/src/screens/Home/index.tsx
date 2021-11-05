import React, { useEffect, useState } from 'react';

import { Container, ContainerSearch, FilterButon, FilterView, Logo, SearchInput } from './styles';
import LogoImg from '../../assets/logo.png';
import { PokemonCard } from '../../components/PokemonCard';
import { ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { ModalFilter } from '../../components/ModalFilter';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

interface PokemonResult {
    id?: number
    nome: string
    url: string
}

export function Home() {
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { flex: 1, marginLeft: 60, padding: 0, backgroundColor: 'white' };

    const [pokemonList, setPokemonList] = useState([] as PokemonResult[]);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const [tipoPokemon, setTipoPokemon] = useState(0);
    const changeTipoPokemon = (value: number) => setTipoPokemon(value);

    const [buscar, setBuscar] = useState('');
    const [pokemonListFiltered, setPokemonListFiltered] = useState([] as PokemonResult[]);

    useEffect(() => {
        if (tipoPokemon === 0) {
            fetchPokemons();
        } else {
            fetchPokemonsTipo();
        }
    }, [tipoPokemon]);


    function conditionToReload() {
        return ((tipoPokemon === 0) && buscar.length === 0);
    }

    async function fetchPokemonsTipo() {
        try {
            const response = await api.get(`/type/${tipoPokemon}/`);

            if (!response.data) {
                return setLoading(true);
            }

            const { pokemon } = response.data;

            let pokemons = pokemon.map(item => {
                if (item.pokemon) {
                    return ({
                        nome: item.pokemon.name.replace(/(^|\s)\S/g, letter => letter.toUpperCase()),
                        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${Number(item.pokemon.url.match(/\/(\d+?)\//)[1])}.png`,
                    });
                }
            });

            setPokemonList(pokemons);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }



        /*
        const resultTranslate = results.map(item => (
            {
                nome: item.name.replace(/(^|\s)\S/g, letter => letter.toUpperCase()),
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${Number(item.url.match(/\/(\d+?)\//)[1])}.png`,
            }
        ));



        if (page > 0) {
            console.log(pokemonList.length);
            setPokemonList([...pokemonList, ...resultTranslate]);

        }
        else {
            setPokemonList(resultTranslate);
        }*/


    }

    useEffect(() => {
        if (buscar.length === 0) {
            setPokemonListFiltered(pokemonList);
        }
        else if (buscar.length > 1) {
            let filterList = pokemonList.filter(item => {
                //Procurar por nome e sem considerar maiusculas
                const regex = new RegExp(buscar + '.*', 'i');
                //console.log(item.nome.match(regex));
                //console.log(buscar);
                return item.nome.match(regex);
            });
            setPokemonListFiltered(filterList);
            //console.log(filterList);
        }



    }, [buscar, pokemonList]);



    async function fetchPokemons() {
        const response = await api.get(`/pokemon/?offset=${page * 10}&limit=10`);

        if (!response.data) {
            return setLoading(true);
        }

        const { results }: { results: PokemonResult[] } = response.data;
        const resultTranslate = results.map(item => (
            {
                nome: item.name.replace(/(^|\s)\S/g, letter => letter.toUpperCase()),
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${Number(item.url.match(/\/(\d+?)\//)[1])}.png`,
            }
        ));

        if (page > 0) {
            //console.log(pokemonList.length);
            setPokemonList([...pokemonList, ...resultTranslate]);

        }
        else {
            setPokemonList(resultTranslate);
        }
        setLoading(false);
        setLoadingMore(false);

    }

    function handleFetchMore(distance: number) {
        if (distance < 1) {
            return;
        }
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPokemons();
    }

    useEffect(() => {
        fetchPokemons();
    }, []);

    function handlePokemonCard(pokemonNome: string) {
        navigation.navigate('PokemonDetail', { pokemonNome: pokemonNome });
    }

    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ marginTop: 0, backgroundColor: 'transparent' }}>
                    <ModalFilter hideModal={hideModal} changeTipoPokemon={changeTipoPokemon} />
                </Modal>
            </Portal>
            <Container>
                <Logo source={LogoImg} />

                <ContainerSearch>
                    <SearchInput value={buscar} onChangeText={(text) => setBuscar(text)} placeholder="Buscar Pokémon" />
                    <FilterButon onPress={showModal}>
                        <FilterView>
                            <Icon name="filter-alt" color="#5E5D5D" size={24} />
                        </FilterView>
                    </FilterButon>
                </ContainerSearch>


                {loading ?
                    (<ActivityIndicator />) :
                    (
                        <FlatList
                            data={pokemonListFiltered}
                            numColumns={2}
                            renderItem={({ item }: { item: PokemonResult }) => (
                                <PokemonCard key={item.nome} nome={item.nome} imageURL={item.url} onPress={()=>handlePokemonCard(item.nome)} />
                            )}
                            onEndReachedThreshold={0.2}
                            onEndReached={({ distanceFromEnd }) => { conditionToReload() && handleFetchMore(distanceFromEnd); }}
                            ListFooterComponent={loadingMore ? <ActivityIndicator color={'#333'} /> : <></>}
                        />
                    )}


            </Container>
        </>
    );
}
