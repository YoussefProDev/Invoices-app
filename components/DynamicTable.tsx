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

/**
 * A reusable and dynamic table component to display a list of items.
 * @template T - The type of the data objects being displayed in the table.
 * @param {DynamicTableProps<T>} props - The props for the table component.
 */
export function DynamicTable<T>({
  data,
  fields,
  renderActions,
  emptyState,
  customComponent,
  onClick,
}: DynamicTableProps<T>): JSX.Element {
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
                      field.className,
                      field.sticky && "sticky left-0 bg-white z-10 shadow-sm"
                    )}
                    style={field.style || { minWidth: "100px" }}
                  >
                    {field.label}
                  </TableHead>
                ))}
                {renderActions && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
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
              ))}
            </TableBody>
          </Table>
          {customComponent}
        </>
      )}
    </>
  );
}
