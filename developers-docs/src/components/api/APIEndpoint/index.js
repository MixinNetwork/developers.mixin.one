import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';

export default function APIEndpoint({url, base, method}) {
  const apiBase = base || 'https://api.mixin.one';
  return (
    <div className={styles.container}>
      <h3>
        <Translate>com.api_endpoint</Translate>
      </h3>
      <CodeBlock className={`language-sass`}>
          {method} {`${apiBase}${url}`}
      </CodeBlock>
    </div>
  );
}
