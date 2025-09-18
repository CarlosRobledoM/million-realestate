"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type FilterValues = {
  name?: string;
  address?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
};

export function Filters(props: {
  onSubmit: (v: FilterValues) => void;
  loading: boolean;
}) {
  const { register, handleSubmit, reset } = useForm<FilterValues>();
  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="rounded-2xl border bg-white/70 dark:bg-slate-900/60 p-4 shadow-soft backdrop-blur"
    >
      <div className="grid gap-3 md:grid-cols-5">
        <Input placeholder="name" {...register("name")} />
        <Input placeholder="address" {...register("address")} />
        <Input
          type="number"
          placeholder="min price"
          {...register("minPrice", { valueAsNumber: true })}
        />
        <Input
          type="number"
          placeholder="max price"
          {...register("maxPrice", { valueAsNumber: true })}
        />
        <div className="flex gap-2 md:justify-end">
          <Button type="submit" disabled={props.loading}>
            Search
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              reset();
              props.onSubmit({});
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
