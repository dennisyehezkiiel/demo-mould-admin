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
  productOption: SelectOption[]
}

export function ProductPageView() {
  const { setValue, watch, register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateItemRequisitionType>({
    defaultValues: createItemRequisitionData,
  });

  const selectedCustomer: SelectOption | null = watch('customer');
  const selectedProcess: SelectOption | null = watch('process');
  const selectedProduct: SelectOption | null = watch('partNo');

  const [option, setOption] = useState<OptionState>({
    customerOption: [],
    processOption: [],
    productOption: []
  });

  const { data: customerData } = useGetCustomerList();
  const { data: processData } = useGetProcessList();
  const { data: productData, refetch: refetchProduct } = useGetProductList({
    customerId: selectedCustomer?.value || null,
    processId: selectedProcess?.value || null,
  });

  useEffect(() => {
    const customerOptionNew: SelectOption[] = customerData ? customerData.map((el) => ({ label: el.customerName, value: el.id })) : [];
    const processOptionNew: SelectOption[] = processData ? processData.map((el) => ({ label: el.processName, value: el.id })) : [];

    setOption((prev) => ({
      ...prev,
      customerOption: customerOptionNew,
      processOption: processOptionNew,
    }));
  }, [customerData, processData]);

  useEffect(() => {
    if (productData && productData?.length > 0) {
      const productOptionNew = productData.map((el) => ({ label: el.productNo, value: el.id }))
      setOption((prev) => ({
        ...prev,
        productOption: productOptionNew
      }));
    }
  }, [productData])

  useEffect(() => {
    if (productData && productData?.length > 0 && selectedProduct) {
      const findProduct = productData?.find((el) => el.id === selectedProduct?.value)
      setValue('productName', findProduct?.productName || '')
      setValue('revisionNo', findProduct?.revisionNo || 0)
      setValue('productDrawingNo', findProduct?.productDrawingNumber || '')
      setValue('mouldNo', findProduct?.mouldNo || '')
      setValue('equipmentNo', findProduct?.equipmentNo || '')
      setValue('cavityNo', findProduct?.cavityNo || '')
    }
  }, [productData, selectedProduct])

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
        productOption={option.productOption}
        onSubmit={handleSubmit((data) => console.log(data))}
      />
    </FormPageTemplate>
  );
}