import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';


export default function APIMetaPanel({scope, scopeNote, limitation}) {
  let authBlock = null;
  if (scope) {
    authBlock =
      <div>
        <code>{scope ? scope: '-'}</code>
        {scopeNote && <span>; {scopeNote}</span> }
      </div>
  } else {
    authBlock = <span>
      <Translate>com.api_metapanel.public</Translate>
    </span>
  }
  return (
    <section className={clsx('meta-panel', styles.panel)}>
      <h3 className={styles.title}>
        <Translate>com.api_metapanel</Translate>
      </h3>
      <table className={clsx('meta-panel-table', styles.table)}>
        <tbody className={styles.tbody}>
          <tr className={styles.tr}>
            <th className={clsx("meta-panel-cell", styles.td, styles.th)}>
              <Translate>com.api_metapanel.authorization</Translate>
            </th>
            <td className={clsx("meta-panel-cell", styles.td)}>{authBlock}</td>
          </tr>
          <tr className={styles.tr}>
            <th className={clsx("meta-panel-cell", styles.td, styles.th)}>
              <Translate>com.api_metapanel.limitation</Translate>
            </th>
            <td className={clsx("meta-panel-cell", styles.td)}>{limitation ? limitation : 'No limitation'}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
