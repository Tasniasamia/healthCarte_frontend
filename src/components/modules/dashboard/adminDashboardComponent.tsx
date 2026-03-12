"use client";
import AppointmentBarChart from '@/components/shared/appointmentBarChart';
import AppointmentPieChart from '@/components/shared/appointmentPieChart';
import StatsCard from '@/components/shared/statsCard';
import { getDashboardData } from '@/services/dashboard.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AdminDashboardComponent = () => {
    const {data}=useQuery({
        queryKey:['admin-dashboard-stats'],
        queryFn:()=>getDashboardData()

    });
    console.log("data",data);
    return (
        <div>
        <StatsCard
        title="Total Appointments"
        value={data?.appointmentCount || 0}
        iconName="CalendarDays"
        description="Number of appointments scheduled"
        />
        <StatsCard
        title="Total Patients"
        value={data?.patientCount || 0}
        iconName="Users"
        description="Number of patients registered"
        />

        <AppointmentBarChart
        data={data?.barChartData || []}
        />

        <AppointmentPieChart
        data={data?.pieChartData || []}
        />
    </div>
  )
    
};

export default AdminDashboardComponent;
