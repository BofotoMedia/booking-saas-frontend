import ServicesProvider from './_components/ServicesProvider'
import ServicesHeader from './_components/ServicesHeader'
import AddonsHeader from './_components/AddonsHeader'
import ServiceList from './_components/ServiceList'
import AddonsList from './_components/AddonsList'
import getServices from '@/server/actions/getServices'
import getSrcumboardMembers from '@/server/actions/getSrcumboardMembers'
import { serviceAddons, bookingAddons, additionalInfo } from '@/mock/data/servicesData'

export default async function Page() {
    const data = await getServices()
    const projectMembers = await getSrcumboardMembers()

    return (
        <ServicesProvider 
            data={data} 
            projectMembers={projectMembers}
            serviceAddons={serviceAddons}
            bookingAddons={bookingAddons}
            additionalInfo={additionalInfo}
        >
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="gap-4 flex flex-col flex-auto">
                    <ServicesHeader />
                    <ServiceList />
                </div>
                <div className="lg:w-[320px] xl:w-[420px] gap-4 flex flex-col">
                    <AddonsHeader />
                    <AddonsList />
                </div>
            </div>
        </ServicesProvider>
    )
}