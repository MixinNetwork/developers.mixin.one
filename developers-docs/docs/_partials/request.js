import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './request.module.css';

export default function Request({title, url, method, isPublic}) {
  return (
    <div className="request">
      <h3>Example requests</h3>
      <CodeBlock className={`language-bash`} title={title}>
curl -i -X {method || 'GET'} -H "Content-Type: application/json"
          {isPublic ? ' ' : ' -H "Bearer: $TOKEN"'}
          {` $API_BASE${url}`}
      </CodeBlock>
    </div>
  );
}
