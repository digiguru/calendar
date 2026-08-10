import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Dialog } from '@base-ui/react/dialog';

function NavItems({ items, onNavigate }) {
  return (
    <nav className="app-nav" aria-label="Primary navigation">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
        >
          <span className="nav-item-label">{item.label}</span>
          <span className="nav-item-hint">{item.hint}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function AppShell({ items }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">RC</div>
          <div>
            <p className="eyebrow">Planning workspace</p>
            <h1>Resource Calendar</h1>
          </div>
        </div>
        <NavItems items={items} />
        <div className="sidebar-note">
          <strong>Plan with context.</strong>
          <span>Capacity, team assumptions and trade-offs in one workspace.</span>
        </div>
      </aside>

      <div className="mobile-header">
        <div>
          <p className="eyebrow">Planning workspace</p>
          <strong>Resource Calendar</strong>
        </div>
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="button button-secondary" aria-label="Open navigation">Menu</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="dialog-backdrop" />
            <Dialog.Popup className="mobile-menu-dialog">
              <div className="dialog-heading">
                <Dialog.Title>Navigate</Dialog.Title>
                <Dialog.Close className="icon-button" aria-label="Close navigation">×</Dialog.Close>
              </div>
              <NavItems items={items} onNavigate={() => setMenuOpen(false)} />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  );
}
