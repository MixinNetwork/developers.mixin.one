---
title: サークル一覧の読み込み
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircles from "../../_partials/_resp.circles.md";

## GET /circles

ユーザーが参加しているすべてのサークルを取得します。

<APIEndpoint url="/circles" />

<APIMetaPanel scope="CIRCLES:READ" />

<APIRequest title="Get Circles" url="/circles" />

<RespCircles />
