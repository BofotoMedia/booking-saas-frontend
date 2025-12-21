import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone,
} from 'react-icons/pi'
import { 
    GiAutoRepair,
    GiWallet
} from "react-icons/gi";
import { 
    MdHomeRepairService 
} from "react-icons/md";
import { 
    FaUsers,
    FaRegAddressBook,
    FaCog,
    FaCalendarAlt
} from "react-icons/fa";
import { 
    TbBuildingCog,
    TbCalendarPlus
} from "react-icons/tb";
import { 
    FaArrowRightFromBracket 
} from "react-icons/fa6";

import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    calendar: <FaCalendarAlt />,
    services: <GiAutoRepair />,
    jobs: <MdHomeRepairService />,
    employees: <FaUsers />,
    bookingPages: <TbCalendarPlus />,
    customers: <FaRegAddressBook />,
    billing: <GiWallet />,
    myCompany: <TbBuildingCog />,
    integrations: <FaArrowRightFromBracket />,
    settings: <FaCog />,

    singleMenu: <PiAcornDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />,
}

export default navigationIcon
