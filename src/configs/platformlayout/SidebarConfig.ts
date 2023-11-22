import GridViewIcon from '@mui/icons-material/GridView';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MemoryIcon from '@mui/icons-material/Memory';
import CableIcon from '@mui/icons-material/Cable';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SettingsIcon from '@mui/icons-material/Settings';

export class SidebarConfig {
    SIDEBAR_MENUS = [
        {
            title: "Tenants",
            icon: SupervisorAccountIcon,
            href: "/tenants",
            isEnabled: true
        },
        {
            title: "Applications",
            icon: GridViewIcon,
            href: "/applications",
            isEnabled: true
        },
        {
            title: "Instances",
            icon: FolderOpenIcon,
            href: "/instances",
            isEnabled: true
        },
        {
            title: "Connectors",
            icon: CableIcon,
            href: "/connectors",
            isEnabled: true
        },
        {
            title: "Clients",
            icon: FolderOpenIcon,
            href: "/clients",
            isEnabled: true
        },
        {
            title: "Remote",
            icon: MemoryIcon,
            href: "/remote",
            isEnabled: true
        },
        {
            title: "Registry",
            icon: CableIcon,
            href: "/registry",
            isEnabled: true
        },
        {
            title: "Users",
            icon: LocalPhoneIcon,
            href: "/users",
            isEnabled: true
        },
        {
            title: "Groups",
            icon: SupervisorAccountIcon,
            href: "/groups",
            isEnabled: true
        },
        {
            title: "Roles",
            icon: HandshakeIcon,
            href: "/roles",
            isEnabled: true
        },
        {
            title: "Settings",
            icon: SettingsIcon,
            href: "/settings",
            isEnabled: true
        }
    ]
}