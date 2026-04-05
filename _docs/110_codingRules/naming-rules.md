# Naming Rules

## 目的

この文書は、ユビキタス言語とコード命名を揃えるための基準を定義する。

## 基本

- コード名は `20_ubiquitousLanguage` の canonical を起点に決める
- UI 名、コード名、DB 名が異なる場合は意味の対応を明示する
- 同じ概念に複数のクラス名を乱立させない

## Domain 命名

- エンティティは名詞
- 値オブジェクトは意味のある名詞
- ドメインサービスは業務動詞を含めてよい

例:

- `User`
- `EmailAddress`
- `Order`
- `ShipOrderService`

## 避ける名前

- `Data`
- `Info`
- `Manager`
- `Helper`
- `Common`

これらは責務が曖昧になりやすい。

## Application 命名

- ユースケース名を明示する

例:

- `RegisterUserUseCase`
- `CancelOrderUseCase`

## Infrastructure 命名

- 実装技術を含めてよい

例:

- `SqlUserRepository`
- `ApiNotificationGateway`

## 変換ルール

- DB 列名に合わせるために Domain 名を崩さない
- JSON 項目名に合わせるために Domain 名を崩さない
- 変換責務は Infrastructure または DTO に置く
