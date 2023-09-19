import { ReactNode } from "react";
import { Cta } from "./ui/button";
import { cn } from "@/lib/utils";

type Column = {
  icon: ReactNode;
  headline: string;
  body: string;
};

const FourColumns = ({ columns }: { columns: Column[] }) => {
  return (
    <div className="bg-gradient-to-r from-red to-blue text-white">
      <div className="container mx-auto flex gap-4 p-24 pt-20">
        {columns.map((column, i) => (
          <div key={i}>
            <div className="flex gap-4 pb-6">
              <span>{column.icon}</span>
              <h3 className="text-2xl font-bold">{column.headline}</h3>
            </div>
            <p className="text-sm">{column.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FourColumns };
