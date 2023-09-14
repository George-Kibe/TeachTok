export type Question = {
    id: string;
    type: string;
    playlist: string;
    description: number;
    image: string;
    question: string;
    options: Option[];
    user: User;
  };

  export type Option = {
    id: string;
    answer: string;
  }

  export type User = {
    name: string;
    avatar: string;
  }