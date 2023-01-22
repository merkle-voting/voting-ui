import jazzicon from '@metamask/jazzicon';
import { useLayoutEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

interface IIdenticon {
    size?: number;
    account: string;
    offset?: number;
}

const StyledIdenticon = styled.div<{ size: number; offset?: number }>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.green};
    font-size: initial;
    position: relative;
    right: ${({ offset }) => `${offset}px`};
`;

const Identicon: React.FC<IIdenticon> = ({ account, size = 30, offset }) => {
    const icon = useMemo(() => account && jazzicon(size, parseInt(account.slice(2, 10), 16)), [account, size]);
    const iconRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const current = iconRef.current;
        if (icon) {
            current?.appendChild(icon);
            return () => {
                try {
                    current?.removeChild(icon);
                } catch (e) {
                    console.error('Avatar icon not found');
                }
            };
        }
        return;
    }, [icon, iconRef]);
    return (
        <StyledIdenticon size={size} offset={offset}>
            <span ref={iconRef} />
        </StyledIdenticon>
    );
};

export default Identicon;
