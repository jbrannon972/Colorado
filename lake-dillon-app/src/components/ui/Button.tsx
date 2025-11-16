import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'compact' | 'icon' | 'icon-small';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  as?: 'button' | 'span';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  as: Component = 'button',
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
    compact: 'btn-compact btn-primary',
    icon: 'btn-icon',
    'icon-small': 'btn-icon btn-icon-small',
  };

  return (
    <Component
      className={`${variants[variant]} ${className}`}
      {...(props as any)}
    >
      {children}
    </Component>
  );
};
