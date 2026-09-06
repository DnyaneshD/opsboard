import type { ReactNode } from 'react';
import styled from 'styled-components';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const Th = styled.th<{ $align: 'left' | 'right' | 'center' }>`
  text-align: ${({ $align }) => $align};
  color: ${({ theme }) => theme.color.textMuted};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.xs};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Td = styled.td<{ $align: 'left' | 'right' | 'center' }>`
  text-align: ${({ $align }) => $align};
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const EmptyRow = styled.td`
  padding: ${({ theme }) => theme.space(4)};
  text-align: center;
  color: ${({ theme }) => theme.color.textMuted};
`;

export function DataTable<T>({ columns, rows, getRowKey, emptyMessage = 'No data' }: DataTableProps<T>) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <Th key={column.key} $align={column.align ?? 'left'}>
              {column.header}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <EmptyRow colSpan={columns.length}>{emptyMessage}</EmptyRow>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <Td key={column.key} $align={column.align ?? 'left'}>
                  {column.render(row)}
                </Td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
