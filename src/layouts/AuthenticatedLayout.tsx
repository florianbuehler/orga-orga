import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ThemeToggle } from 'components';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="drawer drawer-mobile">
      <aside className="drawer-side flex flex-col bg-base-200 relative">
        <h1 className="text-3xl p-4 italic">OrgaOrga</h1>
        <ThemeToggle className="absolute top-2 right-2" />
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu mt-12 p-4 w-72 text-base-content flex-grow">
          <li>
            <p>Sidebar Item 1</p>
          </li>
          <li>
            <p>Sidebar Item 2</p>
          </li>
          <li className="mt-auto">
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </aside>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <main className="drawer-content flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
