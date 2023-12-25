import { atom } from 'recoil';

export const tokenState = atom({
  key: 'tokenState',
  default: localStorage.getItem('token') ?? null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem('token', JSON.stringify(newValue));
      });
    },
  ],
});

export const userIdState = atom({
  key: 'userIdState',
  default: localStorage.getItem('userId') ?? null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem('userId', JSON.stringify(newValue));
      });
    },
  ],
});

export const roleState = atom({
  key: 'roleState',
  default: [],
});
