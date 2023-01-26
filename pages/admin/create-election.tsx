import { FiletypeCsv } from '@styled-icons/bootstrap';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker/dist/entry.nostyle';
import { useStepper } from 'headless-stepper';
import Head from 'next/head';
import { useMemo, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useFilePicker } from 'use-file-picker';

import CreateElectionTextInput from '../../components/CreateElectionTextInput';
import ElectionCandidateInput from '../../components/ElectionCandidateInput';
import Header from '../../components/Header';
import AdminLayout from '../../components/layouts/adminLayout';
import { ContentContainer, PageWrapper } from '../../components/styled/Admin';
import Button from '../../components/styled/Button';

const Stepper = styled.div`
    display: flex;
`;

const Step = styled.span`
    width: 1rem;
    height: 1rem;
    border: ${(props) => `3px solid ${props.theme.colors.lightGreen}`};
    border-radius: 50%;
    position: relative;
    margin-right: 4.8rem;
    & + &:before {
        content: '';
        width: 4rem;
        height: 0.1rem;
        background-color: ${(props) => `${props.theme.colors.lightGreen}`};
        position: absolute;
        right: 1.2rem;
        top: 0.2rem;
    }
`;

const StyledForm = styled.form`
    margin-top: 2rem;
`;

const FormGroupWrapper = styled.div`
    margin-top: 2rem;
`;

const FormHeader = styled.h2``;

const NextButton = styled(Button)`
    margin-top: 1rem;
`;

const ElectionDuration = styled.div`
    span {
        font-weight: 500;
        font-size: 1.2rem;
    }
`;

const FileUpload = styled.div`
    margin-top: 3rem;
    span {
        display: block;
        font-weight: 500;
        font-size: 1.2rem;
    }
`;

const CreateElection = () => {
    const [duration, setDuration] = useState(['12:00', '01:00']);
    const steps = useMemo(() => [{ label: 'Step 1' }, { label: 'Step 2' }], []);

    const { state: stepperState, nextStep, prevStep, progressProps, stepsProps, stepperProps } = useStepper({ steps });

    interface IState {
        electionTitle: string;
        numberOfCandidates: number;
        candidatesNamesById: { [id: number]: string };
        votersCsv: any;
        startTime: number | undefined;
        endTime: number | undefined;
    }

    enum ActionTypes {
        SET_ELECTION_TITLE = 'SET_ELECTION_TITLE',
        SET_NUMBER_OF_CANDIDATES = 'SET_NUMBER_OF_CANDIDATES',
        SET_CANDIDATE_NAME = 'SET_CANDIDATE_NAME',
        SET_VOTERS_CSV = 'SET_VOTERS_CSV',
        SET_START_TIME = 'SET_START_TIME',
        SET_END_TIME = 'SET_END_TIME',
    }

    interface Action {
        type: ActionTypes;
        payload: { data: any };
    }

    const reducer = (state: IState, action: Action) => {
        switch (action.type) {
            case ActionTypes.SET_ELECTION_TITLE:
                return { ...state, electionTitle: action.payload.data };
            case ActionTypes.SET_NUMBER_OF_CANDIDATES:
                return { ...state, numberOfCandidates: action.payload.data };
            case ActionTypes.SET_CANDIDATE_NAME:
                return {
                    ...state,
                    candidatesNamesById: { ...state.candidatesNamesById, ...(action.payload.data as object) },
                };
            case ActionTypes.SET_VOTERS_CSV:
                return { ...state, votersCsv: action.payload.data };
            case ActionTypes.SET_START_TIME:
                return { ...state, startTime: action.payload.data };
            case ActionTypes.SET_END_TIME:
                return { ...state, endTime: action.payload.data };
            default:
                return state;
        }
    };

    const initialState: IState = {
        electionTitle: '',
        numberOfCandidates: 2,
        candidatesNamesById: {},
        votersCsv: null,
        startTime: undefined,
        endTime: undefined,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: '.csv',
    });

    const candidatesIdArray = useMemo(
        () => Array.from({ length: Number(state.numberOfCandidates) }, (_, i) => i),
        [state.numberOfCandidates]
    );

    return (
        <>
            <Head>
                <title>Admin - Merkle voting dApp</title>
                <meta name="description" content="A blockchain based voting dApp" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageWrapper>
                <Header adminPageTitle="Create Election" />
                <main>
                    <ContentContainer>
                        <Stepper {...stepperProps}>
                            {stepsProps?.map((step, index) => (
                                <Step key={index} {...step} />
                            ))}
                        </Stepper>
                        {stepperState.currentStep === 0 && (
                            <>
                                <StyledForm>
                                    <FormHeader>Election Data</FormHeader>
                                    <FormGroupWrapper>
                                        <CreateElectionTextInput
                                            label="Election title"
                                            value=""
                                            onUserInput={console.log}
                                        />
                                        {/* <CreateElectionNumberInput
                                    label="Number of Candidates"
                                    value=""
                                    onUserInput={console.log}
                                /> */}
                                        {candidatesIdArray.map((id) => (
                                            <ElectionCandidateInput
                                                key={id}
                                                candiateId={id}
                                                nameValue=""
                                                onUserInput={console.log}
                                            />
                                        ))}
                                        <Button type="button">Add Candidate +</Button>
                                    </FormGroupWrapper>
                                </StyledForm>
                                <NextButton bgColor="#a3f26f" color="#000" onClick={nextStep}>
                                    {String('Next >>')}
                                </NextButton>
                            </>
                        )}

                        {stepperState.currentStep === 1 && (
                            <>
                                <NextButton bgColor="#a3f26f" color="#000" onClick={prevStep}>
                                    {String('<< Back')}
                                </NextButton>
                                <StyledForm>
                                    <FormHeader>Time and Voter&apos;s data</FormHeader>
                                    <FormGroupWrapper>
                                        <ElectionDuration>
                                            <span>Voting window: </span>
                                            <TimeRangePicker onChange={setDuration} value={duration} />
                                        </ElectionDuration>
                                        <FileUpload>
                                            <span>Upload voter&apos;s data: </span>
                                            <Button type="button" onClick={() => openFileSelector()}>
                                                Select File <FiletypeCsv size={20} />
                                            </Button>
                                        </FileUpload>
                                    </FormGroupWrapper>
                                    <NextButton bgColor="#a3f26f" color="#000" onClick={nextStep} type="submit">
                                        Submit
                                    </NextButton>
                                </StyledForm>
                            </>
                        )}
                    </ContentContainer>
                </main>
            </PageWrapper>
        </>
    );
};

CreateElection.Layout = AdminLayout;
export default CreateElection;
