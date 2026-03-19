"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { X, Plus, Loader2 } from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import { createDoctor, getAllSpecialities } from "@/services/doctor.service";
import { toast } from "sonner";

const GENDER_OPTIONS = ["MALE", "FEMALE", "OTHER"];

export default function AddDoctorModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // ✅ specialities fetch
  const { data: specialitiesData } = useQuery({
    queryKey: ["specialities"],
    queryFn: getAllSpecialities,
    enabled: open, // modal খুললে তখনই fetch করবে
  });
  const specialities = specialitiesData?.data ?? [];

  // ✅ selected specialities — multi select
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);

  const toggleSpeciality = (id: string) => {
    setSelectedSpecialities((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  // ✅ create doctor mutation
  const { mutate: handleCreate, isPending } = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      toast.success("Doctor created successfully");
      // ✅ doctors table refetch
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setOpen(false);
      form.reset();
      setSelectedSpecialities([]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create doctor");
    },
  });

  const form = useForm({
    defaultValues: {
      password: "",
      name: "",
      email: "",
      profilePhoto: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      experience: "",
      gender: "MALE",
      appointmentFee: "",
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
    },
    onSubmit: ({ value }) => {
      if (selectedSpecialities.length === 0) {
        toast.error("Please select at least one speciality");
        return;
      }

      const payload = {
        password: value.password,
        doctor: {
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
        },
        specialities: selectedSpecialities,
      };
    console.log("payload",payload);
    if(payload){
            handleCreate(payload);

    }
    },
  });

  return (
    <Dialog className="mx-0" open={open} onOpenChange={setOpen}>
 <DialogTrigger className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 transition-colors">
  <Plus className="h-4 w-4" />
  Add Doctor
</DialogTrigger>

      <DialogContent className=" !max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4 mt-2 w-full"
        >
          {/* ✅ Password */}
          <form.Field
            name="password"
            validators={{ onChange: ({ value }) => !value ? "Password is required" : value.length < 6 ? "Minimum 6 characters" : undefined }}
          >
            {(field) => (
              <AppField field={field} label="Password" type="password" placeholder="Enter password" />
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            {/* ✅ Name */}
            <form.Field
              name="name"
              validators={{ onChange: ({ value }) => !value ? "Name is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Full Name" placeholder="Dr. John Doe" />
              )}
            </form.Field>

            {/* ✅ Email */}
            <form.Field
              name="email"
              validators={{ onChange: ({ value }) => !value ? "Email is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Email" type="email" placeholder="doctor@example.com" />
              )}
            </form.Field>

            {/* ✅ Contact Number */}
            <form.Field
              name="contactNumber"
              validators={{ onChange: ({ value }) => !value ? "Contact is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Contact Number" placeholder="+8801700000000" />
              )}
            </form.Field>

            {/* ✅ Registration Number */}
            <form.Field
              name="registrationNumber"
              validators={{ onChange: ({ value }) => !value ? "Registration is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Registration Number" placeholder="BMDC-2023-0000" />
              )}
            </form.Field>

            {/* ✅ Experience */}
            <form.Field
              name="experience"
              validators={{ onChange: ({ value }) => !value ? "Experience is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Experience (years)" type="number" placeholder="5" />
              )}
            </form.Field>

            {/* ✅ Appointment Fee */}
            <form.Field
              name="appointmentFee"
              validators={{ onChange: ({ value }) => !value ? "Fee is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Appointment Fee" type="number" placeholder="500" />
              )}
            </form.Field>

            {/* ✅ Qualification */}
            <form.Field
              name="qualification"
              validators={{ onChange: ({ value }) => !value ? "Qualification is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Qualification" placeholder="MBBS, FCPS" />
              )}
            </form.Field>

            {/* ✅ Designation */}
            <form.Field
              name="designation"
              validators={{ onChange: ({ value }) => !value ? "Designation is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Designation" placeholder="Consultant Cardiologist" />
              )}
            </form.Field>

            {/* ✅ Current Working Place */}
            <form.Field
              name="currentWorkingPlace"
              validators={{ onChange: ({ value }) => !value ? "Working place is required" : undefined }}
            >
              {(field) => (
                <AppField field={field} label="Current Working Place" placeholder="Hospital Name" />
              )}
            </form.Field>

            {/* ✅ Profile Photo */}
            <form.Field name="profilePhoto">
              {(field) => (
                <AppField field={field} label="Profile Photo URL" placeholder="https://..." />
              )}
            </form.Field>
          </div>

          {/* ✅ Address — full width */}
          <form.Field name="address">
            {(field) => (
              <AppField field={field} label="Address" placeholder="Dhanmondi, Dhaka" />
            )}
          </form.Field>

          {/* ✅ Gender — Select */}
          <form.Field
            name="gender"
            validators={{ onChange: ({ value }) => !value ? "Gender is required" : undefined }}
          >
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

          {/* ✅ Specialities — Multi Select */}
          <div className="space-y-1.5">
            <Label>Specialities</Label>
            <Select
              onValueChange={(val) => toggleSpeciality(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialities" />
              </SelectTrigger>
              <SelectContent>
                {specialities.map((s: any) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* ✅ selected badges */}
            {selectedSpecialities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedSpecialities.map((id) => {
                  const spec = specialities.find((s: any) => s.id === id);
                  return (
                    <Badge key={id} variant="secondary" className="gap-1 pr-1">
                      {spec?.title ?? id}
                      <button
                        type="button"
                        onClick={() => toggleSpeciality(id)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
            {selectedSpecialities.length === 0 && (
              <p className="text-xs text-muted-foreground">No speciality selected</p>
            )}
          </div>

          {/* ✅ Submit */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Create Doctor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}