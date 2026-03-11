import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
export const iconMapper = (icon: string):LucideIcon => {
    if(icon in LucideIcons){
        return LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;
    }
    return LucideIcons.HelpCircleIcon;
}