import { create } from 'zustand';

type Toast = { id: number; message: string };

type ToastState = {
  toasts: Toast[];
  add: (message: string) => void;
  remove: (id: number) => void;
};

let nextId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add(message) {
    const id = ++nextId;
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));
    return id;
  },
  remove(id) {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
