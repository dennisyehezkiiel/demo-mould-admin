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
import { CreateItemRequisitionType, RequestItemRequisitionType } from "@/app/types/request/item-requisition";
import { useCreateTestingRequisition } from "@/lib/service/testing-requisition-service";
import { useNotifyError } from "@/lib/use-notify-error";

interface OptionState {
  customerOption: SelectOption[];
  processOption: SelectOption[];
  productOption: SelectOption[]
}

export function ProductPageView() {
  const notifyError = useNotifyError();

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

  const { mutate: createTestingRequisition } = useCreateTestingRequisition()
  const { data: customerData } = useGetCustomerList();
  const { data: processData } = useGetProcessList();
  const { data: productData, refetch: refetchProduct } = useGetProductList({
    customerId: selectedCustomer?.value || null,
    processId: selectedProcess?.value || null,
  });

  const onSubmit = async (field: CreateItemRequisitionType) => {
    try {
      const payload: RequestItemRequisitionType = {
        customerId: field.customer?.value || '',
        productId: field.productId,
        trialNo: field.trialNo,
        testDate: field.testDate || new Date(),
        testingReasonId: field.testingReason,
        mcName: field.mcName,
        inspectionSample: field.inspectionSample,
        toolroomSample: field.toolroomSample,
        clientSample: field.clientSample
      }
      const data = await createTestingRequisition(payload)
      console.log(data, ">>>>cek data");
    } catch (error) {
      notifyError(error)
    }
  }

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
      setValue('productId', findProduct?.id || '')
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
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormPageTemplate>
  );
}