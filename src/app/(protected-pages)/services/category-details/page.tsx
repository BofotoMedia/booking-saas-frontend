'use client'

import {useTranslations} from 'next-intl'
import ContainerForm from './_components/ContainerForm'
import ServiceForm from './_components/ServiceForm'
import SettingForm from './_components/SettingForm'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import { TbTrash } from 'react-icons/tb'

export default function Page() {
    const t = useTranslations();
    
    return (
        <ContainerForm>
            <Container>
                <div className="flex items-center justify-between px-8">
                    <span></span>
                    <div className="flex items-center">
                        <Button
                            className="ltr:mr-3 rtl:ml-3"
                            type="button"
                            customColorClass={() =>
                                'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                            }
                            icon={<TbTrash />}
                        >
                            Discard
                        </Button>
                        <Button
                            variant="solid"
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </Container>
        </ContainerForm>
    )
}