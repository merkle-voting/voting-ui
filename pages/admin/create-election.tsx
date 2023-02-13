import 'react-datetime/css/react-datetime.css';

import { FiletypeCsv } from '@styled-icons/bootstrap';
import { useStepper } from 'headless-stepper';
import moment, { Moment } from 'moment';
import Head from 'next/head';
import { useEffect, useMemo, useReducer, useState } from 'react';
import Datetime from 'react-datetime';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { useFilePicker } from 'use-file-picker';

import CreateElectionTextInput from '../../components/CreateElectionTextInput';
import ElectionCandidateInput from '../../components/ElectionCandidateInput';
import Header from '../../components/Header';
import AdminLayout from '../../components/layouts/adminLayout';
import { ContentContainer, PageWrapper } from '../../components/styled/Admin';
import Button from '../../components/styled/Button';
import { SERVER_ROOT_URL } from '../../constants/url';
import { useVotingContract } from '../../hooks/useContract';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { addHours, calculateGasMargin } from '../../utils';

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

const SubmitButton = styled(Button)`
    margin-top: 1rem;
    &:disabled {
        pointer-events: none;
        cursor: not-allowed;
        background-color: #ccc;
    }
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

// REDUCER STUFF
// ===========================================================================================
enum ActionTypes {
    SET_ELECTION_TITLE = 'SET_ELECTION_TITLE',
    SET_NUMBER_OF_CANDIDATES = 'SET_NUMBER_OF_CANDIDATES',
    SET_CANDIDATE_NAME = 'SET_CANDIDATE_NAME',
    SET_VOTERS_CSV = 'SET_VOTERS_CSV',
    SET_START_TIME = 'SET_START_TIME',
    SET_END_TIME = 'SET_END_TIME',
    RESET = 'RESET',
}

interface Action {
    type: ActionTypes;
    payload?: { data: any };
}
interface IState {
    electionTitle: string;
    numberOfCandidates: number;
    candidatesNamesById: { [id: number]: string };
    votersCsv: File | null | undefined;
    startTime: Moment | undefined;
    endTime: Moment | undefined;
}

const initialState: IState = {
    electionTitle: '',
    numberOfCandidates: 2,
    candidatesNamesById: {},
    votersCsv: null,
    startTime: moment(addHours(new Date(), 1)),
    endTime: moment(addHours(new Date(), 2)),
};

const reducer = (state: IState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_ELECTION_TITLE:
            return { ...state, electionTitle: action?.payload?.data };
        case ActionTypes.SET_NUMBER_OF_CANDIDATES:
            return { ...state, numberOfCandidates: action?.payload?.data };
        case ActionTypes.SET_CANDIDATE_NAME:
            return {
                ...state,
                candidatesNamesById: { ...state.candidatesNamesById, ...(action?.payload?.data as object) },
            };
        case ActionTypes.SET_VOTERS_CSV:
            return { ...state, votersCsv: action?.payload?.data };
        case ActionTypes.SET_START_TIME:
            return { ...state, startTime: action?.payload?.data };
        case ActionTypes.SET_END_TIME:
            return { ...state, endTime: action?.payload?.data };
        case ActionTypes.RESET:
            return initialState;
        default:
            return state;
    }
};

// ===========================================================================================

const CreateElection = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const steps = useMemo(() => [{ label: 'Step 1' }, { label: 'Step 2' }], []);
    const [attemptingTx, setAttemptingTx] = useState(false);

    const { state: stepperState, nextStep, prevStep, stepsProps, stepperProps } = useStepper({ steps });
    const isAdmin = useIsAdmin();

    const { electionTitle, numberOfCandidates, candidatesNamesById, votersCsv, startTime, endTime } = state;
    const [openFileSelector, { plainFiles }] = useFilePicker({
        // accept: ['.xls', '.xlsx', '.xlsm', '.xltx', '.xltm'],
        accept: '.csv',
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
    }, [plainFiles]);

    const votingContract = useVotingContract(true);

    const onSubmit = async () => {
        try {
            if (!electionTitle || !numberOfCandidates || !candidatesNamesById || !votersCsv || !startTime || !endTime) {
                throw new Error('Please complete the form');
            }

            if (!votingContract) {
                throw new Error('No contract found');
            }

            if (!isAdmin) throw new Error("You are not the admin, you should'nt be here!");

            const candidates = Object.keys(candidatesNamesById);
            const candidateNames = Object.values(candidatesNamesById);
            const maxCandidate = candidates.length;
            const timestarted = startTime.unix();
            const timeEnded = endTime.unix();
            const duration = timeEnded - timestarted;

            if (duration < 10800) throw new Error('Election duration should be a minimum of 3 hours');
            const formData = new FormData();
            formData.append('name', electionTitle);
            formData.append('file', votersCsv);

            const estimatedGas = await votingContract.estimateGas.createElection(
                candidates,
                timestarted,
                duration,
                electionTitle,
                maxCandidate,
                candidateNames
            );

            await votingContract.callStatic.createElection(
                candidates,
                timestarted,
                duration,
                electionTitle,
                maxCandidate,
                candidateNames,
                {
                    gasLimit: calculateGasMargin(estimatedGas),
                }
            );

            setAttemptingTx(true);

            const votersDetailsResponse = await fetch(`${SERVER_ROOT_URL}/voters/details`, {
                method: 'POST',
                body: formData,
            });
            const votersDetailsData = await votersDetailsResponse.json();
            if (!votersDetailsData.success) {
                throw new Error(votersDetailsData.message);
            }
            const createElectionTransaction = await votingContract.createElection(
                candidates,
                timestarted,
                duration,
                electionTitle,
                maxCandidate,
                candidateNames
            );
            // wait for the transaction to be mined so we can get the emitted data
            const reciept = await createElectionTransaction.wait();
            const log = reciept.events[0].args;

            const addIdResponse = await fetch(`${SERVER_ROOT_URL}/elections/add-id`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    election_id: String(log.id),
                    election_name: log.title,
                }),
            });

            const addIdData = await addIdResponse.json();

            if (!addIdData.success) throw new Error(addIdData.message);

            toast('Election Successfully created', {
                duration: 4000,
                position: 'top-center',
                style: { backgroundColor: '#a3f26f' },
                icon: '👏',
                iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            dispatch({
                type: ActionTypes.RESET,
            });
            prevStep();
        } catch (error: any) {
            toast(
                `An Error occured: ${
                    error.message ? String(error.message).substring(0, 150) : 'please check the console'
                }`,
                {
                    duration: 4000,
                    position: 'top-center',
                    style: { backgroundColor: '#f19c9c' },
                    icon: '❌',
                    iconTheme: {
                        primary: '#000',
                        secondary: '#fff',
                    },
                    ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                    },
                }
            );
            console.error('error creating election: ', error);
        } finally {
            setAttemptingTx(false);
        }
    };

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
                                    <SubmitButton
                                        bgColor="#a3f26f"
                                        color="#000"
                                        onClick={onSubmit}
                                        type="button"
                                        disabled={attemptingTx}
                                    >
                                        Submit
                                    </SubmitButton>
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
