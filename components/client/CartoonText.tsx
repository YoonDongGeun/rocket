import { cn } from '@/utils/cn';
import { PropsWithChildren } from 'react';

function CartoonText({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        ' leading-none font-webtoon',
        {
          'text-shadow-[0px_4px_10px_rgba(255, 255, 255, 0.3)]': true,
          'text-shadow-[-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white,_1px_1px_0_white]': true,
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
export default CartoonText;
