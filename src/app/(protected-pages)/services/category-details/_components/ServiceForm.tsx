'use client'

import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'
import Switcher from '@/components/ui/Switcher'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import Input from '@/components/ui/Input'
import {useTranslations} from 'next-intl'

const servicesOptions = [
    { value: 'Services 1', label: 'Services 1' },
    { value: 'Services 2', label: 'Services 2' },
]

const tip = (
    <Tooltip title="Field info">
        <HiOutlineQuestionMarkCircle className="text-lg cursor-pointer ml-1" />
    </Tooltip>
)

const ServiceForm = () => {
    const t = useTranslations();

    return (
        <>
            <Card className="mb-4">
                <FormItem
                    label={t('protected.categoryDetails.categoryName')}
                    asterisk={true}
                >
                    {/* <Controller
                        name="firstName"
                        render={({ field }) => ( */}
                            <Input
                                type="text"
                                autoComplete="off"
                                // {...field}
                            />
                        {/* )}
                    /> */}
                </FormItem>
                
                <FormItem
                    label={t('protected.categoryDetails.description')}
                    asterisk={true}
                >
                    {/* <Controller
                        name="firstName"
                        render={({ field }) => ( */}
                            <Input
                                type="text"
                                autoComplete="off"
                                textArea
                                // {...field}
                            />
                        {/* )}
                    /> */}
                </FormItem>
                
                <FormItem
                        label={t('protected.categoryDetails.addServicesToTheCategory')}
                        extra={tip}
                    >
                    {/* <Controller
                        name="firstName"
                        render={({ field }) => ( */}
                            <Select
                                isMulti
                                instanceId="multi-selection"
                                placeholder="Please Select"
                                options={servicesOptions}
                            />
                        {/* )}
                    /> */}
                </FormItem>
                
                <FormItem
                    label={t('protected.categoryDetails.showCategory')}
                    layout="horizontal"
                    className="justify-self-end whitespace-nowrap gap-4"
                >
                    {/* <Controller
                        name="firstName"
                        render={({ field }) => ( */}
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Switcher defaultChecked />
                            </div>
                        {/* )}
                    /> */}
                </FormItem>
            </Card>
        </>
    )
}

export default ServiceForm
