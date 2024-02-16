import { atom } from 'recoil';

export interface IForm {
  username: string;
  city: string;
  detailedAddress: string;
  street: string;
  zipcode: string;
  storeName?: string;
  isLoading: boolean;
  phone: string;
  fullName: string;
}

const initialData: IForm | null = JSON.parse(
  localStorage.getItem('userData') || 'null',
);

export const userDataState = atom<IForm | null>({
  key: 'userDataState',
  default: initialData || {
    username: '',
    city: '',
    detailedAddress: '',
    street: '',
    zipcode: '',
    isLoading: true,
    phone: '',
    fullName: '',
  },
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem('userData', JSON.stringify(newValue));
      });
    },
  ],
});
