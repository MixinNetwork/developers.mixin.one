import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';

export default function APIPayload(props) {
  return (
    <div className={styles.container}>
      <h3>
        <Translate>com.api_payload</Translate>
      </h3>
      <CodeBlock className={`language-json`}>
        { props.children }
      </CodeBlock>
    </div>
  );
}
