"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import { getDoctorById, getAllSpecialities, updateDoctor } from "@/services/doctor.service";
import { toast } from "sonner";
import { IDoctor } from "@/types/doctor.types";

const GENDER_OPTIONS = ["MALE", "FEMALE", "OTHER"];

interface IEditDoctorModalProps {
  doctor: IDoctor;
  open: boolean;
  onClose: () => void;
}

// speciality র state type
interface ISpecialityState {
  specilitiesId: string;
  shouldDelete: boolean;
}

export default function EditDoctorModal({
  doctor,
  open,
  onClose,
}: IEditDoctorModalProps) {
  const queryClient = useQueryClient();

  // ✅ single doctor fetch — latest data পাওয়ার জন্য
  const { data: doctorData, isLoading: isDoctorLoading } = useQuery({
    queryKey: ["doctor", doctor.id],
    queryFn: () => getDoctorById(doctor.id),
    enabled: open,
  });
  const currentDoctor = doctorData?.data ?? doctor;

  // ✅ all specialities fetch
  const { data: specialitiesData } = useQuery({
    queryKey: ["specialities"],
    queryFn: getAllSpecialities,
    enabled: open,
  });
  const allSpecialities = specialitiesData?.data ?? [];

  // ✅ speciality state — existing + new
  // { specilitiesId, shouldDelete } format
  const [specialityStates, setSpecialityStates] = useState<ISpecialityState[]>([]);

  // doctor data আসলে existing specialities set করো
  useEffect(() => {
    if (currentDoctor?.specialities) {
      const existing = currentDoctor.specialities.map((item: any) => ({
        specilitiesId: item.specialityId ?? item.specialty?.id ?? item.specialities?.id,
        shouldDelete: false,
      }));
      setSpecialityStates(existing);
    }
  }, [currentDoctor]);

  // ✅ speciality toggle logic
  const toggleSpeciality = (id: string) => {
    setSpecialityStates((prev) => {
      const exists = prev.find((s) => s.specilitiesId === id);

      if (exists) {
        // ইতিমধ্যে আছে — shouldDelete toggle করো
        return prev.map((s) =>
          s.specilitiesId === id ? { ...s, shouldDelete: !s.shouldDelete } : s
        );
      } else {
        // নতুন — add করো
        return [...prev, { specilitiesId: id, shouldDelete: false }];
      }
    });
  };

  // কোন id active (shouldDelete=false)?
  const isActive = (id: string) => {
    const found = specialityStates.find((s) => s.specilitiesId === id);
    return found ? !found.shouldDelete : false;
  };

  // ✅ update mutation
  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      toast.success("Doctor updated successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", doctor.id] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update doctor");
    },
  });

  const form = useForm({
    defaultValues: {
      name: currentDoctor?.name ?? "",
      email: currentDoctor?.email ?? "",
      profilePhoto: currentDoctor?.profilePhoto ?? "",
      contactNumber: currentDoctor?.contactNumber ?? "",
      address: currentDoctor?.address ?? "",
      registrationNumber: currentDoctor?.registrationNumber ?? "",
      experience: String(currentDoctor?.experience ?? ""),
      gender: currentDoctor?.gender ?? "MALE",
      appointmentFee: String(currentDoctor?.appointmentFee ?? ""),
      qualification: currentDoctor?.qualification ?? "",
      currentWorkingPlace: currentDoctor?.currentWorkingPlace ?? "",
      designation: currentDoctor?.designation ?? "",
    },
    onSubmit: ({ value }) => {
      const payload = {
        name: value.name,
        email: value.email,
        profilePhoto: value.profilePhoto,
        contactNumber: value.contactNumber,
        address: value.address,
        registrationNumber: value.registrationNumber,
        experience: Number(value.experience),
        gender: value.gender,
        appointmentFee: Number(value.appointmentFee),
        qualification: value.qualification,
        currentWorkingPlace: value.currentWorkingPlace,
        designation: value.designation,
        specialities: specialityStates, // ✅ { specilitiesId, shouldDelete }[]
      };

      handleUpdate({ id: doctor.id, payload });
    },
  });

  // doctor data আসলে form reset করো
  useEffect(() => {
    if (currentDoctor) {
      form.reset({
        name: currentDoctor.name ?? "",
        email: currentDoctor.email ?? "",
        profilePhoto: currentDoctor.profilePhoto ?? "",
        contactNumber: currentDoctor.contactNumber ?? "",
        address: currentDoctor.address ?? "",
        registrationNumber: currentDoctor.registrationNumber ?? "",
        experience: String(currentDoctor.experience ?? ""),
        gender: currentDoctor.gender ?? "MALE",
        appointmentFee: String(currentDoctor.appointmentFee ?? ""),
        qualification: currentDoctor.qualification ?? "",
        currentWorkingPlace: currentDoctor.currentWorkingPlace ?? "",
        designation: currentDoctor.designation ?? "",
      });
    }
  }, [currentDoctor]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl flex flex-col h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
          <DialogTitle>Edit Doctor</DialogTitle>
        </DialogHeader>

        {isDoctorLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4 mt-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field name="name">
                  {(field) => (
                    <AppField field={field} label="Full Name" placeholder="Dr. John Doe" />
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <AppField field={field} label="Email" type="email" placeholder="doctor@example.com" />
                  )}
                </form.Field>

                <form.Field name="contactNumber">
                  {(field) => (
                    <AppField field={field} label="Contact Number" placeholder="+8801700000000" />
                  )}
                </form.Field>

                <form.Field name="registrationNumber">
                  {(field) => (
                    <AppField field={field} label="Registration Number" placeholder="BMDC-2023-0000" />
                  )}
                </form.Field>

                <form.Field name="experience">
                  {(field) => (
                    <AppField field={field} label="Experience (years)" type="number" placeholder="5" />
                  )}
                </form.Field>

                <form.Field name="appointmentFee">
                  {(field) => (
                    <AppField field={field} label="Appointment Fee" type="number" placeholder="500" />
                  )}
                </form.Field>

                <form.Field name="qualification">
                  {(field) => (
                    <AppField field={field} label="Qualification" placeholder="MBBS, FCPS" />
                  )}
                </form.Field>

                <form.Field name="designation">
                  {(field) => (
                    <AppField field={field} label="Designation" placeholder="Consultant Cardiologist" />
                  )}
                </form.Field>

                <form.Field name="currentWorkingPlace">
                  {(field) => (
                    <AppField field={field} label="Current Working Place" placeholder="Hospital Name" />
                  )}
                </form.Field>

                <form.Field name="profilePhoto">
                  {(field) => (
                    <AppField field={field} label="Profile Photo URL" placeholder="https://..." />
                  )}
                </form.Field>
              </div>

              <form.Field name="address">
                {(field) => (
                  <AppField field={field} label="Address" placeholder="Dhanmondi, Dhaka" />
                )}
              </form.Field>

              {/* ✅ Gender */}
              <form.Field name="gender">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label>Gender</Label>
                    <Select value={field.state.value} onValueChange={field.handleChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDER_OPTIONS.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g.charAt(0) + g.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              {/* ✅ Specialities — checkmark toggle */}
              <div className="space-y-2">
                <Label>Specialities</Label>
                <p className="text-xs text-muted-foreground">
                  ✓ checked = active, uncheck করলে remove হবে
                </p>
                <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[60px]">
                  {allSpecialities.map((spec: any) => {
                    const active = isActive(spec.id);
                    return (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => toggleSpeciality(spec.id)}
                        className={`
                          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all
                          ${active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-input hover:border-primary/50"
                          }
                        `}
                      >
                        {active && <span className="text-xs">✓</span>}
                        {spec.title}
                        {active && <X className="h-3 w-3 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* active specialities count */}
                <p className="text-xs text-muted-foreground">
                  {specialityStates.filter((s) => !s.shouldDelete).length} specialit{specialityStates.filter((s) => !s.shouldDelete).length === 1 ? "y" : "ies"} selected
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}