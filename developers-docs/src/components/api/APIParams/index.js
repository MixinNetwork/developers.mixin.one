import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const re = /p-([a-zA-Z_]+)/;

function Row({name, value, required}) {
  let requiredEl = '';
  if (required) {
    requiredEl = <div className={styles.required}>
      <Translate>com.api_params.required</Translate>
    </div>
  }
  return (
    <tr className={styles.tr}>
      <th className={clsx(styles.td, styles.th)}>
        <code className={styles.name}>{name}</code>
        {requiredEl}
      </th>
      <td className={styles.td}>{value}</td>
    </tr>
  );
}

function crackProp(propName, propValue) {
  const ret = {}
  const m = re.exec(propName);
  if (m !== null && m.length > 1) {
    const name = m[1];
    const subPropName = propName.slice(name.length + 3)
    ret.name = name;
    if (subPropName.length === 0) {
      ret.value = propValue;
    } else if (subPropName === 'required') {
      ret.required = propValue
    }
    return ret;
  }
  return null;
}

export default function APIParams(props) {
  const rows = [];
  const paramset = {};
  for (const k in props) {
    if (Object.hasOwnProperty.call(props, k)) {
      const prop = props[k];
      const ret = crackProp(k, prop)
      if (ret !== null) {
        if (!Object.hasOwnProperty.call(paramset, ret.name)) {
          paramset[ret.name] = {};
        }
        for (const k2 in ret) {
          if (Object.hasOwnProperty.call(ret, k2)) {
            paramset[ret.name][k2] = ret[k2];
          }
        }
      }
    }
  }
  for (const k in paramset) {
    rows.push({
      name: k,
      value: paramset[k].value || "",
      required: paramset[k].required ? true : false,
    })
  }
  return (
    <section className={clsx('meta-panel', styles.panel)}>
      <h3 className={styles.title}>
        <Translate>com.api_params.parameters</Translate>
      </h3>
      <table className={clsx('meta-panel-table', styles.table)}>
        <tbody className={styles.tbody}>
          {rows.map((row, idx) => (
            <Row key={idx} {...row} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
