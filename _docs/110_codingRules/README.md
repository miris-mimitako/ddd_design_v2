# Coding Rules

## 目的

このディレクトリには、DDD と DIP を崩さずに実装するための規約を置く。

このプロジェクトでは次を原則とする。

- 文書は意図と制約を持つ
- テストは振る舞いを持つ
- コードは実現方法を持つ

したがって、`110_codingRules` は「どう実装するか」ではなく、**どう実装を暴走させないか**を定義する場所である。

## 基本原則

- Domain を中心に置く
- 依存方向は内側へ向ける
- 重要なものを重要でないものへ依存させない
- 技術都合で業務概念を歪めない
- Port は業務言語で定義する
- UI にビジネスルールを持ち込まない
- API は DTO を境界として扱う
- 外部公開契約は OpenAPI を正本として定義する
- プリミティブ排斥を徹底し、標準型を業務概念の代わりに使わない

## レイヤ責務

### Domain

責務:

- 業務ルール
- 不変条件
- 状態遷移
- 業務上の計算

依存してよいもの:

- 同じ Domain 内の概念
- 言語標準ライブラリの最小限

依存してはいけないもの:

- Web フレームワーク
- ORM
- DB ドライバ
- HTTP クライアント
- UI ライブラリ

### Application

責務:

- ユースケースの実行
- トランザクション境界
- port の呼び分け
- 認可や監査の起点制御
- Domain 例外や Application 例外の組み立て

依存してよいもの:

- Domain
- Port の抽象

依存してはいけないもの:

- infrastructure 実装クラスの直接生成
- framework 固有 API への密結合
- framework 例外の直接 throw
- framework decorator や request/response 型の直接利用

### Infrastructure

責務:

- repository 実装
- 外部 API 接続
- 永続化
- 通知
- ファイル入出力

依存してよいもの:

- Domain / Application が定義した抽象
- 使用する技術スタック

注意:

- 実装詳細はここに閉じ込める
- 業務ルールをここへ持ち込まない

### UI

責務:

- 入力の受け取り
- 表示
- Application 呼び出し
- UX 上必要なバリデーション
- 画面 state に基づく表示切り替え
- Storybook 上で確定したコンポーネントの利用

依存してよいもの:

- Application
- ViewModel や DTO

依存してはいけないもの:

- Domain ルールの主判定
- DB 直接操作
- 業務上の許可 / 禁止判定
- 業務ルールに基づく分岐の正本化

UI で許可される判定:

- 必須入力の未入力チェック
- 形式チェック
- 入力補助
- ローディング状態、活性状態、表示状態の切り替え

UI で禁止する判定:

- 登録可能かどうかの業務判定
- 出荷可能かどうかの業務判定
- 割引適用可否などの業務条件判定

UI 構築手順:

1. HTML などの元デザインを受け取る
2. Storybook でコンポーネント単位に展開する
3. 不足コンポーネントを構築する
4. Story 上で描画テストとロジック確認を行う
5. 確定したコンポーネントをページへ配置する
6. 最後に E2E で確認する

追加ルール:

- 画面全体の Story は作成しない
- 他プロジェクトでの再利用性は設計条件に含めない
- このプロジェクトに必要な UI ロジックは Story 上で確認可能にする

## 依存方向

依存方向は次に固定する。

- UI -> Application
- Application -> Domain
- Infrastructure -> Domain / Application の抽象

禁止する依存:

- Domain -> Infrastructure
- Domain -> UI
- Application -> Infrastructure 実装
- UI -> Infrastructure

Backend 内の責務は、各 DDD のドメイン単位で次の層に分ける。

- external interface
- application
- domain
- infrastructure

各実装は `domain/layer/logic` の形で配置する。

例:

- `backend/user/interface/logic/...`
- `backend/user/application/logic/...`
- `backend/user/domain/logic/...`
- `backend/user/infrastructure/logic/...`

## Port ルール

Port は外部技術のためではなく、ユースケースとドメインのために切る。

良い例:

- `UserRepository`
- `ShipmentNotificationPort`
- `Clock`
- `IdGenerator`

悪い例:

- `SqlExecutor`
- `HttpWrapper`
- `OrmUserGateway`

Port の命名は、技術名ではなく業務上の役割で表現する。

## 命名ルール

### Domain

- 業務概念で命名する
- 曖昧な manager, helper, util を避ける

良い例:

- `Order`
- `ApprovedOrder`
- `EmailAddress`
- `ShipOrderService`

悪い例:

- `OrderManager`
- `CommonUtil`
- `DataHelper`

### Application

- ユースケースが分かる名前にする

良い例:

- `RegisterUserUseCase`
- `ShipOrderUseCase`

### Infrastructure

- 実装技術を含めてよい

良い例:

- `SqlUserRepository`
- `HttpShipmentNotificationPort`

## 実装境界ルール

- Domain モデルに ORM annotation を付けない
- Domain オブジェクトに framework base class を継承させない
- Application で外部 SDK を直接 new しない
- Application で framework exception を直接 throw しない
- Application で framework request / response を直接扱わない
- UI で業務判定 if を増やさない
- Infrastructure で業務ルール分岐を増やさない

## 例外とエラー

- 業務ルール違反は Domain で表現する
- ユースケース失敗は Application で扱う
- 通信障害や永続化障害は Infrastructure で技術例外を吸収し、必要に応じて Application 向けへ変換する
- HTTP status や framework exception への変換は interface 層で行う
- Application は framework 非依存の例外型または結果型を返す

## DTO と変換

- UI 向け表現は Domain に持ち込まない
- API 向け JSON 形式は Domain に持ち込まない
- 永続化スキーマ都合の変換は Infrastructure に閉じ込める
- external interface 層は DTO を使って入出力境界を定義する
- Domain オブジェクトを API の直接入出力に使わない

## API ルール

- backend は external interface 層に DTO を利用した API 層を持つ
- API の公開契約は OpenAPI で必ず記述する
- API 実装より先に、少なくとも同時に OpenAPI を更新する
- OpenAPI と DTO の意味がずれたまま放置しない

API で禁止すること:

- Domain オブジェクトの直列化をそのまま公開する
- framework 都合の型を API 契約へ露出する
- 口頭仕様だけで endpoint を増やす

## プリミティブ排斥

このプロジェクトでは、業務概念に対する標準型の直接利用を禁止する。

禁止例:

- メールアドレスを `string` のまま扱う
- 金額を `number` のまま扱う
- 注文IDを `string` や `number` のまま扱う
- 日付意味を持つ値を生の `Date` や文字列で受け回す

許可される方向:

- `EmailAddress`
- `Money`
- `OrderId`
- `BirthDate`

補足:

- 配列、辞書、文字列、数値などの標準型は、業務概念を包んだ型の内部実装としてのみ使う
- DTO や永続化境界で一時的にプリミティブへ変換するのはよい
- 変換責務は interface または infrastructure に置く
- Application の public input / output でも、業務意味を持つ値は専用型へ変換して扱う
- frontend でも session, api response, view model に業務値をそのまま primitive で保持しない

## 禁止事項

- interface を何でも増やす
- Domain を空洞化し、if を Application に寄せすぎる
- repository 抽象に SQL 都合を混ぜる
- UI で業務仕様の正本を持つ
- テストしやすさのために業務概念を壊す
- OpenAPI を持たない公開 API を作る
- DTO なしで API 境界を越える
- 業務値を生の primitive のまま Domain に流し込む
- Application で framework exception を投げる
- frontend の session や view model に業務値を無名 primitive のまま保持する

## 自動差し戻し条件

次のどれかに当てはまる実装は、規約違反として差し戻す。

- `application/logic` が `@nestjs/` を import している
- `application/logic` が `infrastructure/logic` を import している
- `domain/logic` が framework を import している
- Domain / Application に `userId: string` などの業務値 primitive が残っている
- `frontend/stories/` に `Input` `Button` `Field` 相当の Story がない

備考:

- これはレビュー時の主観判断ではなく、明示的な違反条件として扱う
- 動作していても差し戻す

## 推奨ファイル

- `README.md`
- `dependency-rules.md`
- `port-design-rules.md`
- `naming-rules.md`
- `structure-rules.md`
- `api-rules.md`
- `type-rules.md`
- `application-error-rules.md`
- `ui-rules.md`
- `props-rules.md`
- `frontend-structure-rules.md`
- `sample-directory-trees.md`

## Reference Implementation

Use the following sample when implementation details are ambiguous.
The sample shows the intended connection between DDD layers, NestJS wiring, Astro pages, React components, Storybook granularity, and test placement.

- [reference-login](D:/application/ddd_design_v2/_samples/reference-login/README.md)
