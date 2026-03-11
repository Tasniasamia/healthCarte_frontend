export interface INavItem {
    title: string;
    items: INavSection[];
}

export interface INavSection {
    label: string;
    href: string;
    icon: string;
    onClick?: () => void;
}