import { atom } from 'recoil';

export const tokenState = atom({
  key: 'tokenState',
  default: (() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
  })(),
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
  default: localStorage.getItem('userId'),
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
