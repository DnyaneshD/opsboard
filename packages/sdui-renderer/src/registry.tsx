import type { SduiComponentRegistry } from './types';
import { StackNode } from './nodes/StackNode';
import { CardNode } from './nodes/CardNode';
import { TextNode } from './nodes/TextNode';
import { MetricNode } from './nodes/MetricNode';
import { BadgeNode } from './nodes/BadgeNode';
import { TableNode } from './nodes/TableNode';
import { ButtonNode } from './nodes/ButtonNode';

/**
 * Maps each SDUI node `type` to the component that renders it. Consumers
 * can spread this and override or add entries to extend the schema
 * without forking the renderer.
 */
export const defaultRegistry: SduiComponentRegistry = {
  stack: StackNode,
  card: CardNode,
  text: TextNode,
  metric: MetricNode,
  badge: BadgeNode,
  table: TableNode,
  button: ButtonNode,
};
