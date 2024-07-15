import { get } from './http';

const trainApi= {
    trainList: (params) => get('/train/train', params),
};

export default trainApi;
