export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}
