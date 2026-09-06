import { StatMetric } from '@opsboard/design-system';
import type { SduiNode, SduiNodeProps } from '../types';

export function MetricNode({ node }: SduiNodeProps<Extract<SduiNode, { type: 'metric' }>>) {
  return <StatMetric label={node.label} value={node.value} unit={node.unit} trend={node.trend} />;
}
