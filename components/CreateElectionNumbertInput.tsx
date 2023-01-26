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
interface ICreateElectionNumberInput {
    label: string;
    onUserInput: (inout: string) => void;
    value: string;
}

const CreateElectionNumberInput: React.FC<ICreateElectionNumberInput> = ({ label, onUserInput, value }) => {
    return (
        <InputWrapper>
            <Label>{label}</Label>
            <Input
                type="text"
                placeholder="Example: 2 - 9"
                // universal input options
                inputMode="numeric"
                autoComplete="off"
                autoCorrect="off"
                // text-specific options
                pattern="[0-9]*"
                minLength={1}
                maxLength={79}
                spellCheck="false"
            />
        </InputWrapper>
    );
};

export default CreateElectionNumberInput;
