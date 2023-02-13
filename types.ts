import { Moment } from 'moment';

export interface IElection {
    id: number | string;
    title: string;
    candatesId: number[];
    candidateNames: string[];
    startingTime: Moment;
    endingTime: Moment;
    durationInseconds: number;
    isActivated: boolean;
    candidatesVotes: number[];
    totalVotes: number;
}

export interface IPoll {
    candidateId: number;
    proof: string[];
    signature: string;
    voter: string;
    voterHash: string;
}
