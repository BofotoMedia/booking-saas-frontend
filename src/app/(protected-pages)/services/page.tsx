import ServicesHeader from './_components/ServicesHeader'
import ServicesList from './_components/ServicesList'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import getServices from '@/server/actions/getServices'

export default async function ServicesPage() {
    const data = await getServices()

    return (
        <AdaptiveCard className="p-6">
            <ServicesHeader />
            <ServicesList data={data} />
        </AdaptiveCard>
    )
}