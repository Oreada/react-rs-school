import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import styles from './Navigation.module.css';

export function Navigation() {
  const idDetails = useAppSelector((state) => state.idDetails.idDetails); //! так достаём данные из redux store

  const location = useLocation();
  // console.log('location', location.pathname, location.pathname === `/artwork/${idDetails}`);

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.container}>
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
              <span className={styles.navigation__artwork}>Artwork</span>
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
              Orders
            </NavLink>
          </span>
        </nav>
      </div>
    </div>
  );
}
