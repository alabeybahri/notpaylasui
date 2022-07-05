export interface NoteProfile {
  id: number;
  title: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string | null;
  updatedBy: number | null;
  isDeleted: boolean;
  isActive: boolean;
  categoryID: number;
  noteValue: string | null;
  name: string | null;
  fileValue: string | null;
  fileType: string | null;
}
