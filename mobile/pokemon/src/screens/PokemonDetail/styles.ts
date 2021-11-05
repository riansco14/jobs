import styled, { css } from 'styled-components/native';

interface ColorProp{
    colorSelected: string
}

export const Container = styled.View`
    flex:1;
`;

export const Header = styled.View`
    padding: 0 26px;
    padding-top: 26px;
`;

export const BackButton = styled.TouchableWithoutFeedback`
`;


export const Content = styled.View`
    padding: 0 26px;
`;
export const PokemonInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 20px;
`;
export const PokemonNomeText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.spartan700};
    font-size: 24px;
    line-height: 30px;
    color: #3F3F3F;
`;
export const PokemonNumeroText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.spartan700};
    font-size: 16px;
    line-height: 30px;
    color: #3F3F3F;
`;
export const PokemonInfoTipo = styled.View`
    flex-direction: row;

    margin-top: 12px;
`;
export const PokemonTipoContent = styled.View<ColorProp>`
    background-color:rgba(255, 0, 0, 0.68);
    ${({ colorSelected }) => colorSelected && css`background-color: ${colorSelected};`};
    padding: 4px 12px ;
    border-radius: 40px;

    margin-right: 10px;


`;
export const PokemonTipoNomeText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.spartan600};
    font-size: 12px;
    color: #FFFFFF;
`;

export const PokemonInfoImage = styled.View`
    margin-top: 30px;
`;

export const Footer = styled.View`
    flex: 1;
    margin-top: 30px;
`;
