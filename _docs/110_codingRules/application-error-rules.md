# Application Error Rules

## 目的

この文書は、Application 層のエラー表現を framework 非依存に保つための基準を定義する。

## 基本原則

- Application は framework exception に依存しない
- HTTP status の決定は interface 層で行う
- Application はユースケース失敗を application 独自の例外または結果型で表現する

## 禁止事項

- `@nestjs/common` などの framework exception を Application で import する
- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- request / response の都合で Application の戻り値を決める

## 許可される形

- `InvalidLoginError`
- `UserNotFoundError`
- `DuplicateEmailError`
- `Result<T, E>`

## 変換責務

- Domain の失敗は Domain で表現する
- Application の失敗は Application で集約する
- interface 層が Application の失敗を HTTP status や API error response へ変換する

## 例

悪い例:

```text
Application が UnauthorizedException を throw する
```

良い例:

```text
Application が InvalidLoginError を返し、
interface 層が 401 response へ変換する
```
