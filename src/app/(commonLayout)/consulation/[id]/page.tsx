import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDoctorById } from "@/services/doctor.service";
import DoctorDetails from "@/components/modules/consulation/doctorDetails";

export default async function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorDetails doctorId={id} />
    </HydrationBoundary>
  );
}