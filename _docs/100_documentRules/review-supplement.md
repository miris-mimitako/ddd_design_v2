# Review Supplement

## Purpose
This document supplements the main review checklist with explicit rejection references.

## Use These References For Rejection

- [required-stack-rules.md](D:/application/ddd_design_v2/_docs/110_codingRules/required-stack-rules.md)
- [implementation-workflow-rules.md](D:/application/ddd_design_v2/_docs/110_codingRules/implementation-workflow-rules.md)
- [conformance-checklist.md](D:/application/ddd_design_v2/_docs/110_codingRules/conformance-checklist.md)

## Required Review Sequence

1. Check `application/logic` for framework imports.
2. Check `application/logic` for `infrastructure/logic` imports.
3. Check `domain/logic` for framework imports.
4. Check Domain UT existence.
5. Check primitive exclusion violations.
6. Check Storybook granularity.
7. Check IT placeholder tests.
8. Check OpenAPI, DTO, E2E, and required stack conformance.
