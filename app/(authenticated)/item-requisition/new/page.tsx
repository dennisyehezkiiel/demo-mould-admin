import { CreateItemRequisitionPageView } from "@/app/components/page-view/create-item-requisition-page-view";
import { Environment } from "@/app/environment/environment";
import { CustomerResponse } from "@/app/types/response/customer-response";
import { ProcessResponse } from "@/app/types/response/process-response";
import { TestingReasonResponse } from "@/app/types/response/testing-reason-response";
import { SelectOption } from "@/app/types/select-option";
import { API_PATHS } from "@/lib/api-path";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value || ''

  let customerOption: SelectOption[] = []
  let processOption: SelectOption[] = []
  let testingReasonOption: SelectOption[] = []

  try {
    const customerResponse = await fetch(
      `${Environment.baseUrl.API}${API_PATHS.customer.list}`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const processResponse = await fetch(
      `${Environment.baseUrl.API}${API_PATHS.process.list}`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const testingReasonResponse = await fetch(
      `${Environment.baseUrl.API}${API_PATHS.testingReason.list}`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const customer: CustomerResponse[] = await customerResponse.json()
    const process: ProcessResponse[] = await processResponse.json()
    const testingReason: TestingReasonResponse[] = await testingReasonResponse.json()

    customerOption = customer.map((el) => ({ label: el.customerName, value: el.id }))
    processOption = process.map((el) => ({ label: el.processName, value: el.id }))
    testingReasonOption = testingReason.map((el) => ({ label: el.reason, value: el.id }))

  } catch (error) {
    console.log(error, ">>>>cek err");
  }

  return (
    <CreateItemRequisitionPageView
      customerOption={customerOption}
      processOption={processOption}
      testingReasonOption={testingReasonOption}
    />
  )
}
