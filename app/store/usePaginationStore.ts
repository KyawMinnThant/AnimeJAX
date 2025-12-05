import { create } from "zustand";

interface PaginationState {
  page: number;
  lastPage: number;

  setPage: (page: number) => void;
  setLastPage: (lastPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  page: 1,
  lastPage: 0, // dynamic from API

  setPage: (page) => set({ page }),
  setLastPage: (lastPage) => set({ lastPage }),

  nextPage: () => {
    const { page, lastPage } = get();
    if (page < lastPage) set({ page: page + 1 });
  },

  prevPage: () => {
    const { page } = get();
    if (page > 1) set({ page: page - 1 });
  },
}));
