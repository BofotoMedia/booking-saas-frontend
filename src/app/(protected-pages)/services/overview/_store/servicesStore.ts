import { create } from 'zustand'
import type { ServiceCategory, ServiceItem, Members, AddonItem } from '../types'

export type ServicesState = {
    categories: ServiceCategory[]
    disabledServices: ServiceItem[]
    serviceAddons: AddonItem[]
    bookingAddons: AddonItem[]
    additionalInfo: AddonItem[]
    boardMembers: Members
    allMembers: Members
}

type ServicesAction = {
    updateCategories: (payload: ServiceCategory[]) => void
    updateDisabledServices: (payload: ServiceItem[]) => void
    updateServiceAddons: (payload: AddonItem[]) => void
    updateBookingAddons: (payload: AddonItem[]) => void
    updateAdditionalInfo: (payload: AddonItem[]) => void
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
    updateServiceAddon: (addonId: string, updatedAddon: Partial<AddonItem>) => void
    deleteServiceAddon: (addonId: string) => void
    updateBookingAddon: (addonId: string, updatedAddon: Partial<AddonItem>) => void
    deleteBookingAddon: (addonId: string) => void
    updateAdditionalInfoItem: (addonId: string, updatedAddon: Partial<AddonItem>) => void
    deleteAdditionalInfoItem: (addonId: string) => void
    updateService: (categoryId: string, serviceId: string, updatedService: Partial<ServiceItem>) => void
    deleteService: (categoryId: string, serviceId: string) => void
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
        
        updateServiceAddon: (addonId, updatedAddon) =>
            set((state) => ({
                serviceAddons: state.serviceAddons.map((addon) =>
                    addon.id === addonId ? { ...addon, ...updatedAddon } : addon
                ),
            })),

        deleteServiceAddon: (addonId) =>
            set((state) => ({
                serviceAddons: state.serviceAddons.filter((addon) => addon.id !== addonId),
            })),

        updateBookingAddon: (addonId, updatedAddon) =>
            set((state) => ({
                bookingAddons: state.bookingAddons.map((addon) =>
                    addon.id === addonId ? { ...addon, ...updatedAddon } : addon
                ),
            })),

        deleteBookingAddon: (addonId) =>
            set((state) => ({
                bookingAddons: state.bookingAddons.filter((addon) => addon.id !== addonId),
            })),

        updateAdditionalInfoItem: (addonId, updatedAddon) =>
            set((state) => ({
                additionalInfo: state.additionalInfo.map((addon) =>
                    addon.id === addonId ? { ...addon, ...updatedAddon } : addon
                ),
            })),

        deleteAdditionalInfoItem: (addonId) =>
            set((state) => ({
                additionalInfo: state.additionalInfo.filter((addon) => addon.id !== addonId),
            })),

        updateService: (categoryId, serviceId, updatedService) =>
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat.id === categoryId
                        ? {
                            ...cat,
                            items: cat.items.map((item) =>
                                item.id === serviceId
                                    ? { ...item, ...updatedService }
                                    : item
                            ),
                        }
                        : cat
                ),
            })),

        deleteService: (categoryId, serviceId) =>
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat.id === categoryId
                        ? {
                            ...cat,
                            items: cat.items.filter((item) => item.id !== serviceId),
                        }
                        : cat
                ),
            })),
    })
)