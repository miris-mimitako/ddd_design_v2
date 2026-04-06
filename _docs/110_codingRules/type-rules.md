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
- Application の input / output でも、業務意味を持つ値は専用型へ寄せる
- frontend の session, api response, view model でも、業務意味を持つ値は型名で意味を保つ
- primitive を使うのは transport や serialization の都合に限定する

## frontend での扱い

- `session.userId: string` のような無名 primitive 保持を避ける
- `UserIdText`, `EmailAddressText`, `LoggedInAtText` のように意味を持つ型または別名で保持する
- component props に渡すときも、単なる `string` の束へ崩しすぎない

悪い例:

```text
type SessionData = {
  userId: string;
  email: string;
}
```

良い例:

```text
type SessionData = {
  userId: UserIdText;
  email: EmailAddressText;
}
```

## 例

悪い例:

```text
registerUser(email: string, age: number)
```

良い例:

```text
registerUser(email: EmailAddress, birthDate: BirthDate)
```
