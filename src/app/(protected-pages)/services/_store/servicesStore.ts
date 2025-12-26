import { create } from 'zustand'
import type { ServiceCategory, ServiceItem, Members } from '../types'

export type ServicesState = {
    categories: ServiceCategory[]
    disabledServices: ServiceItem[]
    serviceAddons: string[]
    bookingAddons: string[]
    additionalInfo: string[]
    boardMembers: Members
    allMembers: Members
}

type ServicesAction = {
    updateCategories: (payload: ServiceCategory[]) => void
    updateDisabledServices: (payload: ServiceItem[]) => void
    updateServiceAddons: (payload: string[]) => void
    updateBookingAddons: (payload: string[]) => void
    updateAdditionalInfo: (payload: string[]) => void
    updateBoardMembers: (payload: Members) => void
    updateAllMembers: (payload: Members) => void
    toggleCategoryExpansion: (categoryId: string) => void
    addAddonToService: (categoryId: string, serviceId: string, addon: string) => void
    removeAddonFromService: (categoryId: string, serviceId: string, addon: string) => void
    addAddonToCategory: (categoryId: string, addon: string) => void
    moveServiceBetweenCategories: (
        sourceCategory: string,
        destCategory: string,
        sourceIndex: number,
        destIndex: number
    ) => void
    moveServiceToDisabled: (categoryId: string, serviceIndex: number) => void
    moveServiceFromDisabled: (categoryId: string, disabledIndex: number, position: number) => void
}

const initialState: ServicesState = {
    categories: [],
    disabledServices: [],
    serviceAddons: [],
    bookingAddons: [],
    additionalInfo: [],
    boardMembers: [],
    allMembers: [],
}

export const useServicesStore = create<ServicesState & ServicesAction>(
    (set) => ({
        ...initialState,
        updateCategories: (payload) => set(() => ({ categories: payload })),
        updateDisabledServices: (payload) => set(() => ({ disabledServices: payload })),
        updateServiceAddons: (payload) => set(() => ({ serviceAddons: payload })),
        updateBookingAddons: (payload) => set(() => ({ bookingAddons: payload })),
        updateAdditionalInfo: (payload) => set(() => ({ additionalInfo: payload })),
        updateBoardMembers: (payload) => set(() => ({ boardMembers: payload })),
        updateAllMembers: (payload) => set(() => ({ allMembers: payload })),
        
        toggleCategoryExpansion: (categoryId) =>
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat.id === categoryId
                        ? { ...cat, expanded: !cat.expanded }
                        : cat
                ),
            })),
        
        addAddonToService: (categoryId, serviceId, addon) =>
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat.id === categoryId
                        ? {
                              ...cat,
                              items: cat.items.map((item) =>
                                  item.id === serviceId
                                      ? {
                                            ...item,
                                            addons: [...item.addons, addon],
                                        }
                                      : item
                              ),
                          }
                        : cat
                ),
            })),
        
        removeAddonFromService: (categoryId, serviceId, addon) =>
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat.id === categoryId
                        ? {
                              ...cat,
                              items: cat.items.map((item) =>
                                  item.id === serviceId
                                      ? {
                                            ...item,
                                            addons: item.addons.filter(
                                                (a) => a !== addon
                                            ),
                                        }
                                      : item
                              ),
                          }
                        : cat
                ),
            })),
        
        addAddonToCategory: (categoryId, addon) =>
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat.id === categoryId
                        ? {
                              ...cat,
                              items: cat.items.map((item) => ({
                                  ...item,
                                  addons: item.addons.includes(addon)
                                      ? item.addons
                                      : [...item.addons, addon],
                              })),
                          }
                        : cat
                ),
            })),
        
        moveServiceBetweenCategories: (
            sourceCategory,
            destCategory,
            sourceIndex,
            destIndex
        ) =>
            set((state) => {
                const newCategories = [...state.categories]
                const sourceCat = newCategories.find(
                    (c) => c.id === sourceCategory
                )
                const destCat = newCategories.find(
                    (c) => c.id === destCategory
                )

                if (!sourceCat || !destCat) return state

                const [movedItem] = sourceCat.items.splice(sourceIndex, 1)
                destCat.items.splice(destIndex, 0, movedItem)

                return { categories: newCategories }
            }),
        
        moveServiceToDisabled: (categoryId, serviceIndex) =>
            set((state) => {
                const newCategories = [...state.categories]
                const category = newCategories.find((c) => c.id === categoryId)
                
                if (!category) return state
                
                const [movedItem] = category.items.splice(serviceIndex, 1)
                
                return {
                    categories: newCategories,
                    disabledServices: [...state.disabledServices, movedItem],
                }
            }),
        
        moveServiceFromDisabled: (categoryId, disabledIndex, position) =>
            set((state) => {
                const newCategories = [...state.categories]
                const category = newCategories.find((c) => c.id === categoryId)
                const newDisabled = [...state.disabledServices]
                
                if (!category) return state
                
                const [movedItem] = newDisabled.splice(disabledIndex, 1)
                category.items.splice(position, 0, movedItem)
                
                return {
                    categories: newCategories,
                    disabledServices: newDisabled,
                }
            }),
    })
)