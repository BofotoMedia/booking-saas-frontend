'use client'

import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Tooltip from '@/components/ui/Tooltip'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import {useTranslations} from 'next-intl'

const tip = (
    <Tooltip title="Field info">
        <HiOutlineQuestionMarkCircle className="text-lg cursor-pointer ml-1" />
    </Tooltip>
)

const PriceForm = () => {
    const t = useTranslations();

    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4">
                <div className="md:col-span-1 xl:col-span-1 order-1 xl:order-1">
                    <FormItem
                        label={t('protected.serviceDetails.price')}
                        extra={tip}
                        asterisk={true}
                    >
                    </FormItem>
                </div>
                <div className="md:col-span-2 xl:col-span-1 order-2 xl:order-2">
                    <FormItem
                        label=""
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    size="lg" 
                                    placeholder="A"
                                    // {...field}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
                <div className="md:col-span-2 xl:col-span-1 order-3 xl:order-3">
                    <FormItem
                        label=""
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    size="lg" 
                                    placeholder="B"
                                    // {...field}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
                <div className="md:col-span-2 xl:col-span-1 order-4 xl:order-4">
                    <FormItem
                        label=""
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    size="lg" 
                                    placeholder="C"
                                    // {...field}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
            </div>
        </Card>
    )
}

export default PriceForm
