import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import styles from './Navigation.module.css';

export function Navigation() {
  const idDetails = useAppSelector((state) => state.idDetails.idDetails); //! так достаём данные из redux store

  const location = useLocation();
  console.log('location', location.pathname, location.pathname === `/artwork/${idDetails}`);

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
        {location.pathname === `/artwork/${idDetails}` && (
          <NavLink
            to="/artwork"
            className={({ isActive }) => (isActive ? styles['link-active'] : styles['link'])}
          >
            Artwork
          </NavLink>
        )}
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
