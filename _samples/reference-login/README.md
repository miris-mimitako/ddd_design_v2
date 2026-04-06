# Reference Login Sample

This sample exists to show a concrete implementation that follows this repository's rules.

## Goals

- frontend uses `Astro + React + Storybook`
- backend uses `NestJS + OpenAPI + DTO + DDD`
- Application does not import framework code for business decisions
- Application does not import `infrastructure/logic`
- Domain and Application avoid anonymous business primitives
- Storybook starts from `Input`, `Button`, and `Field`
- Domain UT, Application UT, IT, and E2E all exist

## Directory Tree

```text
_samples/reference-login/
  backend/
    src/
      app.module.ts
      main.ts
      auth/
        application/
          logic/
            errors/
              authentication-failed.application-error.ts
              session-not-found.application-error.ts
            ports/
              session-reader.port.ts
              user-authenticator.port.ts
            use-cases/
              get-current-user.usecase.spec.ts
              get-current-user.usecase.ts
              login-user.usecase.spec.ts
              login-user.usecase.ts
        domain/
          logic/
            entities/
              authenticated-user.ts
              login-session.ts
            services/
              authentication-domain.service.spec.ts
              authentication-domain.service.ts
            value-objects/
              display-name.ts
              email-address.ts
              logged-in-at.ts
              plain-password.ts
              session-token.ts
              user-id.ts
        infrastructure/
          logic/
            adapters/
              in-memory-session-reader.adapter.ts
              sample-user-authenticator.adapter.ts
        interface/
          logic/
            controllers/
              auth.controller.ts
            dto/
              get-current-user-response.dto.ts
              login-request.dto.ts
              login-response.dto.ts
            openapi/
              auth.openapi.yaml
  frontend/
    src/
      components/
        Button.tsx
        Field.tsx
        Input.tsx
        LoginForm.tsx
        UserProfileCard.tsx
      containers/
        auth-api.ts
        LoginPageContainer.tsx
        MyPageContainer.tsx
      layouts/
        BaseLayout.astro
      pages/
        index.astro
        mypage.astro
    stories/
      Button.stories.tsx
      Field.stories.tsx
      Input.stories.tsx
      LoginForm.stories.tsx
      UserProfileCard.stories.tsx
  tests/
    e2e/
      login-flow.spec.ts
    it/
      auth-api.spec.ts
```

## Reading Order

1. Read `backend/src/auth/domain/logic/`.
2. Read `backend/src/auth/application/logic/`.
3. Read `backend/src/auth/interface/logic/openapi/auth.openapi.yaml`.
4. Read `frontend/src/components/` from small components upward.
5. Read `frontend/stories/`.
6. Read `tests/it/` and `tests/e2e/`.
