"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/EmptyState";
import { DynamicTableProps } from "@/types/dataTypes";
import { cn } from "@/lib/utils";

export function DynamicTable<T>({
  data,
  fields,
  renderActions,
  emptyState,
  customComponent,
  onClick,
}: DynamicTableProps<T>): JSX.Element {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      {data.length === 0 ? (
        <EmptyState {...emptyState} />
      ) : (
        <>
          <Table className="min-w-[700px] table-auto border-collapse">
            <TableHeader>
              <TableRow>
                {fields.map((field) => (
                  <TableHead
                    key={String(field.key)}
                    className={cn(
                      field.sticky && "sticky left-0 bg-white z-10 shadow-sm",
                      field.className
                    )}
                    style={field.style || { minWidth: "100px" }}
                    onClick={() => requestSort(field.key as keyof T)}
                  >
                    {field.label}
                    {sortConfig && sortConfig.key === field.key && (
                      <span>
                        {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                      </span>
                    )}
                  </TableHead>
                ))}
                {renderActions && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    if (onClick) onClick(item);
                  }}
                >
                  {fields.map((field) => (
                    <TableCell
                      key={String(field.key)}
                      className={cn(
                        field.sticky && "sticky left-0 bg-white z-10 shadow-sm",
                        field.className
                      )}
                      style={field.style || { minWidth: "100px" }}
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
              ))}
            </TableBody>
          </Table>
          {customComponent}
        </>
      )}
    </>
  );
}
