import 'react-datetime/css/react-datetime.css';

import { FiletypeCsv } from '@styled-icons/bootstrap';
import { useStepper } from 'headless-stepper';
import moment, { Moment } from 'moment';
import Head from 'next/head';
import { useEffect, useMemo, useReducer } from 'react';
import Datetime from 'react-datetime';
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
    const steps = useMemo(() => [{ label: 'Step 1' }, { label: 'Step 2' }], []);

    const { state: stepperState, nextStep, prevStep, stepsProps, stepperProps } = useStepper({ steps });

    interface IState {
        electionTitle: string;
        numberOfCandidates: number;
        candidatesNamesById: { [id: number]: string };
        votersCsv: File | null | undefined;
        startTime: Moment | undefined;
        endTime: Moment | undefined;
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
    function addHours(date: Date, hours: number) {
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);

        return date;
    }

    const initialState: IState = {
        electionTitle: '',
        numberOfCandidates: 2,
        candidatesNamesById: {},
        votersCsv: null,
        startTime: moment(addHours(new Date(), 1)),
        endTime: moment(addHours(new Date(), 2)),
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { electionTitle, numberOfCandidates, candidatesNamesById, votersCsv, startTime, endTime } = state;
    const [openFileSelector, { filesContent, loading, errors, clear, plainFiles }] = useFilePicker({
        accept: ['.xls', '.xlsx', '.xlsm', '.xltx', '.xltm'],
        multiple: false,
    });

    const candidatesIdArray = useMemo(
        () => Array.from({ length: Number(state.numberOfCandidates) }, (_, i) => i),
        [state.numberOfCandidates]
    );

    useEffect(() => {
        dispatch({
            type: ActionTypes.SET_VOTERS_CSV,
            payload: { data: plainFiles[0] },
        });
    }, [ActionTypes.SET_VOTERS_CSV, plainFiles]);

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
                                            value={electionTitle}
                                            onUserInput={(value) =>
                                                dispatch({
                                                    type: ActionTypes.SET_ELECTION_TITLE,
                                                    payload: { data: value },
                                                })
                                            }
                                        />
                                        {candidatesIdArray.map((id) => (
                                            <ElectionCandidateInput
                                                key={id}
                                                candidateId={id}
                                                nameValue={candidatesNamesById[id]}
                                                onUserInput={(value) =>
                                                    dispatch({
                                                        type: ActionTypes.SET_CANDIDATE_NAME,
                                                        payload: { data: { [id]: value } },
                                                    })
                                                }
                                            />
                                        ))}
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                dispatch({
                                                    type: ActionTypes.SET_NUMBER_OF_CANDIDATES,
                                                    payload: { data: numberOfCandidates + 1 },
                                                })
                                            }
                                        >
                                            Add Candidate +
                                        </Button>
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
                                            <span>Start: </span>
                                            <Datetime
                                                isValidDate={(current) => {
                                                    const yesterday = moment().subtract(1, 'day');
                                                    return current.isAfter(yesterday);
                                                }}
                                                value={startTime}
                                                onChange={(val) => {
                                                    dispatch({
                                                        type: ActionTypes.SET_START_TIME,
                                                        payload: { data: val },
                                                    });
                                                }}
                                            />
                                            <span>End: </span>
                                            <Datetime
                                                isValidDate={(current) => {
                                                    const yesterday = moment().subtract(1, 'day');
                                                    return current.isAfter(yesterday);
                                                }}
                                                value={endTime}
                                                onChange={(val) => {
                                                    dispatch({
                                                        type: ActionTypes.SET_END_TIME,
                                                        payload: { data: val },
                                                    });
                                                }}
                                            />
                                        </ElectionDuration>
                                        <FileUpload>
                                            <span>Upload voter&apos;s data: </span>
                                            <Button type="button" onClick={() => openFileSelector()}>
                                                Select File <FiletypeCsv size={20} />
                                            </Button>
                                            {votersCsv && <span>{votersCsv.name}</span>}
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
