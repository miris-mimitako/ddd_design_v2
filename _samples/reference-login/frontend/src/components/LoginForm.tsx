import { Button } from './Button';
import { Field } from './Field';
import { Input } from './Input';

type LoginFormProps = {
  readonly emailValue: string;
  readonly passwordValue: string;
  readonly isSubmitting: boolean;
  readonly errorMessage: string | null;
  readonly onEmailChange: (value: string) => void;
  readonly onPasswordChange: (value: string) => void;
  readonly onSubmit: () => void;
};

export function LoginForm(props: LoginFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Field label="Email" htmlFor="login-email">
        <Input
          id="login-email"
          type="email"
          value={props.emailValue}
          placeholder="sample.user@example.com"
          onValueChange={props.onEmailChange}
        />
      </Field>
      <Field label="Password" htmlFor="login-password">
        <Input
          id="login-password"
          type="password"
          value={props.passwordValue}
          placeholder="password123"
          onValueChange={props.onPasswordChange}
        />
      </Field>
      {props.errorMessage ? <p>{props.errorMessage}</p> : null}
      <Button type="submit" disabled={props.isSubmitting}>
        Login
      </Button>
    </form>
  );
}
