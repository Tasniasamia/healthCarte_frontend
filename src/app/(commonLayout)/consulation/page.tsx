import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllDoctors } from "@/services/doctor.service";
import DoctorList from "@/components/modules/consulation/doctorList";

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchQueries = await searchParams;

  // ✅ isDeleted=false সবসময় যাবে
  searchQueries["isDeleted"] = "false";
  searchQueries["include"] = "specialities.specialty";

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
    queryKey: ["public-doctors", searchQueries],
    queryFn: () => getAllDoctors(urlQuerires),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Find a Doctor</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Browse our expert doctors and book your appointment
          </p>
        </div>
        <DoctorList
          urlQuerires={urlQuerires}
          searchQueries={searchQueries as Record<string, string>}
        />
      </div>
    </HydrationBoundary>
  );
}