// src/app/(commonLayout)/consulation/page.tsx

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getDoctorData } from './_action'
import { Posts } from '@/components/modules/consulation/doctors'

// ✅ App Router এ সরাসরি async function
export default async function ConsultationPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['doctors'],
    queryFn: getDoctorData,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}