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
    '/services': {
        key: 'services',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
            },
        },
    },
}

export const publicRoutes: Routes = {}

export const authRoutes = authRoute
