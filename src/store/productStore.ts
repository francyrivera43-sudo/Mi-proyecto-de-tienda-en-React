import { create } from 'zustand';

interface ProductState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
