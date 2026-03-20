import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMySchedules } from "@/services/doctorSchedule.service";
import DoctorScheduleTable from "@/components/modules/doctor/doctorSchedule/doctorscheduletable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchQueries = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["mySchedules", searchQueries],
    queryFn: getMySchedules,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorScheduleTable
        searchQueries={searchQueries as Record<string, string>}
      />
    </HydrationBoundary>
  );
}