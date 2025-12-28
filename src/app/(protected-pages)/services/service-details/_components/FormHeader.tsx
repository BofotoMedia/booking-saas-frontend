'use client'

import Segment from '@/components/ui/Segment'
import { useRouter } from 'next/navigation'
import {useTranslations} from 'next-intl'

type SettingType = 'generalSettings' | 'advancedSettings'

type FormHeaderProps = {
    settingType: SettingType
    onSettingTypeChange: (val: SettingType) => void
}

const FormHeader = ({ settingType, onSettingTypeChange }: FormHeaderProps) => {
    const t = useTranslations();

    return (
        <>
            <div className="flex items-center justify-between gap-2 print:hidden">
                <h3>{t('protected.serviceDetails.serviceDetails')}</h3>
                <div className="flex items-center gap-2">
                    <Segment
                        size="sm"
                        value={settingType}
                        onChange={(value) => onSettingTypeChange(value as SettingType)}
                    >
                        <Segment.Item value="generalSettings" type="button">{t('protected.serviceDetails.generalSettings')}</Segment.Item>
                        <Segment.Item value="advancedSettings" type="button">{t('protected.serviceDetails.advancedSettings')}</Segment.Item>
                    </Segment>
                </div>
            </div>
        </>
    )
}

export default FormHeader