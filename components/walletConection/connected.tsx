import React, { FC } from 'react';
import styled from 'styled-components';

import { shortenAddress } from '../../utils';

const ConnectedAccount = styled.div`
    display: inline-block;
    padding: 0.5rem 2rem;
    background-color: ${({ theme }) => theme.colors.lightGreen};
    border-radius: 2rem;
`;

const Connected: FC<{ account: string }> = ({ account }) => {
    return <ConnectedAccount>{shortenAddress(account)}</ConnectedAccount>;
};

export default Connected;
