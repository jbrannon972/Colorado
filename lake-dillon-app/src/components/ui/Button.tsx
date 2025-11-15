import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'compact';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'transition-smooth touch-opacity flex items-center justify-center gap-2';

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-error-rose text-frost-white h-button px-sm rounded-subtle text-button',
    success: 'bg-success-teal text-frost-white h-button px-sm rounded-subtle text-button',
    compact: 'btn-compact bg-pale-ice bg-opacity-15 text-pale-ice hover:bg-accent-blue hover:text-frost-white',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
