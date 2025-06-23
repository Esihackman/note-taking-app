export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isAchieved: boolean;
  createdAt: Date;
  
}