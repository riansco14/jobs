import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';
import { PokemonDetailProps, SobrePokemonDetailProps } from '../../screens/PokemonDetail';

import { Container, ContainerTabSection, TabSectionView, Header, TabSectionText, ContainerTab, LinhaInfo, TituloText, ConteudoText, TituloContainer } from './styles';

interface TabSectionProps extends TouchableWithoutFeedbackProps {
    titulo: string
    selected?: boolean
}


export function TabSection({ titulo, selected = false, ...rest }: TabSectionProps) {
    console.log(selected);

    return (
        <ContainerTabSection {...rest}>
            <TabSectionView selected={selected}>
                <TabSectionText selected={selected}>{titulo}</TabSectionText>
            </TabSectionView>
        </ContainerTabSection>
    );

}
interface TabBarSobre {
    key: string
    titulo: string
    value?: string
}

interface TabBarSobreProps {
    items: TabBarSobre[]
}
export function TabBarSobre({ items }: TabBarSobreProps) {
    return (
        <ContainerTab>
            {items.map(item => (
                <LinhaInfo key={item.key}>
                    <TituloContainer><TituloText>{item.titulo}</TituloText></TituloContainer>
                    <TituloContainer><ConteudoText>{item.value}</ConteudoText></TituloContainer>
                </LinhaInfo>
            ))}

        </ContainerTab>
    );
}

interface TabBarProps {
    pokemon: PokemonDetailProps
}

export function TabBar({ pokemon }: TabBarProps) {
    const [tabSelected, setTabSelected] = useState('status');

    const tabsArray = [
        { key: 'sobre', titulo: 'Sobre' },
        { key: 'status', titulo: 'Status' },
        { key: 'evolucao', titulo: 'Evolução' },
    ];

    const tabSobreKeys = [
        { key: 'especie', titulo: 'Espécie' },
        { key: 'tamanho', titulo: 'Tamanho' },
        { key: 'peso', titulo: 'Peso' },
        { key: 'habilidades', titulo: 'Habilidades' },
    ];

    const [tabSobre, setTabSobre] = useState([] as TabBarSobre[]);

    useEffect(() => {
        console.log(Object.keys(pokemon.sobre).indexOf('tamanho'));

        let tabSobreValue = tabSobreKeys.map((item) => ({
            key: item.key,
            titulo: item.titulo,
            value: Object.values(pokemon.sobre)[Object.keys(pokemon.sobre).indexOf(item.key)],
        }));

        setTabSobre(tabSobreValue);
    }, []);


    return (
        <Container>
            <Header>
                {tabsArray.map(item =>
                    (<TabSection key={item.key} titulo={item.titulo} selected={tabSelected === item.key} onPress={() => setTabSelected(item.key)} />)
                )}
            </Header>
            <TabBarSobre items={tabSobre} />
        </Container>
    );
}
