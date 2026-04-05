# API Rules

## 目的

この文書は、backend の external interface 層における API の作り方を定義する。

## 基本原則

- API 境界では DTO を使う
- API 契約は OpenAPI で定義する
- Domain オブジェクトをそのまま公開しない

## DTO ルール

- request は request DTO で受ける
- response は response DTO で返す
- DTO は external interface 層に置く
- DTO から Domain への変換は interface または application 入口で行う

## OpenAPI ルール

- すべての公開 API に OpenAPI 定義を持たせる
- endpoint、request、response、error を OpenAPI に記述する
- 実装変更時は OpenAPI を同時更新する
- OpenAPI をレビュー対象に含める
- OpenAPI 仕様書の保存場所は `backend/src/<domain>/interface/logic/openapi/` に固定する
- OpenAPI 仕様書は domain 単位で管理する

保存例:

```text
backend/
  src/
    user/
      interface/
        logic/
          openapi/
            user.openapi.ts
    order/
      interface/
        logic/
          openapi/
            order.openapi.ts
```

## 禁止事項

- 実装だけ先に作って契約を後回しにする
- Domain 型をそのまま request / response に使う
- API のエラー意味をコード上だけに閉じ込める
- OpenAPI 仕様書を domain 外の共有フォルダへ無秩序に分散させる
