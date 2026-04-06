type InputProps = {
  readonly id: string;
  readonly type?: 'email' | 'password' | 'text';
  readonly value: string;
  readonly placeholder?: string;
  readonly onValueChange: (value: string) => void;
};

export function Input({
  id,
  type = 'text',
  value,
  placeholder,
  onValueChange,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onValueChange(event.currentTarget.value)}
    />
  );
}
