# Test Layering Rules

## 目的

この文書は、どの層で何を確認するかを固定する。

## Domain

ここで確認するもの:

- 不変条件
- 計算
- 状態遷移
- 禁止条件

ここで確認しないもの:

- DB 保存
- 外部 API 呼び出し
- UI 表示

保存場所:

- `backend/<domain>/domain/logic/...`

必須条件:

- Domain 実装を追加したら domain 近傍に `*.spec.*` を追加する
- 値オブジェクト、エンティティ、集約のいずれかを直接検証する
- Domain にテストが 0 件の状態で完了扱いにしない

## Application

ここで確認するもの:

- ユースケースの流れ
- port 呼び出しの選択
- 成功時と失敗時の分岐

ここで確認しないもの:

- ドメインルールの詳細な再検証
- repository 実装の内部仕様

保存場所:

- `backend/<domain>/application/logic/...`

## Contract

ここで確認するもの:

- port 契約
- 例外変換
- シリアライズ、デシリアライズ

ここで確認しないもの:

- ユースケースの業務判断
- 画面表示

保存場所:

- `tests/it/...`

## UI

ここで確認するもの:

- 入力
- 表示
- 操作可能性
- Storybook 上の状態差分
- コンポーネント描画

ここで確認しないもの:

- 中核業務ルール
- 永続化契約
- 画面全体 Story による統合確認

保存場所:

- frontend 側の対象実装近傍、または `tests/e2e/...`

## 禁止事項

- 同じ振る舞いを全層で重複検証しない
- UI テストで業務仕様の正本を持たない
- contract test を unit test の代わりに使わない
- UT を `tests/it` や `tests/e2e` に混ぜない
- Domain 実装を Application test だけで間接的にしか検証しない
