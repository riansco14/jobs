import React, { useState } from 'react';

import { Container, Header, TituloText, LimparFiltroButton, FecharButton, Content, TituloContentText, Footer, LimparFiltroText, AplicarButton, ButtonEscolha, ButtonEscolhaText, ButtonEscolhaContainer } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, TouchableWithoutFeedbackProps } from 'react-native';

interface ModalFilterProps {
    hideModal(): void
    changeTipoPokemon(value: number): void
}

interface ButtonCategoriaProps extends TouchableWithoutFeedbackProps {
    nome: string
    selected: boolean
}

export function ButtonCategoria({ nome, selected, ...rest }: ButtonCategoriaProps
) {
    return (
        <ButtonEscolhaContainer {...rest}>
            <ButtonEscolha selected={selected}>
                <ButtonEscolhaText selected={selected}>{nome}</ButtonEscolhaText>
            </ButtonEscolha>
        </ButtonEscolhaContainer>
    );
}

export function ModalFilter({ hideModal, changeTipoPokemon }: ModalFilterProps) {
    const [categoriaSelected, setCategoriaSelected] = useState(0);

    function handleLimpar() {
        changeTipoPokemon(0);
        hideModal();
    }

    function handleAplicar() {
        changeTipoPokemon(categoriaSelected);
        hideModal();
    }

    const categorias = [
        { nome: 'Todos', key: 0 }
        , { nome: 'Água', key: 11 }
        , { nome: 'Fogo', key: 10 }
        , { nome: 'Planta', key: 12 }
        , { nome: 'Fada', key: 18 }
        , { nome: 'Fantasma', key: 8 }
        , { nome: 'Gelo', key: 15 }
        , { nome: 'Eletrico', key: 13 },
    ];

    return (
        <Container>
            <Header>
                <TituloText>Filtro</TituloText>
                <LimparFiltroButton onPress={handleLimpar}><LimparFiltroText>Limpar filtros</LimparFiltroText></LimparFiltroButton>
                <FecharButton onPress={() => hideModal()}>
                    <Icon name="close" color="#5E5D5D" size={26} />
                </FecharButton>
            </Header>
            <Content>
                <TituloContentText>Tipo</TituloContentText>
                <FlatList data={categorias}
                    numColumns={2}
                    style={{ marginTop: 20 }}
                    renderItem={({ item }) =>
                        <ButtonCategoria
                            nome={item.nome}
                            key={item.key}
                            selected={categoriaSelected === item.key}
                            onPress={() => setCategoriaSelected(item.key)}
                        />
                    }
                />
            </Content>
            <Footer>
                <AplicarButton mode="contained" onPress={handleAplicar}>aplicar</AplicarButton>
            </Footer>
        </Container>
    );
}
