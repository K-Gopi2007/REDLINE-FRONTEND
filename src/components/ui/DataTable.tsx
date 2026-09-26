import React from 'react';
import { cn } from './Button';

interface Column<T> {
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T>({ columns, data, className }: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col, idx) => (
              <th key={idx} className={cn("py-3 px-4 text-label-sm text-ink-subdued uppercase font-semibold", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-gray-100 hover:bg-surface-low transition-colors group">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={cn("py-4 px-4 text-body-sm align-top", col.className)}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
