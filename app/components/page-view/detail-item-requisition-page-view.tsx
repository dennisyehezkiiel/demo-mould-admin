"use client";

import {
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { PageHeader } from "@/app/components/molecules/page-header";
import { Badge } from "@/app/components/atoms/badge";
import { Button } from "@/app/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/atoms/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/atoms/dialog";
import { cn } from "@/lib/utils";
import { useGetItemRequisitionDetail } from "@/lib/service/testing-requisition-service";

// ponytail: hardcoded mock data, swap for useGet...(id) when the detail API exists
const REQ = { id: "#TR-2026-0042", status: "In Review" };

interface Signer {
  role: string;
  name: string;
  title: string;
  signedAt?: string;
  signature?: string;
}

const INITIAL_SIGNERS: Signer[] = [
  {
    role: "Requested by",
    name: "Dennis M.",
    title: "Process Engineer",
    signedAt: "10 Nov 2026, 09:12",
    signature: "Dennis M.",
  },
  { role: "Reviewed by", name: "Sarah Lim", title: "QA Supervisor" },
  { role: "Approved by", name: "Budi Santoso", title: "Production Manager" },
];

function SignaturePad({
  onChange,
}: {
  onChange: (dataUrl: string | null) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const pos = (e: PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return [
      (e.clientX - r.left) * (e.currentTarget.width / r.width),
      (e.clientY - r.top) * (e.currentTarget.height / r.height),
    ];
  };
  const down = (e: PointerEvent<HTMLCanvasElement>) => {
    const ctx = e.currentTarget.getContext("2d")!;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0f172a";
    ctx.beginPath();
    ctx.moveTo(...(pos(e) as [number, number]));
  };
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext("2d")!;
    ctx.lineTo(...(pos(e) as [number, number]));
    ctx.stroke();
  };
  const up = () => {
    drawing.current = false;
    onChange(ref.current!.toDataURL());
  };
  const clear = () => {
    const c = ref.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={ref}
        width={480}
        height={180}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        className="w-full touch-none rounded-lg border border-dashed bg-muted/30"
      />
      <button
        type="button"
        onClick={clear}
        className="self-end text-xs text-muted-foreground hover:text-foreground"
      >
        Clear
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{children}</dd>
    </div>
  );
}

export default function DetailItemRequisitionPageView({
  requisitionId,
}: {
  requisitionId: string;
}) {
  const [signers, setSigners] = useState(INITIAL_SIGNERS);
  const [open, setOpen] = useState(false);
  const [sig, setSig] = useState<string | null>(null);

  const nextIdx = signers.findIndex((s) => !s.signedAt);
  const allSigned = nextIdx === -1;
  const status = allSigned ? "Approved" : REQ.status;

  const { data, isLoading } = useGetItemRequisitionDetail(requisitionId);

  const sectionDetail = useMemo(
    () => [
      {
        title: "General & Tooling Information",
        rows: [
          ["Customer", `${data?.customer.customerName}`],
          ["Process", "Plastic Injection Molding"],
          ["Part No", `${data?.product.productNo}`],
          ["Product Name", `${data?.product.productName}`],
          ["Backflush", "Yes (Auto-deduct)"],
          ["Mold Number", `${data?.product.mouldNo}`],
          ["Equipment No", `${data?.product.equipmentNo}`],
          ["Cavity No", `${data?.product.cavityNo}`],
          ["M/C Name", `${data?.mcName}`],
        ],
      },
      {
        title: "Material & Drawing Specifications",
        rows: [
          ["Product Drawing No", `${data?.product.productDrawingNumber}`],
          ["Revision No", `${data?.revisionNo}`],
          ["Raw Material", "ABS GP-22 (Black)"],
          ["Trial No", `${data?.trialNo}`],
        ],
      },
      {
        title: "Test Details & Shot Quantities",
        rows: [
          ["Test Date", `${data?.testDate}`],
          ["Reason for Testing", `${data?.testingReason.reason}`],
          ["First Article Inspection", `${data?.inspectionSample}`],
          ["Samples for Toolroom", `${data?.toolroomSample}`],
          ["Others", `${data?.clientSample}`],
        ],
      },
    ],
    [data],
  );

  console.log(data, ">>>cek data");

  const sign = () => {
    if (!sig) return;
    const signedAt = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setSigners((prev) =>
      prev.map((s, i) =>
        i === nextIdx ? { ...s, signedAt, signature: sig } : s,
      ),
    );
    setOpen(false);
    setSig(null);
  };

  return (
    <>
      <PageHeader title="Testing Requisition Detail">
        <div className="flex flex-wrap gap-2 print:hidden">
          <Button variant="outline" onClick={() => window.print()}>
            Print / Export PDF
          </Button>
          <Button variant="outline">Edit Requisition</Button>
          <Button disabled={allSigned} onClick={() => setOpen(true)}>
            Sign Document
          </Button>
        </div>
      </PageHeader>

      <div className="-mt-3 mb-6 flex items-center gap-2">
        <Badge variant={allSigned ? "default" : "secondary"}>{status}</Badge>
      </div>

      <div className="">
        <div className="flex flex-col gap-6">
          {sectionDetail.map((s) => (
            <Card key={s.title}>
              <CardHeader className="border-b">
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {s.rows.map(([l, v]) => (
                    <Field key={l} label={l}>
                      {v}
                    </Field>
                  ))}
                </dl>
              </CardContent>
            </Card>
          ))}
          <Card className="h-fit">
            <CardHeader className="border-b">
              <CardTitle>Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-5">
                {signers.map((s, i) => (
                  <li key={s.role} className="flex gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
                        s.signedAt
                          ? "border-primary bg-primary text-primary-foreground"
                          : i === nextIdx
                            ? "border-primary text-primary"
                            : "text-muted-foreground",
                      )}
                    >
                      {s.signedAt ? "✓" : i + 1}
                    </span>
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        {s.role}
                      </span>
                      <span className="text-sm font-medium">
                        {s.name}{" "}
                        <span className="font-normal text-muted-foreground">
                          · {s.title}
                        </span>
                      </span>
                      {s.signature?.startsWith("data:") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.signature}
                          alt={`${s.name} signature`}
                          className="h-14 w-40 rounded border bg-muted/30 object-contain"
                        />
                      ) : s.signature ? (
                        <span className="font-serif text-xl italic">
                          {s.signature}
                        </span>
                      ) : null}
                      <span className="text-xs text-muted-foreground">
                        {s.signedAt
                          ? `Signed ${s.signedAt}`
                          : i === nextIdx
                            ? "Awaiting signature"
                            : "Pending"}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setSig(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Document</DialogTitle>
            <DialogDescription>
              {allSigned
                ? ""
                : `Signing as ${signers[nextIdx].role.toLowerCase()}: ${signers[nextIdx].name}`}
            </DialogDescription>
          </DialogHeader>
          {open && <SignaturePad onChange={setSig} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={!sig} onClick={sign}>
              Confirm Signature
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
