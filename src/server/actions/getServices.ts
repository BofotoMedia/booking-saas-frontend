import { servicesData } from '@/mock/data/servicesData'

async function getServices() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return servicesData as any
}

export default getServices
