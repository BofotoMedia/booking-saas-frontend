'use client'

import { useState } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import FormHeader from './FormHeader'
import ServiceForm from './ServiceForm'
import SettingForm from './SettingForm'
import AdditionalForm from './AdditionalForm'
import type { CommonProps } from '@/@types/common'

type SettingType = 'generalSettings' | 'advancedSettings'

type ContainerFormProps = {
} & CommonProps

const ContainerForm = (props: ContainerFormProps) => {
    const {
        children,
    } = props

    const [settingType, setSettingType] = useState<SettingType>('generalSettings')

    return (
        <>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
            >
                <Container>
                    <div className="flex flex-col gap-4">
                        <FormHeader
                            settingType={settingType}
                            onSettingTypeChange={setSettingType} 
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                            <div className="md:col-span-1 xl:col-span-1 order-1">
                                <ServiceForm />
                            </div>
                            <div className="md:col-span-2 xl:col-span-1 order-2 xl:order-2">
                                <SettingForm settingType={settingType} />
                            </div>
                        </div>
                        <AdditionalForm />
                    </div>
                </Container>
            </Form>
            <BottomStickyBar>{children}</BottomStickyBar>
        </>
    )
}

export default ContainerForm
