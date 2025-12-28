import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { lazy } from 'react'

export const protectedRoutes: Routes = {
    '/home': {
        key: 'home',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/calendar': {
        key: 'calendar',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/services/overview': {
        key: 'services',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
            },
        },
    },
    '/services/service-details': {
        key: 'service-details',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            header: {
                description:
                    'Manage Service details.',
                contained: true,
            },
            footer: false,
        },
    },
    '/services/category-details': {
        key: 'category-details',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            header: {
                contained: true,
                title: lazy(
                    () =>
                        import(
                            '@/app/(protected-pages)/services/category-details/_components/FormHeader'
                        ),
                )
            },
            footer: false,
        },
    },
}

export const publicRoutes: Routes = {}

export const authRoutes = authRoute
