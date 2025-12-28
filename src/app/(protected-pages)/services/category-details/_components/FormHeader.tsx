'use client'

import {useTranslations} from 'next-intl'

const FormHeader = () => {
    const t = useTranslations();

    return <h3>{t('protected.categoryDetails.categoryDetails')}</h3>
}

export default FormHeader
