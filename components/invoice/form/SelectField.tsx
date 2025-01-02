"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvoiceType } from "@/types/schemasTypes";
import { useFormContext } from "react-hook-form";

// Helper: Formatted Select Field
export const SelectField = ({
  name,
  options,
  label,
  disabled,
  onChange,
}: any) => {
  const { control } = useFormContext<InvoiceType>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            {...field}
            onValueChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
