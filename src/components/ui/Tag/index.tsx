import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const tagVariants = cva('inline-flex items-center justify-center rounded-full font-medium', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface TagProps extends VariantProps<typeof tagVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, variant, size, className, ...props }: TagProps) => {
  return (
    <span className={tagVariants({ variant, size, className })} {...props}>
      {children}
    </span>
  );
};
