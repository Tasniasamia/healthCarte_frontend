// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Loader2, CalendarCheck } from "lucide-react";
// import { createAppointment } from "@/services/appointment.service";
// import { toast } from "sonner";
// import { IDoctor } from "@/types/doctor.types";
// import dayjs from "dayjs";
// import { useRouter } from "next/navigation";

// interface IBookAppointmentModalProps {
//   doctor: IDoctor;
//   open: boolean;
//   onClose: () => void;
// }

// export default function BookAppointmentModal({
//   doctor,
//   open,
//   onClose,
// }: IBookAppointmentModalProps) {
//   const queryClient = useQueryClient();
//   const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);

//   // available schedules — isBooked=false গুলো
// //   const availableSchedules = (doctor.doctorSchedules ?? []).filter(
// //     (ds: any) => !ds.isBooked
// //   );
// // const availableSchedules = (doctor.doctorSchedules ?? []).filter(
// //   (ds: any) => !ds.isBooked
// // );

// // ✅ এখন — সব দেখাও
// const availableSchedules = doctor.doctorSchedules ?? [];
//  const router = useRouter();

//   const { mutate: handleBook, isPending } = useMutation({
//     mutationFn: createAppointment,
//     onSuccess: (data) => {
//       const paymentUrl = data?.data?.paymentUrl;
//       if (paymentUrl) {
//         // ✅ stripe checkout page এ redirect
//         window.location.href = paymentUrl;
//       } else {
//         toast.success("Appointment booked successfully!");
//         onClose();
//       }
//     },
//     onError: (error: any) => {
//       const msg =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to book appointment";
//       toast.error(msg);
//     },
//   });

//   const handleSubmit = () => {
//     if (!selectedScheduleId) {
//       toast.error("Please select a schedule");
//       return;
//     }
//     handleBook({ doctorId: doctor.id, scheduleId: selectedScheduleId });
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Book Appointment</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 mt-2">
//           {/* doctor info */}
//           <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
//             <CalendarCheck className="h-5 w-5 text-primary shrink-0" />
//             <div>
//               <p className="text-sm font-medium">{doctor.name}</p>
//               <p className="text-xs text-muted-foreground">{doctor.designation}</p>
//               <p className="text-xs text-green-600 font-medium">
//                 Fee: ${doctor.appointmentFee}
//               </p>
//             </div>
//           </div>

//           {/* schedule selection */}
//           <div className="space-y-2">
//             <p className="text-sm font-medium">Select a Schedule</p>

//             {availableSchedules.length === 0 ? (
//               <p className="text-sm text-muted-foreground text-center py-6">
//                 No available slots at the moment
//               </p>
//             ) : (
//               <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
//             //     {availableSchedules.map((ds: any) => {
//             //       const isSelected = selectedScheduleId === ds.scheduleId;
//             //       return (
//             //         <button
//             //           key={ds.scheduleId}
//             //           type="button"
//             //           onClick={() => setSelectedScheduleId(ds.scheduleId)}
//             //           className={`
//             //             w-full text-left px-4 py-3 rounded-lg border text-sm transition-all
//             //             ${isSelected
//             //               ? "bg-primary text-primary-foreground border-primary"
//             //               : "bg-background border-input hover:border-primary/50"
//             //             }
//             //           `}
//             //         >
//             //           <span className="font-medium">
//             //             {dayjs(ds.schedule?.startDateTime).format("ddd, DD MMM YYYY")}
//             //           </span>
//             //           <span className="ml-2 text-xs opacity-80">
//             //             {dayjs(ds.schedule?.startDateTime).format("hh:mm A")}
//             //             {" — "}
//             //             {dayjs(ds.schedule?.endDateTime).format("hh:mm A")}
//             //           </span>
//             //         </button>
//             //       );
//             //     })}
//             //   </div>
//             // )}
//             {availableSchedules.map((ds: any) => {
//   const isSelected = selectedScheduleId === ds.scheduleId;
//   const isBooked = ds.isBooked; // ✅

//   return (
//     <button
//       key={ds.scheduleId}
//       type="button"
//       onClick={() => !isBooked && setSelectedScheduleId(ds.scheduleId)} // ✅ booked হলে click কাজ করবে না
//       disabled={isBooked} // ✅
//       className={`
//         w-full text-left px-4 py-3 rounded-lg border text-sm transition-all
//         ${isBooked
//           ? "bg-muted text-muted-foreground border-input opacity-50 cursor-not-allowed line-through"
//           : isSelected
//             ? "bg-primary text-primary-foreground border-primary"
//             : "bg-background border-input hover:border-primary/50"
//         }
//       `}
//     >
//       <span className="font-medium">
//         {dayjs(ds.schedule?.startDateTime).format("ddd, DD MMM YYYY")}
//       </span>
//       <span className="ml-2 text-xs opacity-80">
//         {dayjs(ds.schedule?.startDateTime).format("hh:mm A")}
//         {" — "}
//         {dayjs(ds.schedule?.endDateTime).format("hh:mm A")}
//       </span>
//       {isBooked && (
//         <span className="ml-2 text-xs text-destructive font-medium">
//           Booked
//         </span>
//       )}
//     </button>
//   );
// })}
//           </div>

//           <div className="flex justify-end gap-2 pt-2">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               disabled={isPending || !selectedScheduleId}
//             >
//               {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
//               Confirm Booking
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CalendarCheck } from "lucide-react";
import { createAppointment } from "@/services/appointment.service";
import { toast } from "sonner";
import { IDoctor } from "@/types/doctor.types";
import dayjs from "dayjs";

interface IBookAppointmentModalProps {
  doctor: IDoctor;
  open: boolean;
  onClose: () => void;
}

export default function BookAppointmentModal({
  doctor,
  open,
  onClose,
}: IBookAppointmentModalProps) {
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);

  // ✅ সব schedules দেখাও — booked গুলো disabled হবে
  const allSchedules = doctor.doctorSchedules ?? [];

  const { mutate: handleBook, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess: (data) => {
      const paymentUrl = data?.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.success("Appointment booked successfully!");
        onClose();
      }
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to book appointment";
      toast.error(msg);
    },
  });

  const handleSubmit = () => {
    if (!selectedScheduleId) {
      toast.error("Please select a schedule");
      return;
    }
    handleBook({ doctorId: doctor.id, scheduleId: selectedScheduleId });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* doctor info */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <CalendarCheck className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">{doctor.name}</p>
              <p className="text-xs text-muted-foreground">{doctor.designation}</p>
              <p className="text-xs text-green-600 font-medium">
                Fee: ${doctor.appointmentFee}
              </p>
            </div>
          </div>

          {/* schedule selection */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Select a Schedule</p>

            {allSchedules.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No available slots at the moment
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {allSchedules.map((ds: any) => {
                  const isSelected = selectedScheduleId === ds.scheduleId;
                  const isBooked = ds.isBooked;

                  return (
                    <button
                      key={ds.scheduleId}
                      type="button"
                      onClick={() => !isBooked && setSelectedScheduleId(ds.scheduleId)}
                      disabled={isBooked}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg border text-sm transition-all
                        ${isBooked
                          ? "bg-muted text-muted-foreground border-input opacity-50 cursor-not-allowed line-through"
                          : isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-input hover:border-primary/50"
                        }
                      `}
                    >
                      <span className="font-medium">
                        {dayjs(ds.schedule?.startDateTime).format("ddd, DD MMM YYYY")}
                      </span>
                      <span className="ml-2 text-xs opacity-80">
                        {dayjs(ds.schedule?.startDateTime).format("hh:mm A")}
                        {" — "}
                        {dayjs(ds.schedule?.endDateTime).format("hh:mm A")}
                      </span>
                      {isBooked && (
                        <span className="ml-2 text-xs text-destructive font-medium not-line-through">
                          Booked
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending || !selectedScheduleId}
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}