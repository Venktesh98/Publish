import { ReactNode } from "react";
import { ICommentsPayload } from "./commentsInterface";

export interface IModalWindowProps {
  title: string;
  isModalOpen: boolean;
  handleCancel: () => void;
  footerButtons?: () => ReactNode | undefined;
  width?: number;
  children: ReactNode;
}

export interface INewPostPayload {
  title: string;
  description: string;
  descriptionHtmlText: string;
  category?: string;
  photo?: string;
}

export interface IEditorProps {
  newPost: INewPostPayload | ICommentsPayload;
  setNewPost: (description: INewPostPayload | ICommentsPayload) => void;
  setValue: (content: string) => void;
  value: string;
}

