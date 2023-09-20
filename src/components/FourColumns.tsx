import { CSSProperties, ReactNode } from 'react';
import { Cta } from './ui/button';
import { cn } from '@/lib/utils';

type Column = {
  icon: ReactNode;
  headline: string;
  body: ReactNode;
};

const FourColumns = ({
  columns,
  style,
}: {
  columns: Column[];
  style: CSSProperties;
}) => {
  return (
    <div className="text-white" style={style}>
      <div className="container mx-auto flex gap-4">
        {columns.map((column, i) => (
          <div key={i}>
            <div className="flex gap-4 pb-6">
              <span>{column.icon}</span>
              <h3 className="text-2xl font-bold">{column.headline}</h3>
            </div>
            <div className="text-sm">{column.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FourColumns };
