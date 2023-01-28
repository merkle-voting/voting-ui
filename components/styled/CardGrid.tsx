import styled from 'styled-components';

export const CardGrid = styled.div<{ columns?: number }>`
    overflow-y: scroll;
    display: grid;
    grid-template-columns: ${(props) => `repeat(${props.columns || 3}, 1fr)`};
    grid-gap: 10px;
    max-height: 80vh;
`;
