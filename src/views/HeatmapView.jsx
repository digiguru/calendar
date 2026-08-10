import React, { useMemo, useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Tooltip } from '@base-ui/react/tooltip';

export const initialHeatmap = {
  domains: ['Cost', 'Distance', 'Language'],
  areas: [
    { name: 'Spain', scores: [100, 60, 50] },
    { name: 'Thailand', scores: [10, 10, 10] },
    { name: 'Wales', scores: [100, 80, 50] },
  ],
};

export function ratingTone(score) {
  if (score >= 67) return 'good';
  if (score <= 33) return 'poor';
  return 'mixed';
}

export function HeatmapView() {
  const [data, setData] = useState(initialHeatmap);
  const [dialog, setDialog] = useState(null);
  const [name, setName] = useState('');
  const ranking = useMemo(() => data.areas.map((area) => ({ ...area, average: Math.round(area.scores.reduce((a, b) => a + b, 0) / Math.max(area.scores.length, 1)) })).sort((a, b) => b.average - a.average), [data]);

  function submit(event) {
    event.preventDefault();
    const value = name.trim();
    if (!value) return;
    if (dialog === 'area') setData((current) => ({ ...current, areas: [...current.areas, { name: value, scores: current.domains.map(() => 50) }] }));
    if (dialog === 'domain') setData((current) => ({ domains: [...current.domains, value], areas: current.areas.map((area) => ({ ...area, scores: [...area.scores, 50] })) }));
    setName('');
    setDialog(null);
  }

  function updateScore(areaIndex, domainIndex, value) {
    setData((current) => ({ ...current, areas: current.areas.map((area, index) => index === areaIndex ? { ...area, scores: area.scores.map((score, scoreIndex) => scoreIndex === domainIndex ? Number(value) : score) } : area) }));
  }

  return (
    <Tooltip.Provider>
      <section className="page-stack">
        <header className="page-header"><div><p className="eyebrow">Decision support</p><h2>Heatmap</h2><p className="page-description">Compare options against the same criteria. Colour supports the score; it never replaces the number.</p></div><div className="button-row"><button className="button button-secondary" onClick={() => setDialog('domain')}>Add criterion</button><button className="button" onClick={() => setDialog('area')}>Add option</button></div></header>
        <div className="legend" aria-label="Heatmap legend"><span><i className="legend-dot good" />67–100 strong</span><span><i className="legend-dot mixed" />34–66 mixed</span><span><i className="legend-dot poor" />0–33 weak</span></div>
        <div className="heatmap-wrap" tabIndex="0" aria-label="Scrollable comparison matrix">
          <table className="heatmap-table"><thead><tr><th className="sticky-col">Criterion</th>{data.areas.map((area) => <th key={area.name}>{area.name}</th>)}</tr></thead><tbody>{data.domains.map((domain, domainIndex) => <tr key={domain}><th className="sticky-col" scope="row">{domain}</th>{data.areas.map((area, areaIndex) => { const score = area.scores[domainIndex]; return <td key={`${area.name}-${domain}`}><Tooltip.Root><Tooltip.Trigger className={`score-cell ${ratingTone(score)}`} aria-label={`${area.name}, ${domain}: ${score} out of 100`}><input type="number" min="0" max="100" value={score} onChange={(e) => updateScore(areaIndex, domainIndex, e.target.value)} /></Tooltip.Trigger><Tooltip.Portal><Tooltip.Positioner sideOffset={8}><Tooltip.Popup className="tooltip">{area.name} · {domain}: {score}/100</Tooltip.Popup></Tooltip.Positioner></Tooltip.Portal></Tooltip.Root></td>; })}</tr>)}</tbody></table>
        </div>
        <div className="ranking-grid">{ranking.map((area, index) => <article className="ranking-card" key={area.name}><span className="rank">#{index + 1}</span><div><strong>{area.name}</strong><small>Average score</small></div><b>{area.average}</b></article>)}</div>
        <Dialog.Root open={Boolean(dialog)} onOpenChange={(open) => !open && setDialog(null)}><Dialog.Portal><Dialog.Backdrop className="dialog-backdrop" /><Dialog.Popup className="dialog-card"><div className="dialog-heading"><div><Dialog.Title>{dialog === 'area' ? 'Add option' : 'Add criterion'}</Dialog.Title><Dialog.Description>{dialog === 'area' ? 'The new option starts with neutral scores.' : 'Every option starts at 50 for the new criterion.'}</Dialog.Description></div><Dialog.Close className="icon-button" aria-label="Close">×</Dialog.Close></div><form className="form-grid" onSubmit={submit}><label>Name<input autoFocus value={name} onChange={(e) => setName(e.target.value)} required /></label><div className="dialog-actions"><Dialog.Close className="button button-secondary">Cancel</Dialog.Close><button className="button" type="submit">Add</button></div></form></Dialog.Popup></Dialog.Portal></Dialog.Root>
      </section>
    </Tooltip.Provider>
  );
}
