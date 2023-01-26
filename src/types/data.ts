export interface TComments {
  id: number | string;
  content: string;
  createdAt: string;
  score: number | string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };

  replies: any;
}

export interface newComment extends TComments {
  replies: any;
}

export interface TUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
