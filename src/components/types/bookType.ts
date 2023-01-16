export type BookType = {
  id: string;
  title: string;
  description: string;
  author: string;
  rating: number;
  year: string;
};

export type NewBookType = {
  title: string;
  author: string;
  year: string;
  rating?: number;
  description: string;
};
