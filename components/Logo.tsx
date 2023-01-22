import Image from 'next/image';
import styled from 'styled-components';

import logoWithText from '../assets/logo-with-text.png';

const LogoImage = styled(Image)`
    /* width: 7rem; */
    /* height: auto;
    border-radius: 4px; */
`;

interface ILogo {
    width?: number;
    height?: number;
}

const Logo: React.FC<ILogo> = ({ width, height }) => {
    return <LogoImage src={logoWithText.src} alt="logo" width={width || 150} height={height || 40} />;
};

export default Logo;
