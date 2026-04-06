import { describe, expect, it } from 'vitest';

describe('Auth API contract example', () => {
  it('describes the login response shape expected by frontend containers', () => {
    const response = {
      userId: 'user-001',
      name: 'Sample User',
      email: 'sample.user@example.com',
      sessionToken: 'session-token-001',
      loggedInAt: '2026-04-06T09:00:00.000Z',
    };

    expect(response).toHaveProperty('sessionToken');
    expect(response.email).toContain('@');
  });
});
