"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Loader2 } from "lucide-react";
import {
  addDoctorSchedule,
  getAllSchedules,
  getMySchedules,
  updateDoctorSchedule,
} from "@/services/doctorSchedule.service";
import { toast } from "sonner";
import { ISchedule } from "@/types/schedule.types";
import dayjs from "dayjs";

// schedule slot র state
interface ISlotState {
  id: string;
  shouldDelete: boolean;
  isNew: boolean; // নতুন add করা
}

export default function ManageScheduleModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // ✅ সব available schedules
  const { data: allSchedulesData, isLoading: isLoadingAll } = useQuery({
    queryKey: ["allSchedules"],
    queryFn: () => getAllSchedules(),
    enabled: open,
  });
  const allSchedules: ISchedule[] = allSchedulesData?.data ?? [];

  // ✅ doctor এর already selected schedules
  const { data: mySchedulesData, isLoading: isLoadingMine } = useQuery({
    queryKey: ["mySchedules"],
    queryFn: getMySchedules,
    enabled: open,
  });
  const mySchedules = mySchedulesData?.data ?? [];

  // ✅ slot states — existing + new
  const [slotStates, setSlotStates] = useState<ISlotState[]>([]);

  // modal খুললে existing schedules set করো
  useEffect(() => {
    if (mySchedules.length > 0) {
      const existing = mySchedules.map((s: any) => ({
        id: s.scheduleId,
        shouldDelete: false,
        isNew: false,
      }));
      setSlotStates(existing);
    }
  }, [mySchedulesData]);

  const isSelected = (id: string) => {
    const found = slotStates.find((s) => s.id === id);
    return found ? !found.shouldDelete : false;
  };

  const toggleSlot = (id: string) => {
    setSlotStates((prev) => {
      const exists = prev.find((s) => s.id === id);
      if (exists) {
        // existing — shouldDelete toggle
        return prev.map((s) =>
          s.id === id ? { ...s, shouldDelete: !s.shouldDelete } : s
        );
      } else {
        // নতুন — add
        return [...prev, { id, shouldDelete: false, isNew: true }];
      }
    });
  };

  // ✅ add mutation
  const { mutate: handleAdd, isPending: isAdding } = useMutation({
    mutationFn: addDoctorSchedule,
    onSuccess: () => {
      toast.success("Schedules updated successfully");
      queryClient.invalidateQueries({ queryKey: ["mySchedules"] });
      setOpen(false);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || error?.message || "Failed";
      toast.error(msg);
    },
  });

  // ✅ update mutation
  const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updateDoctorSchedule,
    onSuccess: () => {
      toast.success("Schedules updated successfully");
      queryClient.invalidateQueries({ queryKey: ["mySchedules"] });
      setOpen(false);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || error?.message || "Failed";
      toast.error(msg);
    },
  });

  const isPending = isAdding || isUpdating;

  const handleSave = () => {
    const hasExisting = slotStates.some((s) => !s.isNew);

    if (hasExisting) {
      // ✅ update — existing + new সব পাঠাও
      handleUpdate({
        scheduleId: slotStates.map((s) => ({
          id: s.id,
          shouldDelete: s.shouldDelete,
        })),
      });
    } else {
      // ✅ add — শুধু new selected গুলো
      const newSelected = slotStates
        .filter((s) => !s.shouldDelete)
        .map((s) => s.id);

      if (newSelected.length === 0) {
        toast.error("Please select at least one schedule");
        return;
      }
      handleAdd({ scheduleId: newSelected });
    }
  };

  const selectedCount = slotStates.filter((s) => !s.shouldDelete).length;

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <CalendarDays className="h-4 w-4" />
        Edit or Add Schedule
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl flex flex-col h-[85vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-3 shrink-0 border-b">
            <DialogTitle>Manage My Schedules</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Selected slots{" "}
              <span className="font-medium text-foreground">{selectedCount}</span>
              {" "}— click করে select/deselect করো
            </p>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isLoadingAll || isLoadingMine ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : allSchedules.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">
                No schedules available
              </p>
            ) : (
              <div className="space-y-3">
                {/* date অনুযায়ী group করো */}
                {Object.entries(
                  allSchedules.reduce(
                    (acc: Record<string, ISchedule[]>, schedule) => {
                      const date = dayjs(schedule.startDateTime).format(
                        "YYYY-MM-DD"
                      );
                      if (!acc[date]) acc[date] = [];
                      acc[date].push(schedule);
                      return acc;
                    },
                    {}
                  )
                ).map(([date, slots]) => (
                  <div key={date}>
                    {/* date header */}
                    <p className="text-xs font-medium text-muted-foreground mb-2 sticky top-0 bg-background py-1">
                      {dayjs(date).format("ddd, DD MMM YYYY")}
                    </p>

                    {/* time slots */}
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => {
                        const selected = isSelected(slot.id);
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => toggleSlot(slot.id)}
                            className={`
                              px-3 py-1.5 rounded-full text-sm border transition-all
                              ${selected
                                ? "bg-primary text-primary-foreground border-primary font-medium"
                                : "bg-background text-muted-foreground border-input hover:border-primary/50 hover:text-foreground"
                              }
                            `}
                          >
                            {dayjs(slot.startDateTime).format("hh:mm A")}
                            {" — "}
                            {dayjs(slot.endDateTime).format("hh:mm A")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-6 pb-6 pt-3 border-t shrink-0 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}