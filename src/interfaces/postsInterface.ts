import { IAllComments } from "./commentsInterface";

interface ICategory {
  _id: string;
  title: string;
}

export interface IUserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isAdmin: boolean;
  viewers: string[];
  followers: string[];
  following: string[];
  posts: string[];
  blockedUsers: string[];
  userAward: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: string[];
  fullName: string;
  initials: string;
  postCount: string;
  followersCount: string;
  followingCount: string;
  viewersCount: string;
  blockedUsersCount: string;
  id: string;
  profilePhoto: string;
}

export interface IAllPosts {
  numOfViews: string[];
  likes: string[];
  disLikes: string[];
  comments: IAllComments[];
  _id: string;
  title: string;
  description: string;
  descriptionHtmlText?: string;
  category: ICategory;
  user: IUserDetails;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  viewsCount: number;
  likesCount: number;
  disLikesCount: number;
  likesPercentage: string;
  disLikesPercentage: string;
  daysAgo: string;
  photo: string;
  bookmarkedUser: string[]
}

export interface IAllPostsProps {
  allPosts: IAllPosts[];
  isLoading: boolean;
}

export interface ISearchPayload {
  searchedText: string;
}

export interface ISearchedPostResults {
  id: string;
  title: string;
  fullName: string;
  category: ICategory;
  createdAt: string;
}

export interface IPopConfirmProps {
  title: string;
  description: string;
  handleConfirm: () => void;
  handleConfirmCancel: () => void;
  children: React.ReactNode;
}
