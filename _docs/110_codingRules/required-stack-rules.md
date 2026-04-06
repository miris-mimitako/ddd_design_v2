# Required Stack Rules

## Purpose
This document defines mandatory implementation choices.
These are not recommendations.
If any item below is violated, the implementation must be rejected.

## Frontend

- Route entry must be `Astro`.
- UI components must be `React`.
- Component confirmation must be done in `Storybook`.
- Final UI confirmation must be done in `E2E`.
- Full-page Storybook stories are prohibited.

## Backend

- External interface must be `NestJS`.
- Public API contract must be written in `OpenAPI`.
- API input and output must be defined with `DTO`.
- Backend structure must follow DDD with `interface / application / domain / infrastructure`.

## Fixed Locations

- OpenAPI files must be stored at `backend/src/<domain>/interface/logic/openapi/`.
- Unit tests must be stored near the implementation.
- Integration tests must be stored at `tests/it/`.
- E2E tests must be stored at `tests/e2e/`.

## Explicitly Prohibited Substitutions

- Replacing Astro route entry with Vite SPA
- Replacing NestJS API with Express
- Omitting OpenAPI from public API
- Omitting DTO from API boundary
- Using Storybook only for large composite components
- Treating E2E-only verification as sufficient
