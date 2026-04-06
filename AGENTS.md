# AGENTS.md

## 目的

このファイルは、このリポジトリで作業する AI / 実装者向けの最優先ガイドである。

詳細は `_docs/` を参照する。
ただし、最初に外してはいけない条件はこのファイルに固定する。

## 必須技術スタック

このプロジェクトでは次を必須とする。

### Frontend

- route entry は Astro
- UI component は React
- component 仕様確認は Storybook
- 最終確認は E2E

### Backend

- external interface は NestJS
- API 契約は OpenAPI
- API 境界は DTO
- backend は DDD の `interface / application / domain / infrastructure`

## 代替禁止

次は認めない。

- Astro の代わりに Vite SPA を採用する
- Storybook を作らず page 実装で UI を確定する
- E2E なしで画面完了とする
- NestJS の代わりに Express 単体で API を作る
- OpenAPI なしで API を作る
- DTO を省略して Domain 型を API へ直接出す

## ディレクトリ規約

### Frontend

```text
frontend/
  src/
    pages/        # Astro route entry
    components/   # 表示部品
    containers/   # backend/application 接続
  stories/        # Storybook stories
```

### Backend

```text
backend/
  src/
    <domain>/
      interface/
        logic/
          controllers/
          dto/
          openapi/
      application/
        logic/
      domain/
        logic/
      infrastructure/
        logic/
```

### Tests

- UT は実装近傍
- IT は `tests/it/`
- E2E は `tests/e2e/`

## UI ルール

- UI にビジネスルールを持ち込まない
- UI が持ってよいのは UX 上必要な判定だけ
- page 全体 Story は作らない
- Story は component 単位で作る
- Story で確定した component を page に配置する

## Props ルール

- props は表示契約として使う
- 業務判定の過程を props で渡さない
- backend で確定した結果だけを UI に渡す
- component から API を直接呼ばない

## Primitive ルール

- 業務上意味のある値に primitive を直接使わない
- `string` や `number` を業務概念の代用品にしない
- DTO / 永続化境界で一時的に primitive を使うのは可

## 実装順序

### Backend

1. domain 構造を作る
2. `backend/src/<domain>/interface/logic/openapi/` に OpenAPI を置く
3. DTO を作る
4. application / domain / port を作る
5. NestJS controller / module で接続する
6. UT を置く
7. IT を `tests/it/` に置く

### Frontend

1. Astro route entry を作る
2. 元 HTML などを component に分解する
3. React component を作る
4. `frontend/stories/` に Story を作る
5. Story で state 差分と描画を確認する
6. container を作る
7. Astro page に配置する
8. `tests/e2e/` で最終確認する

## 完了条件

次が欠けている状態で完了と言ってはならない。

- frontend に Astro route entry がある
- frontend に React components がある
- frontend/stories がある
- tests/e2e がある
- backend に NestJS controller / module がある
- backend/src/<domain>/interface/logic/openapi/ がある
- DTO が API 境界にある

## 自動差し戻し条件

次のどれかに当てはまる場合、完了扱いにせず差し戻す。

- `application/logic` が `@nestjs/` を import している
- `application/logic` が `infrastructure/logic` を import している
- `domain/logic` が `@nestjs/` など framework を import している
- `domain/logic` に `*.spec.*` が 0 件
- `tests/it/` に placeholder test しかない
- `frontend/stories/` に `Input` `Button` `Field` 相当の Story がない
- Domain / Application に `userId: string` のような業務値 primitive が残っている

placeholder test の例:

- `assert.equal(true, true)`
- 何も検証していない smoke test
- 実際の API 契約や Domain 条件に触れていない空テスト

Story 粒度の最低条件:

- `Input`
- `Button`
- `Field`

少なくとも上記に相当する小粒 component Story が存在しない場合、複合 component の Story だけでは未達とする。

## レビュー順序

1. `application/logic` の framework import を確認する
2. `application/logic` の infrastructure import を確認する
3. `domain/logic` の framework import を確認する
4. `domain/logic` の `*.spec.*` 有無を確認する
5. `frontend/stories/` に小粒 Story があるか確認する
6. `tests/it/` が placeholder でないか確認する
7. その後で技術スタック、OpenAPI、E2E、見た目を確認する

## 参照先

- `_docs/110_codingRules/required-stack-rules.md`
- `_docs/110_codingRules/implementation-workflow-rules.md`
- `_docs/110_codingRules/conformance-checklist.md`
- `_docs/110_codingRules/ui-rules.md`
- `_docs/110_codingRules/props-rules.md`
- `_docs/110_codingRules/frontend-structure-rules.md`
- `_docs/110_codingRules/sample-directory-trees.md`
- `_samples/reference-login/README.md`

## Reference Implementation

Before implementing a new feature, read the reference sample below.
If the implementation structure is ambiguous, follow this sample first and then adapt it.

- [reference-login](D:/application/ddd_design_v2/_samples/reference-login/README.md)
