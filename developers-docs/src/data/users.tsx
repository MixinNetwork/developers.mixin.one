/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {difference, sortBy} from '../utils/jsUtils';

export type Tag = {
  label: string;
  description: string;
};

export type TagType =
  | 'opensource'
  | 'exchange'
  | 'finance'
  | 'shopping'
  | 'publishing'
  | 'wallet'
  | 'social'
;


export type User = {
  title: string;
  description: string;
  preview: any;
  website: string;
  source: string;
  tags: TagType[];
};

// LIST OF AVAILABLE TAGS
// Available tags to assign to your application
// Please choose widely, we'll remove unappropriate tags
export const Tags = {
  opensource: {
    label: 'Open-Source',
    description: 'Open-Source applications can be useful for inspiration!',
  },
  exchange: {
    label: 'Exchange',
    description: 'Exchange or swap protocols',
  },
  finance: {
    label: 'Finance',
    description: 'Finance products based on Mixin Network.',
  },
  shopping: {
    label: 'Shopping',
    description: 'E-Commerce or shopping services',
  },
  publishing: {
    label: 'Publishing',
    description: 'Publishing service',
  },
  wallet: {
    label: 'Wallet',
    description: 'Crypto Wallet',
  },
  social: {
    label: 'Social',
    description: 'Social network service',
  },
};

// prettier-ignore
const Users = [
  {
    title: '4swap',
    description: 'A decentralized protocol implement for automated liquidity provision on Mixin Network',
    preview: 'images/showcase/4swap.png',
    website: 'https://4swap.org',
    source: null,
    tags: ['exchange'],
  },
  {
    title: 'B.watch',
    description: 'A completely open and transparent fund platform.',
    preview: 'images/showcase/bwatch.png',
    website: 'https://b.watch',
    source: '',
    tags: ['finance'],
  },
  {
    title: 'Pando Leaf',
    description: 'A decentralized financial network, implement a derivatives liquidity protocol.',
    preview: 'images/showcase/leaf.pando.png',
    website: 'https://leaf.pando.im/',
    source: 'https://github.com/fox-one/pando',
    tags: ['finance', 'opensource'],
  },
  {
    title: 'PRSDigg',
    description: ' PRSDigg tries to build a win-win platform for both authors and readers.',
    preview: 'images/showcase/prsdigg.png',
    website: 'https://prsdigg.com/',
    source: 'https://github.com/baizhiheizi/prsdigg',
    tags: ['publishing', 'opensource'],
  },

  /*
  Pro Tip: add your application in alphabetical order.
  Appending your application here (at the end) is more likely to produce Git conflicts.
   */
];

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by name
  result = sortBy(result, (user) => user.title.toLowerCase());
  return result;
}

export const SortedUsers = sortUsers();

// Fail-fast on common errors
function ensureUserValid(user: User) {
  function checkFields() {
    const keys = Object.keys(user);
    const validKeys = [
      'title',
      'description',
      'preview',
      'website',
      'source',
      'tags',
    ];
    const unknownKeys = difference(keys, validKeys);
    if (unknownKeys.length > 0) {
      throw new Error(
        `Site contains unknown attribute names=[${unknownKeys.join(',')}]`,
      );
    }
  }

  function checkTitle() {
    if (!user.title) {
      throw new Error('Site title is missing');
    }
  }

  function checkDescription() {
    if (!user.description) {
      throw new Error('Site description is missing');
    }
  }

  function checkWebsite() {
    if (!user.website) {
      throw new Error('Site url is missing');
    }
    const isHttpUrl =
      user.website.startsWith('http://') || user.website.startsWith('https://');
    if (!isHttpUrl) {
      throw new Error(
        `Site url does not look like a valid url: ${user.website}`,
      );
    }
  }

  function checkPreview() {
    if (
      !user.preview ||
      (user.preview instanceof String &&
        (user.preview.startsWith('http') || user.preview.startsWith('//')))
    ) {
      throw new Error(
        `Site has bad image preview=[${user.preview}].\nThe image should not use remote HTTP or HTTPS URLs`,
      );
    }
  }

  function checkTags() {
    if (
      !user.tags ||
      !(user.tags instanceof Array) ||
      (user.tags as string[]).includes('')
    ) {
      throw new Error(`Bad showcase tags=[${JSON.stringify(user.tags)}]`);
    }
    const unknownTags = difference(user.tags, TagList);
    if (unknownTags.length > 0) {
      throw new Error(
        `Unknown tags=[${unknownTags.join(
          ',',
        )}\nThe available tags are ${TagList.join(',')}`,
      );
    }
  }

  function checkOpenSource() {
    if (typeof user.source === 'undefined') {
      throw new Error(
        "The source attribute is required.\nIf your site is not open-source, please make it explicit with 'source: null'",
      );
    } else {
      const hasOpenSourceTag = user.tags.includes('opensource');
      if (user.source === null && hasOpenSourceTag) {
        throw new Error(
          "You can't add the opensource tag to an application that does not have a link to source code.",
        );
      } else if (user.source && !hasOpenSourceTag) {
        throw new Error(
          "For open-source sites, please add the 'opensource' tag",
        );
      }
    }
  }

  try {
    checkFields();
    checkTitle();
    checkDescription();
    checkWebsite();
    checkPreview();
    checkTags();
    checkOpenSource();
  } catch (e) {
    throw new Error(
      `Showcase application with title=${user.title} contains errors:\n${e.message}`,
    );
  }
}

Users.forEach(ensureUserValid);
