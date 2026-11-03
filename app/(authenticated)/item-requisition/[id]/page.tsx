import DetailItemRequisitionPageView from "@/app/components/page-view/detail-item-requisition-page-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ItemRequisitionDetailPage({ params }: Props) {
  const requisitionId = (await params).id;
  return <DetailItemRequisitionPageView requisitionId={requisitionId} />;
}
