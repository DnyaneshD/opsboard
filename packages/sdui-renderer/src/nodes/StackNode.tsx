import styled from 'styled-components';
import type { SduiNode, SduiNodeProps } from '../types';
import { SduiRenderer } from '../SduiRenderer';

const Flex = styled.div<{ $direction: 'row' | 'column'; $gap: number }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.space($gap)};
`;

export function StackNode({ node, onAction }: SduiNodeProps<Extract<SduiNode, { type: 'stack' }>>) {
  return (
    <Flex $direction={node.direction ?? 'column'} $gap={node.gap ?? 3}>
      {node.children.map((child, index) => (
        <SduiRenderer key={index} node={child} onAction={onAction} />
      ))}
    </Flex>
  );
}
