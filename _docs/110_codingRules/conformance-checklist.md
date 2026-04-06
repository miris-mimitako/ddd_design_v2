# Conformance Checklist

## Purpose
Use this checklist before declaring an implementation complete.
If any item below is `No`, the implementation must be rejected.

## Architecture Gate

- Is the frontend using Astro route entry?
- Is the frontend using React components?
- Is the backend using NestJS for the external interface?
- Is the backend structured as `interface / application / domain / infrastructure`?
- Are OpenAPI files stored under `backend/src/<domain>/interface/logic/openapi/`?

## Dependency Gate

- Does `application/logic` avoid all `@nestjs/*` imports?
- Does `application/logic` avoid all `infrastructure/logic` imports?
- Does `domain/logic` avoid all framework imports?
- Does UI avoid business-rule decisions?

## Type Gate

- Are business values represented as named concepts instead of anonymous primitives in Domain?
- Are business values represented as named concepts instead of anonymous primitives in Application?
- Are frontend session, API response, and view model types preserving business meaning?
- Is `userId: string` style modeling absent from Domain and Application?

## Test Gate

- Does each implemented domain have at least one Domain UT near `domain/logic`?
- Does each implemented use case have Application UT near `application/logic`?
- Does `tests/it/` contain real contract or integration assertions instead of placeholders?
- Does `tests/e2e/` contain final user-flow confirmation?

## Storybook Gate

- Are small-component stories present before composite stories?
- Are `Input`, `Button`, and `Field` equivalent stories present?
- Are full-page stories absent?
- Are large stateful components justified as compositions of smaller confirmed components?

## Placeholder Rejection

The following patterns are automatic rejection signals:

- `assert.equal(true, true)`
- `expect(true).toBe(true)`
- smoke-test only verification
- Storybook stories only for composite forms or cards
- framework exceptions thrown directly from Application

## Review Order

1. Check dependency-direction violations.
2. Check primitive exclusion violations.
3. Check Domain UT existence.
4. Check Storybook granularity.
5. Check IT placeholder tests.
6. Check OpenAPI, DTO, E2E, and stack conformance.

## Reference Implementation

If there is uncertainty about the expected structure, compare the implementation to:

- [reference-login](D:/application/ddd_design_v2/_samples/reference-login/README.md)
