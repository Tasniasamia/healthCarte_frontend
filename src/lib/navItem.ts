import { defaultRoute } from "./auth.utils"
import { INavItem, INavSection } from "@/types/navItem.types"

export const getDefaultNavItems = (role: string):INavItem[] => {
    
    return [
        {
            title:"Dashboard",
            items:[
                {
                    label: "Home",
                    href: "/",
                    icon: "Home",
                },
                {
                    label: "Dashboard",
                    href: defaultRoute(role),
                    icon: "LayoutDashboard",
                },
                
            ]

        }
        ,{
            title:"Settings",
            items:[
                {
                    label: "Profile",
                    href: "/profile",
                    icon: "User",
                },
                {
                    label: "Change Password",
                    href: "/change-password",
                    icon: "Lock",
                },
                {
                    label: "Logout",
                    href: "/logout",
                    icon: "LogOut",
                    onClick: () => {
                    },
                }
            ]
        }
        
    
    ]
}

export const getDoctorNavItems = ():INavItem[] => {
    return [
        {
            title: " Patient Management",
            items : [
                {
                    label : "Appointments",
                    href : "/doctor/dashboard/appointments",
                    icon : "Calender"
                },
                {
                    label: "My Schedules",
                    href: "/doctor/dashboard/my-schedules",
                    icon: "Clock",
                },
                {
                    label: "Prescriptions",
                    href: "/doctor/dashboard/prescriptions",
                    icon: "FileText",
                },
                {
                    label: "My Reviews",
                    href: "/doctor/dashboard/my-reviews",
                    icon: "Star",
                },
            ]
        }
    ]
}

export const getAdminNavItems = ():INavItem[] => {
    return [
        {
            title: "User Management",
            items: [
                {
                    label: "Admins",
                    href: "/admin/dashboard/admins-management",
                    icon: "Shield",
                },
                {
                    label: "Doctors",
                    href: "/admin/dashboard/doctors-management",
                    icon: "Stethoscope",
                },
                {
                    label: "Patients",
                    href: "/admin/dashboard/patients-management",
                    icon: "Users",
                },
            ],
        },
        {
            title: "Hospital Management",
            items: [
                {
                    label: "Appointments",
                    href: "/admin/dashboard/appointments-management",
                    icon: "Calendar",
                },
                {
                    label: "Schedules",
                    href: "/admin/dashboard/schedules-management",
                    icon: "Clock",
                },
                {
                    label: "Specialties",
                    href: "/admin/dashboard/specialties-management",
                    icon: "Hospital",
                },
                {
                    label: "Doctor Schedules",
                    href: "/admin/dashboard/doctor-schedules-managament",
                    icon: "CalendarClock",
                },
                {
                    label: "Doctor Specialties",
                    href: "/admin/dashboard/doctor-specialties-management",
                    icon: "Stethoscope",
                },
                {
                    label: "Payments",
                    href: "/admin/dashboard/payments-management",
                    icon: "CreditCard",
                },
                {
                    label: "Prescriptions",
                    href: "/admin/dashboard/prescriptions-management",
                    icon: "FileText",
                },
                {
                    label: "Reviews",
                    href: "/admin/dashboard/reviews-management",
                    icon: "Star",
                },
            ],
        },
    ]
}

export const getPatientNavItems = ():INavItem[] => {
    return [
        {
            title: "Appointments",
            items: [
                {
                    label: "My Appointments",
                    href: "/dashboard/my-appointments",
                    icon: "Calendar",
                },
                {
                    label: "Book Appointment",
                    href: "/dashboard/book-appointments",
                    icon: "ClipboardList",
                },
            ],
        },
        {
            title: "Medical Records",
            items: [
                {
                    label: "My Prescriptions",
                    href: "/dashboard/my-prescriptions",
                    icon: "FileText",
                },
                {
                    label: "Health Records",
                    href: "/dashboard/health-records",
                    icon: "Activity",
                },
            ],
        },
    ]
}

export const getNavItemsByRole = (role : string) : INavItem[] => {
    const commonNavItems = getDefaultNavItems(role);

    switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
            return [...commonNavItems, ...(getAdminNavItems())];

        case "DOCTOR":
            return [...commonNavItems, ...(getDoctorNavItems())];

        case "PATIENT":
            return [...commonNavItems, ...(getPatientNavItems())];

        default:
            return commonNavItems;
    }
}