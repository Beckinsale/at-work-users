import { create } from 'zustand';

interface UserStore {
  archivedUserIds: number[];
  hiddenUserIds: number[];
  archiveUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
  hideUser: (id: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  archivedUserIds: [],
  hiddenUserIds: [],

  archiveUser: (id) =>
    set((state) => ({
      archivedUserIds: [...state.archivedUserIds, id],
    })),

  unarchiveUser: (id) =>
    set((state) => ({
      archivedUserIds: state.archivedUserIds.filter((uid) => uid !== id),
    })),

  hideUser: (id) =>
    set((state) => ({
      hiddenUserIds: [...state.hiddenUserIds, id],
    })),
}));
