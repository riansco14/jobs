import styled, { css } from 'styled-components/native';
interface TabSelected {
    selected: boolean
}

export const Container = styled.View`
    flex:1;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-around;

    border-bottom-color: #C0C0C0;
    border-bottom-width: 1px;
`;

export const ContainerTabSection = styled.TouchableWithoutFeedback``;
export const TabSectionView = styled.View<TabSelected>`
    flex:1;
    padding: 20px 0;

    ${({ selected }) => selected && css`
        border-bottom-color: #FF1D1D;
        border-bottom-width: 2px;
    `}

`;
export const TabSectionText = styled.Text<TabSelected>`
    font-family: ${({ theme }) => theme.fonts.spartan600};
    font-size: 13px;
    line-height: 16px;
    color: rgba(94, 94, 94, 0.7);

    text-align: center;

    ${({ selected }) => selected && css`
        font-family: ${({ theme }) => theme.fonts.spartan800};
        font-size: 14px;
        color: #5E5E5E;
    `}
`;

export const ContainerTab = styled.View`
    flex: 1;
    padding: 26px;
`;

export const LinhaInfo = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 8px;
`;

export const TituloContainer = styled.View`
    flex: 1;
`;

export const TituloText = styled.Text`

    font-family: ${({ theme }) => theme.fonts.spartan800};
    font-size: 14px;
    color: #9A9A9A;
`;
export const ConteudoText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.spartan500};
    font-size: 13px;
    color: #1E1E1E;
`;


