import { ReactNode } from "react";

export interface IModalWindowProps {
  title: string;
  isModalOpen: boolean;
  handleCancel: () => void;
  footerButtons: () => ReactNode;
  width?: number;
  children: ReactNode;
}

export interface INewPostPayload {
  title: string;
  description: string;
  descriptionHtmlText: string;
  category?: string;
  image?: string;
}

export interface IEditorProps {
  newPost: INewPostPayload;
  setNewPost: (description: INewPostPayload) => void;
  setValue: (content: string) => void;
  value: string;
}
