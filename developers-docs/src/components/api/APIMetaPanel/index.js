import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function APIMetaPanel({scope, scopeNote, limitation}) {
  let authBlock = null;
  if (scope) {
    authBlock =
      <div>
        <code>{scope ? scope: '-'}</code>
        {scopeNote && <span>; {scopeNote}</span> }
      </div>
  } else {
    authBlock = <span>Public Access</span>
  }
  return (
    <section className={clsx('meta-panel', styles.panel)}>
      <h3 className={styles.title}>Authentication and options</h3>
      <table className={clsx('meta-panel-table', styles.table)}>
        <tbody className={styles.tbody}>
          <tr className={styles.tr}>
            <th className={clsx("meta-panel-cell", styles.td, styles.th)}>Authorization</th>
            <td className={clsx("meta-panel-cell", styles.td)}>{authBlock}</td>
          </tr>
          <tr className={styles.tr}>
            <th className={clsx("meta-panel-cell", styles.td, styles.th)}>Limitation</th>
            <td className={clsx("meta-panel-cell", styles.td)}>{limitation ? limitation : 'No limitation'}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
