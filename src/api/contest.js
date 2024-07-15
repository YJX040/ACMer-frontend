import { get, post } from './http';

const contestApi= {
    listProblem: (params) => get('/problem/list', params),
    listContest: (params) => get('/contest/list', params),
    listRank: (params) => get('/cfRanking/list', params),
};

export default contestApi;
