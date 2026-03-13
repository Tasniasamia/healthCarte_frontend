import { Badge } from "@/components/ui/badge";
import React from "react";

const StatusBadgeCell = ({ status }: { status: string }) => {
  const getVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "secondary";
      case "BLOCKED":
        return "destructive";
      case "DELETED":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div>
      <Badge variant={getVariant(status)}>{status}</Badge>
    </div>
  );
};

export default StatusBadgeCell;
