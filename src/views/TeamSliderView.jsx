import React, { useState } from 'react';
import { Slider } from '@base-ui/react/slider';
import { Defaults } from '../defaults/DefaultTeamSlider.js';

function SliderField({ label, value, min, max, step = 1, suffix = '', onChange }) {
  return (
    <div className="slider-card">
      <div className="slider-heading"><div><h3>{label}</h3><span>{min}{suffix} — {max}{suffix}</span></div><strong>{value}{suffix}</strong></div>
      <Slider.Root value={value} min={min} max={max} step={step} onValueChange={(next) => onChange(Number(next))}>
        <Slider.Control className="slider-control">
          <Slider.Track className="slider-track"><Slider.Indicator className="slider-indicator" /><Slider.Thumb className="slider-thumb" aria-label={label} /></Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}

export function TeamSliderView() {
  const defaults = Defaults.GetState();
  const [state, setState] = useState(defaults);
  const monthlyCost = state.teamcount * state.teamsize * state.cost;
  const effectivePeople = state.teamcount * state.teamsize * (state.efficiency / 100);

  return (
    <section className="page-stack">
      <header className="page-header"><div><p className="eyebrow">Scenario modelling</p><h2>Team Slider</h2><p className="page-description">Change the assumptions and see the operating shape of the team immediately.</p></div><button className="button button-secondary" onClick={() => setState(defaults)}>Reset</button></header>
      <div className="stats-grid"><article className="stat-card"><span>People</span><strong>{state.teamcount * state.teamsize}</strong></article><article className="stat-card"><span>Effective capacity</span><strong>{effectivePeople.toFixed(1)}</strong></article><article className="stat-card"><span>Monthly cost</span><strong>£{monthlyCost.toLocaleString()}</strong></article></div>
      <div className="two-column-grid">
        <div className="stack-card">
          <SliderField label="People per team" value={state.teamsize} min={1} max={12} onChange={(teamsize) => setState({ ...state, teamsize })} />
          <SliderField label="Number of teams" value={state.teamcount} min={1} max={8} onChange={(teamcount) => setState({ ...state, teamcount })} />
          <SliderField label="Efficiency" value={state.efficiency} min={20} max={100} suffix="%" onChange={(efficiency) => setState({ ...state, efficiency })} />
          <SliderField label="Cost per person" value={state.cost} min={3000} max={20000} step={500} suffix="" onChange={(cost) => setState({ ...state, cost })} />
        </div>
        <article className="insight-card"><p className="eyebrow">Scenario</p><h3>{state.teamcount} team{state.teamcount === 1 ? '' : 's'} × {state.teamsize} people</h3><p>At {state.efficiency}% efficiency, the model gives roughly <strong>{effectivePeople.toFixed(1)} effective people</strong> for <strong>£{monthlyCost.toLocaleString()}</strong> per month.</p><div className="meter"><span style={{ width: `${state.efficiency}%` }} /></div><small>Use this as a comparison tool, not a promise: delivery still depends on scope, skills and dependencies.</small></article>
      </div>
    </section>
  );
}
