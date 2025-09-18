import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PropertyCard(props: {
  idProperty: string;
  name: string;
  addressProperty: string;
  priceProperty: number;
  imageUrl?: string;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-soft hover:shadow-lg transition">
      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800">
        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            alt={props.name}
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <CardContent className="p-4">
        <div className="font-semibold">{props.name}</div>
        <div className="text-sm text-slate-500">{props.addressProperty}</div>
        <div className="mt-2 text-lg font-semibold">
          ${props.priceProperty.toLocaleString()}
        </div>
        <div className="mt-3">
          <Link
            className="text-brand-700 hover:underline"
            href={`/properties/${props.idProperty}`}
          >
            View
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
