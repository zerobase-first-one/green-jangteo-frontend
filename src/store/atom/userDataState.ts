import { atom } from 'recoil';

export interface IAddressDto {
  city: string;
  detailedAddress: string;
  street: string;
  zipcode: string;
}

export interface IForm {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  phone: string;
  addressDto: IAddressDto;
  storeName?: string;
  roles: string[];
}

export const userDataState = atom<IForm | null>({
  key: 'userDataState',
  default: null,
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem('userData', JSON.stringify(newValue));
      });
    },
  ],
});
