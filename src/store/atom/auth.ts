import { atom } from 'recoil';

type Role = '판매자' | '구매자';

const getItemFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setItemInLocalStorage = (
  key: string,
  value: string | Role[] | null,
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: getItemFromLocalStorage<string | null>('token'),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        setItemInLocalStorage('token', newValue);
      });
    },
  ],
});

export const userIdState = atom<string | null>({
  key: 'userIdState',
  default: getItemFromLocalStorage<string | null>('userId'),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        setItemInLocalStorage('userId', newValue);
      });
    },
  ],
});

export const roleState = atom<Role[]>({
  key: 'roleState',
  default: getItemFromLocalStorage<Role[]>('role') || ['판매자', '구매자'],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        setItemInLocalStorage('role', newValue);
      });
    },
  ],
});
