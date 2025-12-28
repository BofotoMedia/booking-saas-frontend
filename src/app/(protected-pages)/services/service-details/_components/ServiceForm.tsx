'use client'

import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import {useTranslations} from 'next-intl'
import PriceForm from './PriceForm'

const ServiceForm = () => {
    const t = useTranslations();

    return (
        <>
            <Card className="mb-4">
                <FormItem
                    label={t('protected.serviceDetails.serviceName')}
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
                    label={t('protected.serviceDetails.description')}
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
            </Card>

            <PriceForm />
        </>
    )
}

export default ServiceForm
