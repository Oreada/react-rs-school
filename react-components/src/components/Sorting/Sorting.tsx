import React from 'react';
import styles from './Sorting.module.css';

export function Sorting() {
  return (
    <div>
      <select className={styles['sorting-select']} id="sorting-select" data-testid="sorting-select">
        <option value="">--Select the sorting method--</option>
        <option value="title-ascending">Title ascending</option>
        <option value="title-descending">Title descending</option>
        <option value="author-ascending">Author&apos;s name ascending</option>
        <option value="author-descending">Author&apos;s name descending</option>
        <option value="date-ascending">Date ascending</option>
        <option value="date-descending">Date descending</option>
      </select>
    </div>
  );
}
