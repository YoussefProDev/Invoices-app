"use client"; // Mark this as a Client Component

import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DynamicTableProps } from "@/types/dataTypes";
import React from "react";

export function InteractiveTableRow<T>({
  item,
  fields,
  renderActions,
  onClick,
  index,
}: {
  item: T;
  fields: DynamicTableProps<T>["fields"];
  renderActions?: DynamicTableProps<T>["renderActions"];
  onClick?: (item: T) => void;
  index: number;
}) {
  return (
    <TableRow
      onClick={() => {
        if (onClick) onClick(item);
      }}
      aria-label={`Row`}
    >
      {fields.map((field) => (
        <TableCell
          key={String(field.key)}
          className={cn(
            field.className,
            field.sticky && "sticky left-0 bg-white z-10 shadow-sm"
          )}
        >
          {field.format
            ? field.format(item[field.key], item)
            : (item[field.key] as React.ReactNode) || "N/A"}
        </TableCell>
      ))}
      {renderActions && (
        <TableCell className="text-right">
          {renderActions(item, index)}
        </TableCell>
      )}
    </TableRow>
  );
}
