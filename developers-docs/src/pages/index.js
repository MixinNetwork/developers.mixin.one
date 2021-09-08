import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx("container", styles.container)}>
        <div className={clsx("text-part", styles.left)}>
          <h1 className={clsx("hero__title", styles.title)}> Build any decentralized applications on Mixin </h1>
          <ul className={clsx("hero__subtitle", styles.subtitle)}>
            <li className={styles.subtitle_li}>
              <span>🛡️ </span>
              <strong>
                <Translate>features.secure</Translate>
              </strong>
              <Translate>features.secure.text</Translate>
            </li>
            <li className={styles.subtitle_li}>
              <span>⚡️ </span>
              <strong>Fast</strong> - More than 1,000,000 TPS capacity with a final confirmation time of under 1 second.
            </li>
            <li className={styles.subtitle_li}>
              <span>🔋 </span>
              <strong>Powerful</strong> - Supported 32 blockchians, such as BTC, ETH, XMR.
            </li>
            <li className={styles.subtitle_li}>
              <span>🆓 </span>
              <strong>Free</strong> - No transaction fee.
            </li>
            <li className={styles.subtitle_li}>
              <span>🔐 </span>
              <strong>Privacy</strong> - End to end encrypted messages.
            </li>
          </ul>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--primary button--lg', styles.button)}
              to="/introduction">
              Get Started
            </Link>
            <br/>
            <Link
              className={clsx('button button--secondary button--lg', styles.button)}
              to="/api-overview">
              API Reference
            </Link>
          </div>
        </div>
        <div className={clsx("image-part", styles.right)}>
          <img src="/docs/img/home_head.svg" class="main-bg" />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
