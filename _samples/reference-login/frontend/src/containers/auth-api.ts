export type LoginApiRequest = {
  readonly email: string;
  readonly password: string;
};

export type LoginApiResponse = {
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly sessionToken: string;
  readonly loggedInAt: string;
};

export type CurrentUserApiResponse = {
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly loggedInAt: string;
};

export async function login(request: LoginApiRequest): Promise<LoginApiResponse> {
  const response = await fetch('http://localhost:3101/api/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Login failed.');
  }

  return (await response.json()) as LoginApiResponse;
}

export async function fetchCurrentUser(sessionToken: string): Promise<CurrentUserApiResponse> {
  const response = await fetch('http://localhost:3101/api/auth/me', {
    headers: {
      'x-session-token': sessionToken,
    },
  });

  if (!response.ok) {
    throw new Error('Current user fetch failed.');
  }

  return (await response.json()) as CurrentUserApiResponse;
}
