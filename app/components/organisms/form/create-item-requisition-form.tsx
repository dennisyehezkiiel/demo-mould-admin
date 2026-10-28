"use client";

import { type ReactNode } from "react";
import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import ReactSelect from "react-select";
import { Input } from "@/app/components/atoms/input";
import { Button } from "@/app/components/atoms/button";
import type { CreateItemRequisitionType } from "@/app/types/request/item-requisition";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/app/types/select-option";

type Name = keyof CreateItemRequisitionType;

interface Props {
  register: UseFormRegister<CreateItemRequisitionType>;
  control: Control<CreateItemRequisitionType>;
  errors: FieldErrors<CreateItemRequisitionType>;
  isSubmitting: boolean;
  customerOption: SelectOption[];
  processOption: SelectOption[];
  productOption: SelectOption[];
  testingReasonOption: SelectOption[];
  onSubmit: () => void;
}

const selectClassNames = {
  control: ({ isFocused }: { isFocused: boolean }) =>
    cn(
      "min-h-8 rounded-lg border bg-transparent text-sm",
      isFocused ? "border-ring ring-3 ring-ring/50" : "border-input",
    ),
  valueContainer: () => "px-2.5 gap-1",
  placeholder: () => "text-muted-foreground",
  indicatorsContainer: () => "pr-1 text-muted-foreground",
  menu: () => "mt-1 overflow-hidden rounded-lg border bg-popover text-sm shadow-md",
  option: ({ isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }) =>
    cn("px-2.5 py-1.5", isSelected ? "bg-primary text-primary-foreground" : isFocused && "bg-accent"),
};

function Row({ label, error, children, className }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid items-center gap-1.5 sm:grid-cols-[11rem_1fr] sm:gap-4", className)}>
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-col gap-1">
        {children}
        {error && <span className="text-xs text-destructive">{error}</span>}
      </div>
    </div>
  );
}

export default function CreateItemRequisitionForm({
  register,
  control,
  errors,
  isSubmitting,
  onSubmit,
  customerOption,
  processOption,
  productOption,
  testingReasonOption
}: Props) {
  const text = (name: Name, label: string, type = "text") => (
    <Row label={label} error={errors[name]?.message as string | undefined}>
      <Input type={type} {...register(name as never)} />
    </Row>
  );

  const select = (
    name: "partNo" | "process" | "customer" | "testingReason",
    label: string,
    options: SelectOption[]
  ) => (
    <Row label={label} error={errors[name]?.message as string | undefined}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSelect<SelectOption>
            {...field}
            unstyled
            isClearable
            options={options}
            classNames={selectClassNames}
            placeholder="Select..."
          />
        )}
      />
    </Row>
  );

  const shots = (name: Name, label: string, type = "text") => (
    <Row label={label}>
      <div className="flex w-48">
        <Input type="number" min={0} className="rounded-r-none" {...register(name as never)} />
        <span className="flex items-center rounded-r-lg border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
          Shots
        </span>
      </div>
    </Row>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="w-full rounded-xl border bg-card">
      <h2 className="border-b px-6 py-4 text-base font-medium">New Request</h2>

      <div className="grid gap-x-12 gap-y-4 p-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {select("customer", "Customer", customerOption)}
          {select("process", "Process", processOption)}
          {select("partNo", "Part No", productOption)}
          {text("productName", "Product Name")}
          {text("backflush", "Backflush")}
          {text("productDrawingNo", "Product Drawing No")}
          {text("revisionNo", "Revision No")}
          {text("rawMaterial", "Raw Material to be Used")}
          {text("trialNo", "Trial No")}
          {text("testDate", "Test Date", "date")}
          {select("testingReason", "Reason for Testing", testingReasonOption)}
        </div>

        <div className="flex flex-col gap-4">
          {text("mouldNo", "Mold number")}
          {text("equipmentNo", "Equipment No.")}
          {text("cavityNo", "Cavity No")}
          {text("mcName", "M/C Name")}
          <h3 className="pt-1 text-sm font-semibold">Number of Shots Requested</h3>
          {shots("inspectionSample", "First Article Inspection")}
          {shots("toolroomSample", "Samples for Toolroom", "number")}
          {shots("clientSample", "Others")}
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t px-6 py-4">
        <Button type="reset" variant="outline">Reset</Button>
        <Button type="submit" loading={isSubmitting}>Save</Button>
      </div>
    </form>
  );
}
