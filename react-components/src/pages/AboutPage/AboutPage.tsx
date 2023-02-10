import React from 'react';
import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <main className={styles['about-page']} data-testid="about-page">
      <article className={styles['about-article']}>
        <p className={styles['about-paragraph']}>
          The Art Institute of Chicago shares its singular collections with the world. We collect,
          care for, and interpret works of art across time, cultures, geographies, and identities,
          centering the vision of artists and makers.
        </p>
        <p className={styles['about-paragraph']}>
          Explore thousands of artworks in the museum’s collection — from our renowned icons to
          lesser-known works from every corner of the globe — as well as our books, writings,
          reference materials, and other resources.
        </p>
        <p className={styles['about-paragraph']}>
          The Art Institute of Chicago was founded as both a museum and school for the fine arts in
          1879. Eight major expansions for gallery and administrative space have followed in 1901,
          with the latest being the Modern Wing, which opened in 2009. The permanent collection has
          grown from plaster casts to nearly 300,000 works of art in fields ranging from Chinese
          bronzes to contemporary design and from textiles to installation art.
        </p>
        <p className={styles['about-paragraph']}>Enjoy art with us!</p>
      </article>
    </main>
  );
}
