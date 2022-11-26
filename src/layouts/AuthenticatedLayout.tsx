import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from 'components';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="drawer drawer-mobile">
      <aside className="drawer-side bg-base-200">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ThemeToggle />
        <ul className="menu p-4 w-80 text-base-content">
          <li>
            <p>Sidebar Item 1</p>
          </li>
          <li>
            <p>Sidebar Item 2</p>
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
