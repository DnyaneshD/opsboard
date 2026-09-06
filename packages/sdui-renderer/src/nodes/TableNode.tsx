import { DataTable } from '@opsboard/design-system';
import type { SduiNode, SduiNodeProps } from '../types';

export function TableNode({ node }: SduiNodeProps<Extract<SduiNode, { type: 'table' }>>) {
  return (
    <DataTable
      columns={node.columns.map((column) => ({
        key: column.key,
        header: column.header,
        align: column.align,
        render: (row: Record<string, unknown>) => String(row[column.field] ?? ''),
      }))}
      rows={node.rows}
      getRowKey={(row) => String(row.id ?? JSON.stringify(row))}
    />
  );
}
