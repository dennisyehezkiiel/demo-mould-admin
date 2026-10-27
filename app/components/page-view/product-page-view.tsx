"use client";

import { FormPageTemplate } from "@/app/components/templates/form-page-template";
import { createItemRequisitionData } from "@/app/data/item-requisition";
import { useForm } from "react-hook-form";
import CreateItemRequisitionForm from "../organisms/form/create-item-requisition-form";
import { useGetCustomerList } from "@/lib/service/customer-service";
import { useGetProcessList } from "@/lib/service/process-service";
import { useGetProductList } from "@/lib/service/product-service";
import { useEffect, useState } from "react";
import { SelectOption } from "@/app/types/select-option";
import { CreateItemRequisitionType } from "@/app/types/request/item-requisition-type";

interface OptionState {
  customerOption: SelectOption[];
  processOption: SelectOption[];
}

export function ProductPageView() {
  const { watch, register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateItemRequisitionType>({
    defaultValues: createItemRequisitionData,
  });

  const selectedCustomer: SelectOption | null = watch('customer');
  const selectedProcess: SelectOption | null = watch('process');

  const [option, setOption] = useState<OptionState>({
    customerOption: [],
    processOption: [],
  });

  const { data: customerData } = useGetCustomerList();
  const { data: processData } = useGetProcessList();
  const { data: productData, refetch: refetchProduct } = useGetProductList({
    customer: selectedCustomer?.value || null,
    process: selectedProcess?.value || null,
  });

  useEffect(() => {
    const customerOptionNew: SelectOption[] = customerData ? customerData.map((el) => ({ label: el.customerName, value: el.id })) : [];
    const processOptionNew: SelectOption[] = processData ? processData.map((el) => ({ label: el.processName, value: el.id })) : [];

    setOption({
      customerOption: customerOptionNew,
      processOption: processOptionNew,
    });
  }, [customerData, processData]);

  useEffect(() => {
    if (selectedCustomer && selectedProcess) {
      refetchProduct()
    }
  }, [selectedCustomer, selectedProcess])

  return (
    <FormPageTemplate title="Testing Requisition">
      <CreateItemRequisitionForm
        register={register}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        customerOption={option.customerOption}
        processOption={option.processOption}
        onSubmit={handleSubmit((data) => console.log(data))}
      />
    </FormPageTemplate>
  );
}