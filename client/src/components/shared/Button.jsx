import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) => {
  return (
    <button
      className={twMerge(clsx(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-green-600 hover:bg-green-700 text-white',
        variant === 'secondary' && 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        className
      ))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;