import styled from 'styled-components';

import Identicon from './Identicon';

const VotersWrapper = styled.div`
    width: 12rem;
    display: flex;
`;

const OthersCircle = styled.div<{ offset: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.lightGreen};
    border: ${(props) => `2px solid ${props.theme.colors.green}`};
    font-size: 10px;
    color: green;
    position: relative;
    right: ${(props) => `${props.offset}px`};
`;

const Voters = () => {
    const votersAccount = [
        '0xd5E4484326EB3Dd5edbd5Def6d02aFE817fD4684',
        '0xd512944326EB3Dd5285439ef6d02aFE817f37844',
        '0xd5E4484326EB3Dd5FBbd5Def6d32aFE817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def64f2aFE817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def6d032FE817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def4502aFE817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def6d063FE817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def6d054FE817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def5402aFE817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def6d0254E817fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def6d02aF5417fD4684',
        '0xd5E4484326EB3Dd5FBbd5Def6d02aFE8165D4684',
    ];
    return (
        <>
            <VotersWrapper>
                {votersAccount.slice(0, 6).map((account, index) => (
                    <Identicon key={index} account={account} offset={index * 10} />
                ))}
            </VotersWrapper>
            {votersAccount.length > 6 && (
                <OthersCircle offset={7 * 10}>
                    <span>{`+ ${votersAccount.length - 6}`}</span>
                </OthersCircle>
            )}
        </>
    );
};

export default Voters;
