import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

export default function APIPayload(props) {
  console.log(props)
  return (
    <div className={styles.container}>
      <h3>Payload</h3>
      <CodeBlock className={`language-json`}>
        { props.children }
      </CodeBlock>
    </div>
  );
}
