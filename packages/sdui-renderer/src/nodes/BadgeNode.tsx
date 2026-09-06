import { Badge } from '@opsboard/design-system';
import type { SduiNode, SduiNodeProps } from '../types';

export function BadgeNode({ node }: SduiNodeProps<Extract<SduiNode, { type: 'badge' }>>) {
  return <Badge tone={node.tone}>{node.label}</Badge>;
}
