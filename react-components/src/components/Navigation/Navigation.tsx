import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export function Navigation() {
  return (
    <nav className={styles.navigation} data-testid="navigation">
      <span className={styles.navigation__title}>Art Institute of Chicago</span>
      <span className={styles.navigation__links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/artwork"
          className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
        >
          Artwork
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
        >
          About
        </NavLink>
        <NavLink
          to="/forms"
          className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
        >
          Forms
        </NavLink>
      </span>
    </nav>
  );
}
