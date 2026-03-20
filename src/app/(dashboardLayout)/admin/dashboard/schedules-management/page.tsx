import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllSchedules } from "@/services/Schedule.service";
import ScheduleTable from "@/components/modules/admin/doctor-schedule-management/Scheduletable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchQueries = await searchParams;

  const urlQuerires = Object.keys(searchQueries)
    .map((key) => {
      if (Array.isArray(searchQueries[key])) {
        return (searchQueries[key] as string[])
          .map((v) => `${key}=${v}`)
          .join("&");
      }
      return `${key}=${searchQueries[key]}`;
    })
    .join("&");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["schedules", searchQueries],
    queryFn: () => getAllSchedules(urlQuerires),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScheduleTable
        urlQuerires={urlQuerires}
        searchQueries={searchQueries as Record<string, string>}
      />
    </HydrationBoundary>
  );
}