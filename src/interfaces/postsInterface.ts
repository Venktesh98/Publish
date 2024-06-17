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
  comments: string[];
  _id: string;
  title: string;
  description: string;
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
}

export interface IAllPostsProps {
  allPosts: IAllPosts[];
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
