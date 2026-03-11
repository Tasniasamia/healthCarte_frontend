"use client";
import React from 'react';
import { INavItem } from '@/types/navItem.types';
import Link from 'next/link';
import { UserInfo } from '@/types/user.types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { iconMapper } from '@/lib/iconMapper';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getNavItemsByRole } from '@/lib/navItem';

const DashboardSidebarContent = ({ userInfo, role,  dashboardHome }: { userInfo: UserInfo, role: string,  dashboardHome: string }) => {
    const pathname = usePathname();
    const navItems:INavItem[]=getNavItemsByRole(userInfo?.role as string);

    return (
        <div className="hidden md:flex h-full w-64 flex-col border-r bg-card overflow-y-auto">
            {/* Logo / Brand */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href={dashboardHome}>
                    <span className="text-xl font-bold text-primary">PH Healthcare</span>
                </Link>
            </div>
            {/* Navigation Area */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                    {navItems.map((section, sectionId) => (
                        <div key={sectionId}>
                            {section.title && (
                                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {section.title}
                                </h4>
                            )}

                            <div className="space-y-1">
                                {section.items.map((item, id) => {
                                    const isActive = pathname === item.href;
                                    // Icon Mapper Function
                                    const Icon = iconMapper(item.icon) as LucideIcon;

                                    return item.onClick ? (
                                        <Button
                                            key={id}
                                            onClick={item.onClick}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </Button>
                                    ) : (
                                        <Link
                                            key={id}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {sectionId < navItems.length - 1 && (
                                <Separator className="my-4" />
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>
            {/* User Info At Bottom */}
            <div className="border-t px-3 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                            {userInfo.name.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{userInfo.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                            {userInfo.role.toLocaleLowerCase().replace("_", " ")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebarContent;