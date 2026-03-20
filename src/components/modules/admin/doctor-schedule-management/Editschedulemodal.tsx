"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { updateSchedule } from "@/services/Schedule.service";
import { ISchedule } from "@/types/schedule.types";
import { toast } from "sonner";
import dayjs from "dayjs";

interface IEditScheduleModalProps {
  schedule: ISchedule;
  open: boolean;
  onClose: () => void;
}

export default function EditScheduleModal({
  schedule,
  open,
  onClose,
}: IEditScheduleModalProps) {
  const queryClient = useQueryClient();

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      toast.success("Schedule updated successfully");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update schedule");
    },
  });

  const form = useForm({
    defaultValues: {
      startDate: dayjs(schedule.startDateTime).format("YYYY-MM-DD"),
      endDate: dayjs(schedule.endDateTime).format("YYYY-MM-DD"),
      startTime: dayjs(schedule.startDateTime).format("HH:mm"),
      endTime: dayjs(schedule.endDateTime).format("HH:mm"),
    },
    onSubmit: ({ value }) => {
      handleUpdate({
        id: schedule.id,
        payload: {
          startDate: value.startDate,
          endDate: value.endDate,
          startTime: value.startTime,
          endTime: value.endTime,
        },
      });
    },
  });

  // schedule বদলালে form reset করো
  useEffect(() => {
    form.reset({
      startDate: dayjs(schedule.startDateTime).format("YYYY-MM-DD"),
      endDate: dayjs(schedule.endDateTime).format("YYYY-MM-DD"),
      startTime: dayjs(schedule.startDateTime).format("HH:mm"),
      endTime: dayjs(schedule.endDateTime).format("HH:mm"),
    });
  }, [schedule]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4 mt-2"
        >
          <div className="grid grid-cols-2 gap-4">
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}