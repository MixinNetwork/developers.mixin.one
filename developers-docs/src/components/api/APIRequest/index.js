import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';

export default function Request({title, url, method, isPublic, base}) {
  const apiBase = base || 'https://api.mixin.one';
  return (
    <div className="request">
      <h3>
        <Translate>com.api_request</Translate>
      </h3>
      <CodeBlock className={`language-bash`}>
curl -i -X {method || 'GET'} -H "Content-Type: application/json"
          {isPublic ? ' ' : ' -H "Bearer: $TOKEN"'}
          {` ${apiBase}${url}`}
      </CodeBlock>
    </div>
  );
}
