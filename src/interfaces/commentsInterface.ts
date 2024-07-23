import { IUserDetails } from "./postsInterface";

export interface ICommentProps {
  setIsCommentModalOpen: (arg0: boolean) => void;
  isCommentModalOpen: boolean;
  postId: string;
}

export interface ICommentsPayload {
  description: string;
}

export interface IAllComments {
  _id: string;
  post: string;
  user: IUserDetails;
  description: string;
  descriptionHtml: string;
  createdAt: string;
  updatedAt: string;
}
