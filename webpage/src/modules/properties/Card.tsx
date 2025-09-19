"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PendingLink } from "@/ui/nav/PendingLink";

export function PropertyCard(props: {
  idProperty: string;
  name: string;
  addressProperty: string;
  priceProperty: number;
  imageUrl?: string;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <Card className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-lg transition">
      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800">
        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            alt={props.name}
            fill
            className="object-cover"
          />
        ) : null}
        {busy && (
          <div className="absolute inset-0 grid place-items-center glass-surface">
            <div className="h-6 w-6 rounded-full border-2 border-current border-r-transparent animate-spin" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="font-semibold">{props.name}</div>
        <div className="text-sm text-slate-500">{props.addressProperty}</div>
        <div className="mt-2 text-lg font-semibold">
          ${props.priceProperty.toLocaleString()}
        </div>
        <div className="mt-3">
          <PendingLink
            className="brand-link"
            href={`/properties/${props.idProperty}`}
            onPendingChange={setBusy}
          >
            View
          </PendingLink>
        </div>
      </CardContent>
    </Card>
  );
}
