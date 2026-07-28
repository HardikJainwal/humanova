"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TambolaHome from "@/components/tambola/TambolaHome";
import TambolaAdmin from "@/components/tambola/TambolaAdmin";
import TambolaTicket from "@/components/tambola/TambolaTicket";

function TambolaRouter() {
  const params = useSearchParams();
  const isAdmin  = params.has("admin");
  const ticketNo = params.get("ticket");
  const name     = params.get("name") || "Participant";

  if (isAdmin)  return <TambolaAdmin />;
  if (ticketNo) return <TambolaTicket ticketNo={Number(ticketNo)} participantName={name} />;
  return <TambolaHome />;
}

export default function TambolaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[#2C8C91] border-t-transparent animate-spin" />
      </div>
    }>
      <TambolaRouter />
    </Suspense>
  );
}
