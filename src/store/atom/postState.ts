import { atom } from "recoil";

export interface IBoardListForm {
  content: {
    postId: string;
    username: string;
    title: string;
    createdAt: string;
    modifiedAt?: string;
    commentCount: number;
  }[];
}

export const postState = atom<IBoardListForm>({
  key: "postState",
  default: { content: [] },
});
