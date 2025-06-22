import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      selectedTypes: {},
      setSelectedTypes: (updater) =>
        set((state) => ({
          selectedTypes:
            typeof updater === "function"
              ? updater(state.selectedTypes)
              : updater,
        })),
    }),
    {
      name: "pokenon-types",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
