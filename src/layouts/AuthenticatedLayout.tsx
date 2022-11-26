import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle, Logout } from 'components';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="drawer drawer-mobile">
      <aside className="drawer-side flex flex-col bg-base-200 relative">
        <h1>OrgaOrga</h1>
        <ThemeToggle className="absolute top-2 right-2" />
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu mt-20 p-4 w-72 text-base-content flex-grow">
          <li>
            <p>Sidebar Item 1</p>
          </li>
          <li>
            <p>Sidebar Item 2</p>
          </li>
          <li className="mt-auto">
            <Logout />
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
