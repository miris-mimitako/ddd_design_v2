# Implementation Workflow Rules

## Purpose
This document fixes the implementation order.
The main goal is to prevent "it works, but violates the architecture" regressions.

## Backend Workflow

1. Define domain concepts and invariants.
2. Add Domain unit tests near `domain/logic`.
3. Define OpenAPI under `backend/src/<domain>/interface/logic/openapi/`.
4. Define DTO for the API boundary.
5. Define application ports and use cases without framework imports.
6. Implement infrastructure behind ports.
7. Wire NestJS controller and module in the interface layer.
8. Add Application unit tests near `application/logic`.
9. Add integration tests under `tests/it/`.

## Frontend Workflow

1. Create Astro route entry.
2. Break the UI source into small components.
3. Create Storybook stories for small components first.
4. Required minimum story granularity includes `Input`, `Button`, and `Field` equivalents.
5. Build larger composite components only after small-component stories exist.
6. Build containers for API connection and UI state orchestration.
7. Place confirmed components into Astro pages.
8. Add E2E tests under `tests/e2e/`.

## Absolute Restrictions During Implementation

- Do not import `@nestjs/*` in `application/logic`.
- Do not import `infrastructure/logic` in `application/logic`.
- Do not import framework code in `domain/logic`.
- Do not place business rule decisions in UI components.
- Do not collapse business values into anonymous primitives in Domain or Application.
- Do not mark implementation complete with only E2E or smoke tests.

## Completion Rule

An implementation is incomplete if any mandatory artifact is missing, even when the app runs.

Missing examples:

- Domain implementation exists but Domain UT does not
- Public API exists but OpenAPI does not
- Storybook exists but only for large composite components
- `tests/it/` exists but contains placeholder tests only
- Backend runs but Application imports framework exceptions
