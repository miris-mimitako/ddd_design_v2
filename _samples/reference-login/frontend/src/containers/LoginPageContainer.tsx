import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { login } from './auth-api';

export function LoginPageContainer() {
  const [emailValue, setEmailValue] = useState('sample.user@example.com');
  const [passwordValue, setPasswordValue] = useState('password123');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await login({
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem('sessionToken', result.sessionToken);
      window.location.href = '/mypage';
    } catch {
      setErrorMessage('Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LoginForm
      emailValue={emailValue}
      passwordValue={passwordValue}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      onEmailChange={setEmailValue}
      onPasswordChange={setPasswordValue}
      onSubmit={handleSubmit}
    />
  );
}
