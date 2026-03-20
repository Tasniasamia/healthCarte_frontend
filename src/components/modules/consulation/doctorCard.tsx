"use client";

import { IDoctor } from "@/types/doctor.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IDoctorCardProps {
  doctor: IDoctor;
}

export default function DoctorCard({ doctor }: IDoctorCardProps) {
  return (
    <div className="bg-background border rounded-xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* top — photo + basic info */}
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border">
          <Image
            src={doctor.profilePhoto || "/placeholder-doctor.png"}
            alt={doctor.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {doctor.designation}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {doctor.currentWorkingPlace}
          </p>
        </div>

        {/* rating */}
        <div className="flex items-center gap-1 shrink-0">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">
            {doctor.avaerageRating?.toFixed(1) || "0.0"}
          </span>
        </div>
      </div>

      {/* specialities */}
      {doctor.specialities && doctor.specialities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {doctor.specialities.slice(0, 3).map((item: any, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {item?.specialty?.title || "N/A"}
            </Badge>
          ))}
          {doctor.specialities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{doctor.specialities.length - 3} more
            </Badge>
          )}
        </div>
      )}

      {/* info row */}
      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 shrink-0" />
          <span>{doctor.experience} yrs exp</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 shrink-0" />
          <span className="text-green-600 font-medium">
            ${doctor.appointmentFee}
          </span>
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{doctor.address}</span>
        </div>
      </div>

      {/* action */}
      <Link href={`/consulation/${doctor.id}`} className="mt-auto">
        <Button className="w-full" size="sm">
          View Details & Book
        </Button>
      </Link>
    </div>
  );
}