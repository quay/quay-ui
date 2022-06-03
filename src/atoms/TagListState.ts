import { atom } from 'recoil';


export const filterState = atom({
    key: 'filterState',
    default: "",
});

export const paginationState = atom({
    key: 'paginationState',
    default: {
        page: 1,
        perPage: 25,
    },
});
