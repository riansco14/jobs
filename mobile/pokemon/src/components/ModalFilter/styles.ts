import { Button } from 'react-native-paper';
import styled, { css } from 'styled-components/native';

interface ButtonCategoriaSelected {
    selected: boolean
}

export const Container = styled.View`
    flex:1;
    padding: 23px;
    
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`;

export const TituloText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.spartan700};
    font-size: 24px;
    line-height: 30px;
    color: #3F3F3F;
`;
export const LimparFiltroButton = styled.TouchableWithoutFeedback`
    
`;
export const LimparFiltroText = styled.Text`
    color: #4A7DFF;
    font-size: 16px;
    border-bottom-width: 1px;
    border-color: #4A7DFF;
`;
export const FecharButton = styled.TouchableWithoutFeedback``;
export const Content = styled.View`
    flex: 1;
    margin-top: 40px;
`;
export const TituloContentText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.spartan600};
    font-size: 16px;
    line-height: 24px;
    color: #3F3F3F;
`;
export const Footer = styled.View``;

export const AplicarButton = styled(Button)`
    border-radius: 4px;
`;

export const ButtonEscolhaContainer = styled.TouchableWithoutFeedback``;
export const ButtonEscolha = styled.View<ButtonCategoriaSelected>`
    flex: 1;
    background-color: #D8D8D8;
    border-radius: 4px;
    padding: 8px 20px ;

    align-items: center;
    margin-right: 12px;
    margin-bottom: 12px;

    
    ${({ selected }) => selected && css`
        background-color: #2E6EB5;
    `}

`;

export const ButtonEscolhaText = styled.Text<ButtonCategoriaSelected>`
    font-family: ${({ theme }) => theme.fonts.spartan500};
    font-size: 14px;
    color: #6B6060;

    ${({ selected }) => selected && css`
        color: #fff;
    `}
`;
