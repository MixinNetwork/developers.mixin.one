import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

export default function APIEndpoint({url, base}) {
  const apiBase = base || 'https://api.mixin.one';
  return (
    <div className={styles.container}>
      <h3>Endpoint URL</h3>
      <CodeBlock className={`language-sass`}>
          {`${apiBase}${url}`}
      </CodeBlock>
    </div>
  );
}
