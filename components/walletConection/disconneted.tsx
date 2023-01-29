import { FC } from 'react';

import Button from '../styled/Button';

const Disconnected: FC<{ connect: () => void }> = ({ connect }) => {
    return (
        <Button borderRadius="2rem" padding=".5rem 1.5rem" fontWeigth="500" onClick={connect}>
            Connect wallet
        </Button>
    );
};

export default Disconnected;
