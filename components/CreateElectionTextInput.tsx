import styled from 'styled-components';

const InputWrapper = styled.div`
    margin-bottom: 2rem;
`;
const Label = styled.label`
    display: block;
    font-size: x-large;
`;
const Input = styled.input`
    display: block;
    margin-top: 1rem;
    width: 100%;
    border-bottom: ${(props) => `2px solid ${props.theme.colors.lightGreen}`};
`;
interface ICreateElectionTextInput {
    label: string;
    onUserInput: (inout: string) => void;
    value: string;
}

const CreateElectionTextInput: React.FC<ICreateElectionTextInput> = ({ label, onUserInput, value }) => {
    return (
        <InputWrapper>
            <Label>{label}</Label>
            <Input
                type="text"
                placeholder="Example: 2023 General Election"
                // universal input options
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
        </InputWrapper>
    );
};

export default CreateElectionTextInput;
