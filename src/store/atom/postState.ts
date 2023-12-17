import { atom } from 'recoil';

export interface IBoard {
  postId: string;
  username: string;
  subject: string;
  createdAt: string;
  modifiedAt?: string;
  commentCount: number;
}

export interface IBoardListForm {
  content: IBoard[];
}

export const postState = atom<IBoardListForm>({
  key: 'postState',
  default: { content: [] },
});
