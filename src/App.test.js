import { navigationItems } from './App.jsx';
import { initialHeatmap, ratingTone } from './views/HeatmapView.jsx';

it('exposes the three primary planning tools in navigation', () => {
  expect(navigationItems.map((item) => item.label)).toEqual(['Calendar', 'Team Slider', 'Heatmap']);
  expect(navigationItems.every((item) => item.path.startsWith('/'))).toBe(true);
});

it('maps heatmap scores to semantic, non-colour-only states', () => {
  expect(ratingTone(90)).toBe('good');
  expect(ratingTone(50)).toBe('mixed');
  expect(ratingTone(20)).toBe('poor');
});

it('keeps every heatmap option aligned with every criterion', () => {
  expect(initialHeatmap.areas.every((area) => area.scores.length === initialHeatmap.domains.length)).toBe(true);
});
