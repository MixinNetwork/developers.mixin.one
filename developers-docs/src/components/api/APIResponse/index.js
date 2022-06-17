import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';
import responses from './responses.js';

function getCode(name) {
  if (responses.hasOwnProperty(name)) {
    return responses[name];
  }
  return 'None'
}

export default function APIResponse({title, name}) {
  const _title = title ? <h3>title</h3> : '';
  const code = getCode(name)
  return (
    <div className={styles.container}>
      {_title}
      <CodeBlock className={`language-json`}>
          {code}
      </CodeBlock>
    </div>
  );
}
