"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormReset,
  type UseFormTrigger,
} from "react-hook-form";
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
  trigger: UseFormTrigger<CreateItemRequisitionType>;
  reset: UseFormReset<CreateItemRequisitionType>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const STEPS = [
  "Initial Selection",
  "Part & Mold Specifications",
  "Test Details & Shots",
];
const STEP_FIELDS: Name[][] = [
  ["customer", "process", "partNo"],
  ["productName", "productDrawingNo", "revisionNo", "rawMaterial", "trialNo", "mouldNo", "equipmentNo", "cavityNo", "backflush"],
  ["testDate", "testingReason"],
];
const required = { required: "Required" };

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2 px-6 py-4">
      {STEPS.map((label, i) => (
        <li
          key={label}
          className="flex flex-1 items-center gap-2 last:flex-none"
        >
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
              i < step && "border-primary bg-primary text-primary-foreground",
              i === step && "border-primary text-primary",
              i > step && "text-muted-foreground",
            )}
          >
            {i < step ? "✓" : i + 1}
          </span>
          <span
            className={cn(
              "hidden text-sm sm:inline",
              i === step ? "font-medium" : "text-muted-foreground",
            )}
          >
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <span
              className={cn(
                "h-px flex-1",
                i < step ? "bg-primary" : "bg-border",
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
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
  menu: () =>
    "mt-1 overflow-hidden rounded-lg border bg-popover text-sm shadow-md",
  option: ({
    isFocused,
    isSelected,
  }: {
    isFocused: boolean;
    isSelected: boolean;
  }) =>
    cn(
      "px-2.5 py-1.5",
      isSelected
        ? "bg-primary text-primary-foreground"
        : isFocused && "bg-accent",
    ),
};

function Row({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-1.5 sm:grid-cols-[11rem_1fr] sm:gap-4",
        className,
      )}
    >
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
  testingReasonOption,
  trigger,
  reset,
}: Props) {
  const [step, setStep] = useState(0);
  const last = STEPS.length - 1;

  const next = async () => {
    if (await trigger(STEP_FIELDS[step] as never)) setStep((v) => v + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (step < last) {
      e.preventDefault();
      void next();
      return;
    }
    onSubmit(e);
  };

  const handleReset = () => {
    reset();
    setStep(0);
  };

  const text = (
    name: Name,
    label: string,
    type = "text",
    disabled = false,
    req = false,
  ) => (
    <Row label={label} error={errors[name]?.message as string | undefined}>
      <Input
        type={type}
        disabled={disabled}
        {...register(name as never, req ? required : undefined)}
      />
    </Row>
  );

  const select = (
    name: "partNo" | "process" | "customer" | "testingReason",
    label: string,
    options: SelectOption[],
  ) => (
    <Row label={label} error={errors[name]?.message as string | undefined}>
      <Controller
        name={name}
        control={control}
        rules={required}
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

  const shots = (name: Name, label: string) => (
    <Row label={label}>
      <div className="flex w-48">
        <Input
          type="number"
          min={0}
          className="rounded-r-none"
          {...register(name as never)}
        />
        <span className="flex items-center rounded-r-lg border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
          Shots
        </span>
      </div>
    </Row>
  );

  return (
    <div className="space-y-4">
      <div className="w-full rounded-xl border bg-card">
        <Stepper step={step} />
      </div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full rounded-xl border bg-card min-h-[calc(100vh-250px)]"
      >
        <div className="flex justify-between items-center border-b px-6 py-3 ">
          <h2 className="text-base font-medium">
            New Request
          </h2>
          <div className="flex justify-end gap-2">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((v) => v - 1)}
              >
                Back
              </Button>
            )}
            {step === last && (
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
            {step < last ? (
              <Button key="next" type="button" onClick={next}>
                Next
              </Button>
            ) : (
              <Button key="submit" type="submit" loading={isSubmitting}>
                Submit
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          {step === 0 && (
            <>
              {select("customer", "Customer", customerOption)}
              {select("process", "Process", processOption)}
              {select("partNo", "Part No", productOption)}
            </>
          )}
          {step === 1 && (
            <>
              {text("productName", "Product Name", "text", true, true)}
              {text("productDrawingNo", "Product Drawing No", "text", true, true)}
              {text("revisionNo", "Revision No", "number", true, true)}
              {text("rawMaterial", "Raw Material to be Used", "text", false, true)}
              {text("trialNo", "Trial No", "text", false, true)}
              {text("mouldNo", "Mold number", "text", true, true)}
              {text("equipmentNo", "Equipment No.", "text", true, true)}
              {text("cavityNo", "Cavity No", "text", true, true)}
              {text("backflush", "Backflush", "text", false, true)}
            </>
          )}
          {step === 2 && (
            <>
              {text("testDate", "Test Date", "date", false, true)}
              {select(
                "testingReason",
                "Reason for Testing",
                testingReasonOption,
              )}
              {text("mcName", "M/C Name")}
              <h3 className="pt-1 text-sm font-semibold">
                Number of Shots Requested
              </h3>
              {shots("inspectionSample", "First Article Inspection")}
              {shots("toolroomSample", "Samples for Toolroom")}
              {shots("clientSample", "Others")}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
