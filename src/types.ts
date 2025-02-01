export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  date: string;
  type: 'news' | 'guide';
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}