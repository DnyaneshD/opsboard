import { Button } from '@opsboard/design-system';
import type { SduiNode, SduiNodeProps } from '../types';

export function ButtonNode({ node, onAction }: SduiNodeProps<Extract<SduiNode, { type: 'button' }>>) {
  return (
    <Button
      variant={node.variant}
      onClick={() => {
        if (node.action) onAction(node.action);
      }}
    >
      {node.label}
    </Button>
  );
}
