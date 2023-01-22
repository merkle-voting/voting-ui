import styled from 'styled-components';

import Logo from './Logo';
import Container from './styled/Container';
import Flex from './styled/Flex';
import Walletconnection from './walletConection';

const SizedContainer = styled(Container)`
    height: 5rem;
`;

const SizedFlex = styled(Flex)`
    height: 100%;
`;

const PageTitle = styled.h1``;
interface IHeader {
    adminPageTitle?: string;
}
const Header: React.FC<IHeader> = ({ adminPageTitle }) => {
    return (
        <SizedContainer>
            <SizedFlex justifyContent="space-between" alignItems="flex-end">
                {adminPageTitle ? <PageTitle>{adminPageTitle}</PageTitle> : <Logo />}
                <Walletconnection />
            </SizedFlex>
        </SizedContainer>
    );
};

export default Header;
