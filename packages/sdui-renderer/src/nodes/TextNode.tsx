import styled from 'styled-components';
import type { SduiNode, SduiNodeProps } from '../types';

const Body = styled.p`
  margin: 0;
`;

const Muted = styled(Body)`
  color: ${({ theme }) => theme.color.textMuted};
`;

const Heading = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.lg};
`;

export function TextNode({ node }: SduiNodeProps<Extract<SduiNode, { type: 'text' }>>) {
  if (node.variant === 'muted') return <Muted>{node.value}</Muted>;
  if (node.variant === 'heading') return <Heading>{node.value}</Heading>;
  return <Body>{node.value}</Body>;
}
