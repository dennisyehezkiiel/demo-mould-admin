"use client";

import { FormPageTemplate } from "@/app/components/templates/form-page-template";
import { createItemRequisitionData } from "@/app/data/item-requisition";
import { useForm } from "react-hook-form";
import CreateItemRequisitionForm from "../organisms/form/create-item-requisition-form";
import { useGetProductList } from "@/lib/service/product-service";
import { useEffect, useState } from "react";
import { SelectOption } from "@/app/types/select-option";
import { CreateItemRequisitionType, RequestItemRequisitionType } from "@/app/types/request/item-requisition";
import { useCreateTestingRequisition } from "@/lib/service/testing-requisition-service";
import { useNotifyError } from "@/lib/use-notify-error";

interface Props {
  customerOption: SelectOption[];
  processOption: SelectOption[];
  testingReasonOption: SelectOption[]
}

interface OptionState {
  customerOption: SelectOption[];
  processOption: SelectOption[];
  productOption: SelectOption[];
  testingReasonOption: SelectOption[];
}

export function CreateItemRequisitionPageView({
  customerOption,
  processOption,
  testingReasonOption
}: Props) {
  const notifyError = useNotifyError();

  const { setValue, watch, register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateItemRequisitionType>({
    defaultValues: createItemRequisitionData,
  });

  const selectedCustomer: SelectOption | null = watch('customer');
  const selectedProcess: SelectOption | null = watch('process');
  const selectedProduct: SelectOption | null = watch('partNo');

  const [productOption, setProductOption] = useState<SelectOption[]>([])

  const { data: productData, refetch: refetchProduct } = useGetProductList({
    customerId: selectedCustomer?.value || null,
    processId: selectedProcess?.value || null,
  });
  const { mutateAsync: createTestingRequisition } = useCreateTestingRequisition()

  const onSubmit = async (field: CreateItemRequisitionType) => {
    try {
      const payload: RequestItemRequisitionType = {
        customerId: field.customer?.value || '',
        productId: field.productId,
        trialNo: field.trialNo,
        testDate: field.testDate || new Date(),
        testingReasonId: field.testingReason?.value || '',
        mcName: field.mcName,
        inspectionSample: Number(field.inspectionSample),
        toolroomSample: Number(field.toolroomSample),
        clientSample: Number(field.clientSample)
      }
      await createTestingRequisition(payload)
    } catch (error) {
      notifyError(error)
    }
  }

  useEffect(() => {
    if (productData && productData?.length > 0) {
      const productOptionNew = productData.map((el) => ({ label: el.productNo, value: el.id }))
      setProductOption(productOptionNew)
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
  }, [productData, selectedProduct, setValue])

  useEffect(() => {
    if (selectedCustomer && selectedProcess) {
      refetchProduct()
    }
  }, [refetchProduct, selectedCustomer, selectedProcess])

  return (
    <FormPageTemplate title="Testing Requisition">
      <CreateItemRequisitionForm
        register={register}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        customerOption={customerOption}
        processOption={processOption}
        productOption={productOption}
        testingReasonOption={testingReasonOption}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormPageTemplate>
  );
}