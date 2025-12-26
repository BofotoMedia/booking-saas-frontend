import { 
    LuWarehouse,
    LuCalendarMinus2,
    LuHandHeart,
    LuBriefcaseBusiness,
    LuUsers,
    LuFilePlus,
    LuCircleUser,
    LuWallet,
    LuBuilding,
    LuArrowRightFromLine,
    LuCog,
} from "react-icons/lu";

import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <LuWarehouse />,
    calendar: <LuCalendarMinus2 />,
    services: <LuHandHeart />,
    jobs: <LuBriefcaseBusiness />,
    employees: <LuUsers />,
    bookingPages: <LuFilePlus />,
    customers: <LuCircleUser />,
    billing: <LuWallet />,
    myCompany: <LuBuilding />,
    integrations: <LuArrowRightFromLine />,
    settings: <LuCog />,
}

export default navigationIcon
