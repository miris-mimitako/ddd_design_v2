# Props Rules

## 目的

この文書は、UI コンポーネント間の props 受け渡しルールを定義する。

## 基本原則

- props は表示と操作に必要な最小限に絞る
- 業務判断は props で渡さない
- コンポーネント境界では意味のある名前を使う
- primitive の羅列で意味を失わせない

## props 設計ルール

### 1. 表示責務を渡す

props は次のような UI 責務を渡すために使う。

- 表示データ
- 表示状態
- 活性状態
- イベントハンドラ

良い例:

- `label`
- `items`
- `isLoading`
- `isDisabled`
- `onSubmit`

### 2. 業務判定結果を渡す

UI には業務判定の過程ではなく、必要なら backend で確定した結果だけを渡す。

許可例:

- `canSubmit` が backend 判定結果として渡される
- `errorMessage` が application 経由の表示用文言として渡される

禁止例:

- `age` と `planType` を props で渡して子コンポーネント内で登録可否を判定する
- `orderStatus` を見て子コンポーネントで出荷可否の業務判定を持つ

### 3. primitive の生渡しを避ける

意味のある値は props 上でも意味を保つ。

悪い例:

- `value1`
- `value2`
- `flag`
- `type`

良い例:

- `emailAddressText`
- `submitButtonLabel`
- `isReadonly`
- `displayMode`

補足:

- UI 層では描画都合の primitive は許可する
- ただし意味のない省略名は避ける

### 4. callback は UI 操作で命名する

callback は業務処理名ではなく、UI 操作として命名する。

良い例:

- `onClickSave`
- `onChangeKeyword`
- `onCloseDialog`

避ける例:

- `executeBusinessRule`
- `runValidation`
- `saveToDatabase`

### 5. 子から親へ業務概念を逆流させない

- 子コンポーネントは必要以上に親の domain 都合を知らない
- props は描画契約として保つ
- Domain オブジェクトそのものを深く子へ渡し回さない

## コンテナと表示コンポーネント

- backend や application との接続はコンテナ側で行う
- 表示コンポーネントは props を受けて描画に集中する
- 表示コンポーネントの中で API 呼び出しや業務判定をしない
- `containers/` と `components/` の責務分離は `frontend-structure-rules.md` に従う

## Story との関係

- Story は props 契約の確認場所として使う
- 主要 props の状態差分ごとに Story を持つ
- props 追加時は Story も更新する
- 小さな component ほど props 契約が明確に読める状態を目指す
- 内部 state が多い component は Story の最小単位として不適切かを見直す

## 禁止事項

- 1 つの props オブジェクトに責務を詰め込みすぎる
- 子コンポーネントへ不要な情報を丸ごと渡す
- props 名に backend 実装用語を混ぜる
- props を使って UI 側で業務ルールを再構成する
