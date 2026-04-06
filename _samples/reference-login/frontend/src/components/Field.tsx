import type { ReactNode } from 'react';

type FieldProps = {
  readonly label: string;
  readonly htmlFor: string;
  readonly children: ReactNode;
};

export function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
