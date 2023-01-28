import { CaretUp } from '@styled-icons/bootstrap';
import React from 'react';
import styled from 'styled-components';

import Button from './styled/Button';
import Flex from './styled/Flex';

const CardWrapper = styled.div`
    width: 22.5rem;
    height: 8.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colors.gray};
    box-shadow: 1px 2px 3px 4px #eeeeee;
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
    &:hover {
        transform: scale(1.02);
    }
`;

const Details = styled.div`
    span {
        display: block;
        &:first-child {
            font-size: 0.9rem;
            font-weight: 700;
        }
        &:nth-child(2) {
            font-size: 0.8rem;
            font-weight: 500;
        }
        &:last-child {
            font-size: 0.7rem;
            font-weight: 500;
            color: gray;
        }
    }
`;

const VoteCount = styled.span`
    display: inline-block;
    padding: 0 1rem;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.lightGreen};
    border: ${(props) => `2px solid ${props.theme.colors.green}`};
    font-size: 10px;
    color: green;
`;

const StyledCaretUp = styled(CaretUp)`
    width: 10px;
`;

const VoteBtn = styled(Button)`
    padding: 0.1rem 0.8rem;
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.green};
    border-radius: 1rem;
`;

const CandiateImage = styled.div`
    width: 7rem;
    height: 4rem;
    border-radius: 0.5rem;
    background-color: gray;
`;

// const Name = styled.span``;
// const Position = styled.span``;

// const Party = styled.span``;

const CandidateCard = () => {
    return (
        <CardWrapper>
            <Flex justifyContent="space-between">
                <Details>
                    <span>Peter Obi</span>
                    <span>Presidential Aspirant</span>
                    <span>Labour Party</span>
                </Details>
                <CandiateImage />
            </Flex>
            <Flex justifyContent="space-between" margin="1.5rem 0">
                <VoteCount>
                    <StyledCaretUp /> 5,000 votes
                </VoteCount>
                <VoteBtn>Vote</VoteBtn>
            </Flex>
        </CardWrapper>
    );
};

export default CandidateCard;
