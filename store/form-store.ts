import { create } from "zustand"

interface FormData {
  name: string
  email: string
  service: string
  isWedding: boolean
}

interface FormStore {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
}

const initialState: FormData = {
  name: "",
  email: "",
  service: "",
  isWedding: false,
}

export const useFormStore = create<FormStore>((set) => ({
  formData: initialState,
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ formData: initialState }),
}))
