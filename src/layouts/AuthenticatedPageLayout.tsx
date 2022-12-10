import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'components/icons';
import BaseLayout from './BaseLayout';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AuthenticatedPageLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <BaseLayout>
      <div className="drawer drawer-mobile">
        <aside className="drawer-side flex flex-col bg-base-200 relative">
          <h1 className="text-3xl p-4 italic">OrgaOrga</h1>
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu mt-12 p-4 w-72 text-base-content flex-grow">
            <li>
              <NavLink to="/projects/9CvSuKw4csagC88dezBk" className="flex items-center">
                <Icon name="flask" className="h-5 fill-current" />
                <span>Colon Age</span>
              </NavLink>
            </li>
            <li className="mt-auto">
              <NavLink to="/logout" className="flex items-center">
                <Icon name="exit" className="h-5 fill-current" />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </aside>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <main className={`drawer-content flex flex-col ${className}`}>{children}</main>
      </div>
    </BaseLayout>
  );
};

export default AuthenticatedPageLayout;
