import styled from 'styled-components';

export type Trend = 'up' | 'down' | 'flat';

export interface StatMetricProps {
  label: string;
  value: number;
  unit?: string;
  trend?: Trend;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Value = styled.span`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const Unit = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.color.textMuted};
  margin-left: ${({ theme }) => theme.space(1)};
`;

const trendGlyph: Record<Trend, string> = {
  up: '▲',
  down: '▼',
  flat: '▬',
};

const TrendLabel = styled.span<{ $trend: Trend }>`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme, $trend }) =>
    $trend === 'up' ? theme.color.danger : $trend === 'down' ? theme.color.success : theme.color.textMuted};
`;

export function StatMetric({ label, value, unit, trend }: StatMetricProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <div>
        <Value>{value}</Value>
        {unit ? <Unit>{unit}</Unit> : null}
      </div>
      {trend ? <TrendLabel $trend={trend}>{trendGlyph[trend]} {trend}</TrendLabel> : null}
    </Wrapper>
  );
}
