import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header, SidebarProjectItem } from 'components';
import { Icon, IconName } from 'components/icons';

type Breadcrumb = {
  to: string;
  iconName?: IconName;
  text: string | undefined;
};

type Props = {
  children: React.ReactNode;
  className?: string;
  breadcrumbs?: Breadcrumb[];
};

const AuthenticatedPageLayout: React.FC<Props> = ({ children, className, breadcrumbs }) => {
  return (
    <div className="drawer drawer-mobile">
      <aside className="drawer-side flex flex-col bg-base-200 relative">
        <h1 className="text-3xl p-4 italic">OrgaOrga</h1>
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu mt-12 p-4 w-72 text-base-content flex-grow">
          <li>
            <SidebarProjectItem projectId="9CvSuKw4csagC88dezBk" />
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
      <div className="drawer-content">
        <Header>
          {breadcrumbs && (
            <div className="text-sm breadcrumbs p-0">
              <ul>
                {breadcrumbs.map((breadcrumb) => (
                  <li key={`breadcrumb - ${breadcrumb.to}`}>
                    <NavLink to={breadcrumb.to} className="flex items-center gap-2">
                      {breadcrumb.iconName && <Icon name={breadcrumb.iconName} className="h-3 fill-current" />}
                      {breadcrumb.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Header>
        <main className={`flex flex-col px-4 py-2 ${className}`}>{children}</main>
      </div>
    </div>
  );
};

export default AuthenticatedPageLayout;
