# Type Rules

## 目的

この文書は、プリミティブ排斥の基準を定義する。

## 基本原則

- 業務上意味のある値は専用型で表現する
- 標準型は業務概念の代用品にしない

## 禁止する使い方

- `string` をメールアドレスとして使う
- `number` を金額として使う
- `string` を注文IDとして使う
- `string` を状態値として使う

## 推奨する型

- `EmailAddress`
- `Money`
- `OrderId`
- `UserId`
- `OrderStatus`
- `BirthDate`

## 境界での扱い

- API では DTO として primitive を受けてもよい
- 永続化では DB 都合の primitive を使ってよい
- ただし Domain / Application へ入る前に専用型へ変換する

## 例

悪い例:

```text
registerUser(email: string, age: number)
```

良い例:

```text
registerUser(email: EmailAddress, birthDate: BirthDate)
```
