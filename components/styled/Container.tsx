import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;

    @media (min-width: 768px) {
        padding: 0 24px;
    }

    @media (min-width: 992px) {
        padding: 0 32px;
    }

    @media (min-width: 1200px) {
        padding: 0 40px;
    }
`;

export default Container;
