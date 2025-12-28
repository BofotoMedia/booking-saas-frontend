'use client'

import Button from '@/components/ui/Button'
import { TbPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import {useTranslations} from 'next-intl'

const ServicesHeader = () => {
    const t = useTranslations();

    const router = useRouter()

    const redirectServiceDetail = () => {
        router.push(`/services/service-details`)
    }

    const redirectCategoryDetail = () => {
        router.push(`/services/category-details`)
    }

    return (
        <>
            <div className="flex items-center justify-between gap-2 print:hidden">
                <h3>{t('protected.services.services')}</h3>
                <div className="flex items-center gap-2">
                    <Button
                        variant="solid"
                        icon={<TbPlus />}
                        onClick={redirectCategoryDetail}
                    >
                        {t('protected.services.addCategory')}
                    </Button>
                    <Button
                        variant="default"
                        icon={<TbPlus />}
                        onClick={redirectServiceDetail}
                    >
                        {t('protected.services.addService')}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ServicesHeader