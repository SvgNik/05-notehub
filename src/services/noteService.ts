import axios from "axios";
import type { Note, CreateNoteData } from "../types/note";
import type { FetchNotesResponse } from "../types/api";
const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

noteApi.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { data } = await noteApi.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
};

export const createNote = async (newNote: CreateNoteData): Promise<Note> => {
  const { data } = await noteApi.post<Note>("/notes", newNote);
  return data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);
  return data;
};
