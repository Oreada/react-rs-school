import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export class Navigation extends React.Component {
  render(): ReactNode {
    return (
      <nav className="h-[50px] flex justify-between items-center px-5 bg-lime-900 text-white">
        <span className="font-bold">RS-SCHOOL REACT</span>
        <span className="flex gap-5">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'link-active' : 'link')} end>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'link-active' : 'link')}>
            About
          </NavLink>
        </span>
      </nav>
    );
  }
}
