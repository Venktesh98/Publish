export interface ISubmitSignupFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface ILoginFormValues {
  userName: string;
  password: string;
}

export interface IFileDetails {
  uid: string;
  lastModified: string;
  lastModifiedDate: string;
  name: string;
  size: string;
  type: string;
  webkitRelativePath: string;
}

export interface IUpdateUserFields {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ICategoryDetails {
  _id: string;
  title: string;
  user: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryPayload {
  title: string;
}
