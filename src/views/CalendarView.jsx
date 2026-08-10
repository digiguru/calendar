import React, { useMemo, useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Defaults } from '../defaults/DefaultProjects.js';

function loadProjects() {
  try {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : Defaults.Projects;
  } catch {
    return Defaults.Projects;
  }
}

function loadAssignments() {
  try {
    const saved = localStorage.getItem('projectUsers');
    return saved ? JSON.parse(saved) : Defaults.ProjectUsers;
  } catch {
    return Defaults.ProjectUsers;
  }
}

function capacityLabel(value) {
  return `${Math.round(Number(value) * 100)}%`;
}

export function CalendarView() {
  const [projects, setProjects] = useState(loadProjects);
  const [assignments] = useState(loadAssignments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState({ name: '', capacity: '0.5', estimate: '4' });

  const peopleCount = useMemo(() => new Set(assignments.map((item) => item.person)).size, [assignments]);
  const totalCapacity = useMemo(
    () => assignments.reduce((sum, item) => sum + Number(item.capacity || 0), 0),
    [assignments],
  );

  function addProject(event) {
    event.preventDefault();
    const name = draft.name.trim();
    if (!name) return;
    const now = new Date();
    const ready = new Date(now);
    ready.setDate(now.getDate() + 28);
    const next = [
      ...projects,
      {
        name,
        capacity: draft.capacity,
        estimate: Number(draft.estimate),
        efficency: '70%',
        startDate: now.toISOString().slice(0, 10),
        readyDate: ready.toISOString().slice(0, 10),
      },
    ];
    setProjects(next);
    localStorage.setItem('projects', JSON.stringify(next));
    setDraft({ name: '', capacity: '0.5', estimate: '4' });
    setDialogOpen(false);
  }

  return (
    <section className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Capacity planning</p>
          <h2>Calendar</h2>
          <p className="page-description">See active projects, team allocation and delivery windows without losing the planning context.</p>
        </div>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger className="button">Add project</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="dialog-backdrop" />
            <Dialog.Popup className="dialog-card">
              <div className="dialog-heading">
                <div>
                  <Dialog.Title>New project</Dialog.Title>
                  <Dialog.Description>Add a lightweight planning record. You can refine it later.</Dialog.Description>
                </div>
                <Dialog.Close className="icon-button" aria-label="Close">×</Dialog.Close>
              </div>
              <form className="form-grid" onSubmit={addProject}>
                <label>Project name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required /></label>
                <label>Capacity<select value={draft.capacity} onChange={(e) => setDraft({ ...draft, capacity: e.target.value })}><option value="0.25">25%</option><option value="0.5">50%</option><option value="0.75">75%</option><option value="1">100%</option></select></label>
                <label>Estimate<input type="number" min="1" value={draft.estimate} onChange={(e) => setDraft({ ...draft, estimate: e.target.value })} /></label>
                <div className="dialog-actions"><Dialog.Close className="button button-secondary">Cancel</Dialog.Close><button className="button" type="submit">Create project</button></div>
              </form>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </header>

      <div className="stats-grid">
        <article className="stat-card"><span>Active projects</span><strong>{projects.length}</strong></article>
        <article className="stat-card"><span>People</span><strong>{peopleCount}</strong></article>
        <article className="stat-card"><span>Allocated capacity</span><strong>{totalCapacity.toFixed(1)} FTE</strong></article>
      </div>

      <div className="calendar-grid">
        {projects.map((project) => {
          const projectAssignments = assignments.filter((item) => item.project === project.name);
          return (
            <article className="project-card" key={project.name}>
              <div className="project-card-heading">
                <div><span className="status-dot" aria-hidden="true" /><h3>{project.name}</h3></div>
                <span className="badge">{capacityLabel(project.capacity)}</span>
              </div>
              <div className="date-range"><span>{project.startDate}</span><span aria-hidden="true">→</span><span>{project.readyDate}</span></div>
              <dl className="project-meta"><div><dt>Estimate</dt><dd>{project.estimate}</dd></div><div><dt>Efficiency</dt><dd>{project.efficency}</dd></div></dl>
              <div className="people-list" aria-label={`People assigned to ${project.name}`}>
                {projectAssignments.length ? projectAssignments.map((item) => <span className="person-chip" key={`${item.person}-${item.project}`}>{item.person} · {capacityLabel(item.capacity)}</span>) : <span className="muted">No people assigned yet</span>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
