export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    en: () => import('dayjs/locale/en'),
    id: () => import('dayjs/locale/id'),
    sv: () => import('dayjs/locale/sv'),
}
