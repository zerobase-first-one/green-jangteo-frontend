import { atom } from 'recoil';

export interface IBoard {
  postId: string;
  username: string;
  subject: string;
  createdAt: string;
  modifiedAt?: string;
  viewCount: number;
}

export const postState = atom<IBoard[]>({
  key: 'postState',
  default: [],
});
