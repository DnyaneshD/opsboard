import { Card, CardHeader, CardTitle } from '@opsboard/design-system';
import type { SduiNode, SduiNodeProps } from '../types';
import { SduiRenderer } from '../SduiRenderer';

export function CardNode({ node, onAction }: SduiNodeProps<Extract<SduiNode, { type: 'card' }>>) {
  return (
    <Card>
      {node.title ? (
        <CardHeader>
          <CardTitle>{node.title}</CardTitle>
        </CardHeader>
      ) : null}
      {node.children.map((child, index) => (
        <SduiRenderer key={index} node={child} onAction={onAction} />
      ))}
    </Card>
  );
}
