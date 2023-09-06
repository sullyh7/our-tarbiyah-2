import { create } from "zustand"; 

interface DialogState {
  isLoginDialogOpen: boolean;
  isSignUpDialogOpen: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  openSignUpDialog: () => void;
  closeSignUpDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isLoginDialogOpen: false,
  isSignUpDialogOpen: false,
  
  openLoginDialog: () => set({ isLoginDialogOpen: true, isSignUpDialogOpen: false }),
  closeLoginDialog: () => set({ isLoginDialogOpen: false }),
  
  openSignUpDialog: () => set({ isSignUpDialogOpen: true, isLoginDialogOpen: false }),
  closeSignUpDialog: () => set({ isSignUpDialogOpen: false }),
}));
