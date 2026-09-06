import type { ComponentType } from 'react';
import type { SduiActionHandler, SduiComponentRegistry, SduiNode } from './types';
import { defaultRegistry } from './registry';

export interface SduiRendererProps {
  node: SduiNode;
  onAction?: SduiActionHandler;
  registry?: SduiComponentRegistry;
}

/**
 * Recursively renders a JSON `SduiNode` tree using the given (or default)
 * component registry. Server-driven screens are just data — this is the
 * one place that turns that data into React elements.
 */
export function SduiRenderer({ node, onAction = () => {}, registry = defaultRegistry }: SduiRendererProps) {
  const Component = registry[node.type] as ComponentType<{ node: SduiNode; onAction: SduiActionHandler }>;

  if (!Component) {
    console.warn(`[sdui-renderer] No component registered for node type "${node.type}"`);
    return null;
  }

  return <Component node={node} onAction={onAction} />;
}
