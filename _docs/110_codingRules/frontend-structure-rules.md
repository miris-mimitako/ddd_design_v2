# Frontend Structure Rules

## 目的

この文書は、frontend における `components/` `stories/` `pages/` `containers/` の責務と依存方向を定義する。

## 基本原則

- UI はコンポーネント単位で Storybook から構築する
- ページは確定済みコンポーネントの配置場所であり、仕様の正本ではない
- backend や application との接続は `containers/` に集約する
- `components/` は表示責務に集中する

## 推奨構造

```text
frontend/
  components/
  containers/
  pages/
  stories/
```

必要なら各機能単位で同じ構造を繰り返してよい。

例:

```text
frontend/
  user-registration/
    components/
    containers/
    pages/
    stories/
```

## `components/`

### 役割

- 表示コンポーネントを置く
- props 契約に従って描画する
- 状態差分に応じて見た目を切り替える
- できる限り小さな UI 契約へ分解する

### 含めてよいもの

- 表示ロジック
- props に基づく表示分岐
- UI state による活性制御
- 純粋なイベント通知

### 含めてはいけないもの

- API 呼び出し
- backend との直接接続
- 業務ルール判定
- 画面遷移の主制御

### 例

- `Button`
- `TextInput`
- `FieldLabel`
- `UserForm`
- `OrderSummaryCard`

### 分解ルール

- 1 component に複数の主要表示責務がある場合は分割を検討する
- 入力欄、ラベル、ボタン、カード、ステータス表示などは独立した Story 候補として扱う
- `Form` や `Panel` のような複合 component は、より小さな component を組み合わせて作る

## `stories/`

### 役割

- `components/` の Story を置く
- props 契約と状態差分を確認する
- 描画テストの起点にする

### 含めてよいもの

- component ごとの Story
- loading、error、disabled などの状態差分
- イベントハンドラのダミー定義
- 最小限の fixture

### 含めてはいけないもの

- 画面全体 Story
- 複数ページをまたぐ統合仕様
- backend の正当性確認

### ルール

- 1 Story は 1 component の契約確認に集中する
- props を増やしたら Story も更新する
- Story で確認すべき状態差分を省略しない
- Story の最小単位は、小さな UI 契約を持つ component を基本とする
- 複合 component に Story を置く場合も、内部の主要 component が Story を持つか確認する
- Story 一式を見たときに、画面を組み立てる最小部品まで辿れる状態にする

## `containers/`

### 役割

- backend や application と UI を接続する
- DTO、ViewModel、UI state を component props へ変換する
- ページ単位または機能単位の状態管理を行う

### 含めてよいもの

- API 呼び出しの起点
- application 呼び出し
- response から props への変換
- 表示用 state 管理
- 画面遷移の起点制御

### 含めてはいけないもの

- domain ルールの再実装
- 複雑な表示 markup
- 汎用表示部品の定義

### ルール

- container は component に props を渡す
- component から backend を直接呼ばせない
- container は必要以上に巨大化させない

## `pages/`

### 役割

- route ごとの画面エントリを置く
- container と page layout を束ねる
- ページ構成を定義する

### 含めてよいもの

- route エントリ
- page layout
- container の配置
- SEO やメタ情報などページ単位設定

### 含めてはいけないもの

- component 仕様の正本化
- 業務判定
- API 呼び出し詳細

### ルール

- `pages/` は薄く保つ
- ページで新しい UI 仕様を発明しない
- Story で確定していない部品を直接作り込まない

## 依存方向

依存方向は次に固定する。

- `pages/` -> `containers/`
- `containers/` -> `components/`
- `stories/` -> `components/`

原則として避ける依存:

- `components/` -> `containers/`
- `components/` -> backend client
- `stories/` -> `pages/`
- `stories/` -> `containers/` を前提にした統合 Story

## 実装フロー

1. 元 HTML から必要 component を洗い出す
2. `components/` に小さな部品を作る
3. `stories/` に状態差分を作る
4. 小さな部品を組み合わせて複合 component を作る
5. Story 上で描画と props 契約を確認する
6. `containers/` でデータ接続する
7. `pages/` へ配置する
8. `tests/e2e/` で最終確認する

## 命名ルール

- `components/` は表示物の名詞で命名する
- `containers/` は画面責務や機能責務で命名する
- `pages/` は route や画面名で命名する
- `stories/` は対応 component 名に揃える

例:

- `components/UserForm.tsx`
- `containers/UserRegistrationContainer.tsx`
- `pages/user-registration.tsx`
- `stories/UserForm.stories.tsx`

## 禁止事項

- `components/` で fetch する
- `pages/` で業務 if を増やす
- `stories/` を画面統合テストの代わりに使う
- `containers/` に汎用 UI 部品を作る
- `Form` や `Panel` のような大きな塊だけに Story を持たせ、内部部品の Story を持たない
