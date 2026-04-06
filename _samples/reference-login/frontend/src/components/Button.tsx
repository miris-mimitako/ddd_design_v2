import type { ReactNode } from 'react';

type ButtonProps = {
  readonly children: ReactNode;
  readonly type?: 'button' | 'submit';
  readonly disabled?: boolean;
  readonly onPress?: () => void;
};

export function Button({ children, type = 'button', disabled = false, onPress }: ButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onPress}>
      {children}
    </button>
  );
}
