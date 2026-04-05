# Port Design Rules

## 目的

この文書は、Port をどの粒度でどう設計するかの基準を定義する。

## 基本原則

- Port はユースケースや業務ルールの要求から定義する
- 技術都合から逆算しない
- 実装差し替え可能であることを重視する

## 良い Port

- `UserRepository`
- `DuplicateUserChecker`
- `ShipmentNotificationPort`
- `Clock`

これらは、ユースケースやドメインから見た役割を表している。

## 悪い Port

- `SqlRunner`
- `RestClient`
- `RepositoryBase`
- `PersistenceHelper`

これらは技術や抽象化の都合が前面に出すぎている。

## 設計ルール

- 1 Port 1責務を基本とする
- Port 名は業務用語を使う
- メソッド名も業務操作を表す
- SQL、HTTP、ORM の語を Port に出さない

良い例:

- `save(user)`
- `findByEmail(email)`
- `notifyShipmentCompleted(orderId)`

悪い例:

- `executeInsert(data)`
- `callPost(endpoint, body)`
- `runQuery(sql)`

## 置き場所

- Port 抽象は Application または Domain 側に置く
- 実装は Infrastructure 側に置く

## テストとの関係

- Application test では fake / stub に差し替える
- Contract test で実装が Port 契約を守るか確認する
