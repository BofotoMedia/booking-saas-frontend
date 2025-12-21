import { create } from 'zustand'
import type { Category, Service, ServicesData } from '../types'

type ServicesState = {
    categories: Category[]
    disabledServices: Service[]
    serviceAddons: string[]
    bookingAddons: string[]
    additionalInfo: string[]
}

type ServicesActions = {
    setServicesData: (data: ServicesData) => void
    addAddonToService: (categoryId: string, serviceId: string, addon: string) => void
    addAddonToCategory: (categoryId: string, addon: string) => void
    removeAddonFromService: (categoryId: string, serviceId: string, addon: string) => void
    removeAddonFromCategory: (categoryId: string, addon: string) => void
    moveServiceToDisabled: (categoryId: string, serviceId: string) => void
    moveServiceToCategory: (serviceId: string, targetCategoryId: string) => void
    addCategory: (category: Omit<Category, 'id'>) => void
    updateCategory: (categoryId: string, updates: Partial<Category>) => void
    deleteCategory: (categoryId: string) => void
    addService: (categoryId: string, service: Omit<Service, 'id'>) => void
    updateService: (categoryId: string, serviceId: string, updates: Partial<Service>) => void
    deleteService: (categoryId: string, serviceId: string) => void
    addServiceAddon: (addon: string) => void
    updateServiceAddon: (oldAddon: string, newAddon: string) => void
    deleteServiceAddon: (addon: string) => void
    addBookingAddon: (addon: string) => void
    updateBookingAddon: (oldAddon: string, newAddon: string) => void
    deleteBookingAddon: (addon: string) => void
    addAdditionalInfo: (info: string) => void
    updateAdditionalInfo: (oldInfo: string, newInfo: string) => void
    deleteAdditionalInfo: (info: string) => void
}

const initialState: ServicesState = {
    categories: [],
    disabledServices: [],
    serviceAddons: [],
    bookingAddons: [],
    additionalInfo: [],
}

const generateId = (prefix: string) => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const useServicesStore = create<ServicesState & ServicesActions>((set) => ({
    ...initialState,
    
    setServicesData: (data) => set(data),
    
    addAddonToService: (categoryId, serviceId, addon) => set((state) => {
        // Check if it's for a disabled service
        if (categoryId === 'disabled') {
            return {
                disabledServices: state.disabledServices.map((srv) =>
                    srv.id === serviceId
                        ? { 
                            ...srv, 
                            addons: [...(srv.addons || []), addon].filter((v, i, a) => a.indexOf(v) === i)
                        }
                        : srv
                ),
            }
        }

        return {
            categories: state.categories.map((cat) => 
                cat.id === categoryId 
                    ? {
                        ...cat,
                        services: cat.services.map((srv) =>
                            srv.id === serviceId
                                ? { 
                                    ...srv, 
                                    addons: [...(srv.addons || []), addon].filter((v, i, a) => a.indexOf(v) === i)
                                }
                                : srv
                        ),
                    }
                    : cat
            ),
        }
    }),
    
    addAddonToCategory: (categoryId, addon) => set((state) => ({
        categories: state.categories.map((cat) => 
            cat.id === categoryId 
                ? {
                    ...cat,
                    addons: [...(cat.addons || []), addon].filter((v, i, a) => a.indexOf(v) === i),
                    services: cat.services.map((srv) => ({
                        ...srv,
                        addons: [...(srv.addons || []), addon].filter((v, i, a) => a.indexOf(v) === i),
                    })),
                }
                : cat
        ),
    })),
    
    removeAddonFromService: (categoryId, serviceId, addon) => set((state) => {
        const newCategories = state.categories.map((cat) => {
            if (cat.id !== categoryId) return cat

            const updatedServices = cat.services.map((srv) =>
                srv.id === serviceId
                    ? { ...srv, addons: (srv.addons || []).filter((a) => a !== addon) }
                    : srv
            )

            // Check if any service in this category still has this addon
            const hasAddonInServices = updatedServices.some((srv) => 
                (srv.addons || []).includes(addon)
            )

            // If no service has this addon, remove it from category addons too
            const updatedCategoryAddons = hasAddonInServices 
                ? cat.addons 
                : (cat.addons || []).filter((a) => a !== addon)

            return {
                ...cat,
                addons: updatedCategoryAddons,
                services: updatedServices,
            }
        })

        return { categories: newCategories }
    }),
    
    removeAddonFromCategory: (categoryId, addon) => set((state) => ({
        categories: state.categories.map((cat) => 
            cat.id === categoryId 
                ? {
                    ...cat,
                    addons: (cat.addons || []).filter((a) => a !== addon),
                    services: cat.services.map((srv) => ({
                        ...srv,
                        addons: (srv.addons || []).filter((a) => a !== addon),
                    })),
                }
                : cat
        ),
    })),

    moveServiceToDisabled: (categoryId, serviceId) => set((state) => {
        let serviceToMove: Service | undefined

        const updatedCategories = state.categories.map((cat) => {
            if (cat.id !== categoryId) return cat

            const service = cat.services.find((s) => s.id === serviceId)
            if (service) {
                serviceToMove = { ...service, disabled: true, noCategory: false }
            }

            return {
                ...cat,
                services: cat.services.filter((s) => s.id !== serviceId),
                count: cat.services.filter((s) => s.id !== serviceId).length,
            }
        })

        if (!serviceToMove) return state

        return {
            categories: updatedCategories,
            disabledServices: [...state.disabledServices, serviceToMove],
        }
    }),

    moveServiceToCategory: (serviceId, targetCategoryId) => set((state) => {
        let serviceToMove: Service | undefined

        // Check if service is in disabled services
        const disabledService = state.disabledServices.find((s) => s.id === serviceId)
        
        if (disabledService) {
            serviceToMove = { 
                ...disabledService, 
                disabled: false, 
                noCategory: false 
            }

            const updatedCategories = state.categories.map((cat) => {
                if (cat.id !== targetCategoryId) return cat

                return {
                    ...cat,
                    services: [...cat.services, serviceToMove!],
                    count: cat.services.length + 1,
                }
            })

            return {
                categories: updatedCategories,
                disabledServices: state.disabledServices.filter((s) => s.id !== serviceId),
            }
        }

        // Service is in another category
        let sourceCategoryId: string | undefined

        const updatedCategories = state.categories.map((cat) => {
            const service = cat.services.find((s) => s.id === serviceId)
            
            if (service) {
                sourceCategoryId = cat.id
                serviceToMove = service

                if (cat.id === targetCategoryId) {
                    return cat // Same category, no change
                }

                return {
                    ...cat,
                    services: cat.services.filter((s) => s.id !== serviceId),
                    count: cat.services.filter((s) => s.id !== serviceId).length,
                }
            }

            if (cat.id === targetCategoryId && serviceToMove) {
                return {
                    ...cat,
                    services: [...cat.services, serviceToMove],
                    count: cat.services.length + 1,
                }
            }

            return cat
        })

        return { categories: updatedCategories }
    }),

    // Category CRUD
    addCategory: (category) => set((state) => ({
        categories: [
            ...state.categories,
            {
                ...category,
                id: generateId('cat'),
            },
        ],
    })),

    updateCategory: (categoryId, updates) => set((state) => ({
        categories: state.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, ...updates } : cat
        ),
    })),

    deleteCategory: (categoryId) => set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== categoryId),
    })),

    // Service CRUD
    addService: (categoryId, service) => set((state) => ({
        categories: state.categories.map((cat) =>
            cat.id === categoryId
                ? {
                    ...cat,
                    services: [
                        ...cat.services,
                        {
                            ...service,
                            id: generateId('srv'),
                        },
                    ],
                    count: cat.services.length + 1,
                }
                : cat
        ),
    })),

    updateService: (categoryId, serviceId, updates) => set((state) => ({
        categories: state.categories.map((cat) =>
            cat.id === categoryId
                ? {
                    ...cat,
                    services: cat.services.map((srv) =>
                        srv.id === serviceId ? { ...srv, ...updates } : srv
                    ),
                }
                : cat
        ),
    })),

    deleteService: (categoryId, serviceId) => set((state) => ({
        categories: state.categories.map((cat) =>
            cat.id === categoryId
                ? {
                    ...cat,
                    services: cat.services.filter((srv) => srv.id !== serviceId),
                    count: cat.services.filter((srv) => srv.id !== serviceId).length,
                }
                : cat
        ),
    })),

    // Addon CRUD
    addServiceAddon: (addon) => set((state) => ({
        serviceAddons: [...state.serviceAddons, addon],
    })),

    updateServiceAddon: (oldAddon, newAddon) => set((state) => ({
        serviceAddons: state.serviceAddons.map((a) => (a === oldAddon ? newAddon : a)),
        categories: state.categories.map((cat) => ({
            ...cat,
            addons: (cat.addons || []).map((a) => (a === oldAddon ? newAddon : a)),
            services: cat.services.map((srv) => ({
                ...srv,
                addons: (srv.addons || []).map((a) => (a === oldAddon ? newAddon : a)),
            })),
        })),
    })),

    deleteServiceAddon: (addon) => set((state) => ({
        serviceAddons: state.serviceAddons.filter((a) => a !== addon),
        categories: state.categories.map((cat) => ({
            ...cat,
            addons: (cat.addons || []).filter((a) => a !== addon),
            services: cat.services.map((srv) => ({
                ...srv,
                addons: (srv.addons || []).filter((a) => a !== addon),
            })),
        })),
    })),

    addBookingAddon: (addon) => set((state) => ({
        bookingAddons: [...state.bookingAddons, addon],
    })),

    updateBookingAddon: (oldAddon, newAddon) => set((state) => ({
        bookingAddons: state.bookingAddons.map((a) => (a === oldAddon ? newAddon : a)),
    })),

    deleteBookingAddon: (addon) => set((state) => ({
        bookingAddons: state.bookingAddons.filter((a) => a !== addon),
    })),

    addAdditionalInfo: (info) => set((state) => ({
        additionalInfo: [...state.additionalInfo, info],
    })),

    updateAdditionalInfo: (oldInfo, newInfo) => set((state) => ({
        additionalInfo: state.additionalInfo.map((i) => (i === oldInfo ? newInfo : i)),
    })),

    deleteAdditionalInfo: (info) => set((state) => ({
        additionalInfo: state.additionalInfo.filter((i) => i !== info),
    })),
}))