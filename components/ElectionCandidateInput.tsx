import styled from 'styled-components';

import Flex from './styled/Flex';

const CandidateID = styled.div`
    span {
        display: block;
        font-weight: 500;
        margin-bottom: 1rem;
    }
`;

const CustomizedFlex = styled(Flex)`
    gap: 5rem;
`;

const InputWrapper = styled.div`
    margin-bottom: 2rem;
`;
const Label = styled.label`
    display: block;
    /* font-size: x-large; */
`;
const Input = styled.input`
    display: block;
    margin-top: 1rem;
    width: 100%;
    border-bottom: ${(props) => `2px solid ${props.theme.colors.lightGreen}`};
`;

interface IElectionCandidateInput {
    candiateId: number;
    nameValue: string;
    onUserInput: (inout: string) => void;
}

const ElectionCandidateInput: React.FC<IElectionCandidateInput> = ({ candiateId, nameValue, onUserInput }) => {
    return (
        <CustomizedFlex>
            <CandidateID>
                <span>Candidate ID: </span>
                <span>{candiateId}</span>
            </CandidateID>
            <InputWrapper>
                <Label>Candidate Name</Label>
                <Input
                    type="text"
                    placeholder="John Doe"
                    // universal input options
                    inputMode="text"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />
            </InputWrapper>
        </CustomizedFlex>
    );
};

export default ElectionCandidateInput;
