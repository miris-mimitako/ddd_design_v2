# Structure Rules

## 目的

この文書は、backend の配置構造を固定する。

## 基本構造

backend は、DDD のドメイン単位で分割する。

各ドメイン配下は次の4層を持つ。

- `interface`
- `application`
- `domain`
- `infrastructure`

各層の実装は `logic` 配下に置く。

例:

```text
backend/
  user/
    interface/
      logic/
    application/
      logic/
    domain/
      logic/
    infrastructure/
      logic/
```

## 層ごとの配置

### `interface/logic`

- controller
- handler
- presenter
- request DTO
- response DTO
- API schema 連携コード

### `application/logic`

- use case
- command
- query
- application service

### `domain/logic`

- entity
- value object
- aggregate
- domain service
- domain event

### `infrastructure/logic`

- repository implementation
- external client
- persistence mapper
- message publisher

## 配置ルール

- 同じ業務ドメインのコードは同じドメイン配下へ置く
- cross domain の共通化を急ぎすぎない
- framework 初期化コードはドメイン層に置かない
- DTO は `interface` 配下に置く
- ORM mapping は `infrastructure` 配下に置く

## 禁止事項

- `common` に業務概念を雑に逃がす
- `utils` にドメイン判断を置く
- interface 層に use case 本体を書く
- infrastructure 層にユースケース分岐を書く
