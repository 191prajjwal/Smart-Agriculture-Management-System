import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ className, children }) => {
  return (
    <div className={twMerge(clsx(
      'bg-white rounded-lg shadow-md p-6',
      className
    ))}>
      {children}
    </div>
  );
};

export default Card;