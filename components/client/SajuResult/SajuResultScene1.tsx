import Image from 'next/image';
import { PropsWithChildren } from 'react';

function SajuResultScene1({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <Image
        className="-z-1 w-full"
        src={'/sajuResultBG1.png'}
        width={375}
        height={658}
        style={{ objectFit: 'cover' }}
        unoptimized
        alt="Scene-1"
        aria-hidden
      />
      {children}
    </div>
  );
}
export default SajuResultScene1;
