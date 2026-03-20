"use client";

import { getDoctorById } from "@/services/doctor.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star, MapPin, Briefcase, DollarSign,
  Phone, Mail, GraduationCap, Building2, Loader2,
} from "lucide-react";
import dayjs from "dayjs";
import BookAppointmentModal from "./bookAppointmentModal";

export default function DoctorDetails({ doctorId }: { doctorId: string }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctorById(doctorId),
  });

  const doctor = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Doctor not found
      </div>
    );
  }

  const availableSlots = (doctor.doctorSchedules ?? []).filter(
    (ds: any) => !ds.isBooked
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl space-y-6">

      {/* ✅ top card */}
      <div className="border rounded-xl p-6 flex flex-col sm:flex-row gap-6">
        <div className="relative h-28 w-28 shrink-0 rounded-full overflow-hidden border mx-auto sm:mx-0">
          <Image
            src={doctor.profilePhoto || "/placeholder-doctor.png"}
            alt={doctor.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-semibold">{doctor.name}</h1>
              <p className="text-muted-foreground text-sm">{doctor.designation}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {doctor.avaerageRating?.toFixed(1) || "0.0"}
              </span>
            </div>
          </div>

          {/* specialities */}
          {doctor.specialities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {doctor.specialities.map((item: any, i: number) => (
                <Badge key={i} variant="secondary">
                  {item?.specialty?.title}
                </Badge>
              ))}
            </div>
          )}

          {/* info */}
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{doctor.experience} years experience</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              <span className="text-green-600 font-medium">
                ${doctor.appointmentFee} per visit
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>{doctor.contactNumber}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate">{doctor.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{doctor.qualification}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>{doctor.currentWorkingPlace}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{doctor.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ available schedules */}
      <div className="border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base">Available Schedules</h2>
          <Button onClick={() => setBookingOpen(true)} disabled={availableSlots.length === 0}>
            Book Appointment
          </Button>
        </div>

        {availableSlots.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No available slots at the moment
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableSlots.map((ds: any) => (
              <div
                key={ds.scheduleId}
                className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30"
              >
                <div className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    {dayjs(ds.schedule?.startDateTime).format("ddd, DD MMM YYYY")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dayjs(ds.schedule?.startDateTime).format("hh:mm A")}
                    {" — "}
                    {dayjs(ds.schedule?.endDateTime).format("hh:mm A")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ booking modal */}
      {bookingOpen && (
        <BookAppointmentModal
          doctor={doctor}
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  );
}