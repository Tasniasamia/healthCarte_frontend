"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { createSchedule } from "@/services/Schedule.service";
import { toast } from "sonner";

export default function AddScheduleModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: handleCreate, isPending } = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      toast.success("Schedule created successfully");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create schedule");
    },
  });

  const form = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    },
    onSubmit: ({ value }) => {
      handleCreate({
        startDate: value.startDate,
        endDate: value.endDate,
        startTime: value.startTime,
        endTime: value.endTime,
      });
    },
  });

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add Schedule
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Schedule</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4 mt-2"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Start Date */}
              <form.Field
                name="startDate"
                validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Start Date</Label>
                    <Input
                      id={field.name}
                      type="date"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors[0] && (
                      <p className="text-xs text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* End Date */}
              <form.Field
                name="endDate"
                validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>End Date</Label>
                    <Input
                      id={field.name}
                      type="date"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors[0] && (
                      <p className="text-xs text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Start Time */}
              <form.Field
                name="startTime"
                validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Start Time</Label>
                    <Input
                      id={field.name}
                      type="time"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors[0] && (
                      <p className="text-xs text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* End Time */}
              <form.Field
                name="endTime"
                validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>End Time</Label>
                    <Input
                      id={field.name}
                      type="time"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors[0] && (
                      <p className="text-xs text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Create Schedule
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}