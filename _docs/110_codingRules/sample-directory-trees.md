# Sample Directory Trees

## 目的

この文書は、Astro + React の frontend と NestJS の backend を前提に、実際の配置イメージを固定する。

ここで示すツリーは雛形であり、重要なのは名前そのものではなく責務分離である。

## Frontend Sample

前提:

- Astro をページとルーティングの入口に使う
- React を component 実装に使う
- Storybook で component 単位に仕様確認する
- E2E は `tests/e2e` に置く

```text
frontend/
  src/
    pages/
      index.astro
      user-registration.astro
      orders/
        [id].astro
    components/
      common/
        Button.tsx
        Input.tsx
        Dialog.tsx
      user-registration/
        UserRegistrationForm.tsx
        UserRegistrationSummary.tsx
      orders/
        OrderSummaryCard.tsx
        ShipmentStatusBadge.tsx
    containers/
      user-registration/
        UserRegistrationContainer.tsx
      orders/
        OrderDetailContainer.tsx
    layouts/
      DefaultLayout.astro
    lib/
      api/
        userApiClient.ts
        orderApiClient.ts
      dto/
        user/
          RegisterUserRequest.ts
          RegisterUserResponse.ts
        order/
          OrderDetailResponse.ts
      mappers/
        user/
          registerUserViewModelMapper.ts
        order/
          orderDetailViewModelMapper.ts
      state/
        user-registration/
          useUserRegistrationState.ts
        orders/
          useOrderDetailState.ts
  stories/
    common/
      Button.stories.tsx
      Input.stories.tsx
    user-registration/
      UserRegistrationForm.stories.tsx
      UserRegistrationSummary.stories.tsx
    orders/
      OrderSummaryCard.stories.tsx
      ShipmentStatusBadge.stories.tsx
  public/
  tests/
    e2e/
      user-registration/
        user-registration.spec.ts
      orders/
        order-detail.spec.ts
```

### Frontend ルール

- `src/pages/` は Astro の route entry と page composition のみを持つ
- `src/components/` は表示責務だけを持つ
- `src/containers/` は backend 接続、state、props 変換を持つ
- `stories/` は component 単位で作成する
- `src/lib/dto/` は API 境界用の DTO を持つ
- `src/lib/mappers/` は DTO から props や ViewModel への変換を持つ
- `src/lib/state/` は UI state を持つ

### Frontend で避ける構造

- `pages/` で API を直接呼ぶ
- `components/` に fetch や業務判定を書く
- `stories/` に page 全体を置く
- `containers/` に汎用 UI 部品を置く

## Backend Sample

前提:

- NestJS を external interface と application wiring に利用する
- backend は業務ドメイン単位に分割する
- 各ドメインは `interface / application / domain / infrastructure` を持つ
- 実装は `logic/` 配下に置く
- UT は同じレイヤ近傍に置く
- IT は `tests/it` に置く

```text
backend/
  src/
    user/
      interface/
        logic/
          controllers/
            user.controller.ts
          dto/
            register-user.request.dto.ts
            register-user.response.dto.ts
          presenters/
            register-user.presenter.ts
          openapi/
            user.openapi.ts
      application/
        logic/
          use-cases/
            register-user.use-case.ts
          commands/
            register-user.command.ts
          services/
            user-application.service.ts
          ports/
            user-repository.port.ts
            duplicate-user-checker.port.ts
          dto/
            register-user.input.ts
            register-user.output.ts
      domain/
        logic/
          entities/
            user.ts
          value-objects/
            user-id.ts
            email-address.ts
            birth-date.ts
          services/
            user-registration-policy.ts
          events/
            user-registered.event.ts
      infrastructure/
        logic/
          repositories/
            sql-user.repository.ts
          persistence/
            user.orm-entity.ts
            user.persistence-mapper.ts
          gateways/
            duplicate-user-checker.gateway.ts
    order/
      interface/
        logic/
          controllers/
            order.controller.ts
          dto/
            ship-order.request.dto.ts
            ship-order.response.dto.ts
          openapi/
            order.openapi.ts
      application/
        logic/
          use-cases/
            ship-order.use-case.ts
          ports/
            order-repository.port.ts
            shipment-notification.port.ts
      domain/
        logic/
          entities/
            order.ts
          value-objects/
            order-id.ts
            order-status.ts
          services/
            shipment-policy.ts
      infrastructure/
        logic/
          repositories/
            sql-order.repository.ts
          gateways/
            http-shipment-notification.gateway.ts
    app.module.ts
    main.ts
  tests/
    it/
      user/
        register-user-api.it.spec.ts
        sql-user-repository.it.spec.ts
      order/
        ship-order-api.it.spec.ts
```

### Backend ルール

- NestJS の controller や module は `interface` 側の責務として扱う
- `application` は use case と port 抽象を持つ
- `domain` は framework 非依存で保つ
- `infrastructure` は repository 実装、ORM、外部接続を閉じ込める
- OpenAPI 記述は `backend/src/<domain>/interface/logic/openapi/` に固定して置く

### Backend で避ける構造

- `controller` で業務判定を持つ
- `domain` に NestJS decorator を持ち込む
- `application` で `new SqlUserRepository()` する
- `infrastructure` でユースケース分岐を持つ

## UT Placement Sample

UT は同じレイヤ近傍に置く。

```text
backend/
  src/
    user/
      domain/
        logic/
          value-objects/
            email-address.ts
            email-address.spec.ts
      application/
        logic/
          use-cases/
            register-user.use-case.ts
            register-user.use-case.spec.ts
frontend/
  src/
    components/
      user-registration/
        UserRegistrationForm.tsx
        UserRegistrationForm.spec.tsx
```

## 運用上の補足

- 共通化は急がず、まずはドメイン単位で閉じる
- 共有部品は本当に複数箇所で安定してから `common/` へ出す
- OpenAPI、DTO、Story、E2E の4点をずらさない
