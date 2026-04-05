# Test Rules

## 目的

このディレクトリには、テストを仕様の実行可能表現として維持するためのルールを置く。

このプロジェクトでは次を原則とする。

- 文書は意図と制約を持つ
- テストは振る舞いを持つ
- コードは実現方法を持つ

したがって、`120_testRules` は「何をどの粒度で、どういう名前で、どの層に書くか」を定義する場所である。

## テストの責務

### Domain Test

最重要のテスト。
業務ルールの振る舞いを固定する。

対象:

- 値オブジェクト
- エンティティ
- 集約
- ドメインサービス

含めるもの:

- ルールの成立条件
- ルール違反時の失敗
- 境界値
- 不変条件

含めないもの:

- DB 接続
- HTTP 通信
- UI 操作
- フレームワーク起動

### Application Test

ユースケースの流れを固定する。

対象:

- ユースケース
- アプリケーションサービス
- コマンドハンドラ

含めるもの:

- 入力から結果までの流れ
- repository / gateway / notification の呼び分け
- 成功時と失敗時の分岐
- トランザクション境界の期待

含めないもの:

- ドメインルールの再定義
- UI の細かい表示確認

### Contract Test

Port 契約を infrastructure 実装が守るか確認する。

対象:

- repository 実装
- 外部 API クライアント
- メッセージング実装

含めるもの:

- 入出力契約
- 例外変換
- 永続化整合性

### UI Test

画面の入力と表示の責務のみ確認する。

対象:

- 表示
- 入力補助
- 軽いバリデーション
- Storybook 上のコンポーネント状態差分
- 描画テスト

含めないもの:

- 業務判断の主判定
- 業務ルールの本体
- 画面全体 Story による統合仕様管理

## 優先順位

テストは次の順で重視する。

1. Domain
2. Application
3. Contract
4. UI

内側の層ほど仕様の核に近いので、密度と精度を上げる。

## 保存場所

UT は実装と同じレイヤ配下に保存する。

例:

- `backend/user/domain/logic/...`
- `backend/user/domain/logic/.../*.spec.*`
- `backend/user/application/logic/...`
- `backend/user/application/logic/.../*.spec.*`

この原則により、仕様に最も近いテストを実装の近くで維持する。

IT と E2E は実装層の外にまとめる。

- `tests/it/...`
- `tests/e2e/...`

Contract test を IT として扱う場合も、`tests/it/...` に置く。
UI コンポーネントの Story 上の確認は、実装近傍または Storybook 管理配下で行う。

## 命名ルール

テスト ID は次の形式を使う。

`T-<layer>-<topic>-xxx`

例:

- `T-DOMAIN-ORDER-001`
- `T-APPLICATION-USER-002`
- `T-CONTRACT-MAIL-001`
- `T-UI-SIGNUP-001`

`layer` は次から選ぶ。

- `DOMAIN`
- `APPLICATION`
- `CONTRACT`
- `UI`

`topic` は業務概念またはユースケース名を使う。
技術名は避ける。

良い例:

- `ORDER`
- `SHIPMENT`
- `USER`

悪い例:

- `POSTGRES`
- `AXIOS`
- `CONTROLLER`

## 文書との接続

テストは必要に応じて次を参照してよい。

- `BR-xxx`
- `UC-xxx`
- `TERM-xxx`
- `NFR-xxx`

ただし、コメント過多にしない。
重要なルールだけを参照可能にする。

## 良いテストの条件

- 振る舞いが読める
- ルール違反時の結果が読める
- 技術実装に引っ張られすぎない
- テスト名だけでも意図が分かる
- 内側の層は外側の都合に依存しない

## 悪いテストの例

- 実装手順だけを追っている
- mock の呼び出し回数しか見ていない
- 業務ルールではなく private メソッド単位で割れている
- 1テストで複数ユースケースを同時に確認している
- DB や HTTP が不要なテストで毎回実環境を起動している

## 推奨ファイル

- `README.md`
- `test-case-template.yaml`
- `test-naming-rules.md`
- `test-layering-rules.md`
