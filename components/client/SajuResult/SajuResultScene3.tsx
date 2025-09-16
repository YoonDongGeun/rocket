import Image from 'next/image';
import { PropsWithChildren } from 'react';

function SajuResultScene3({ children }: PropsWithChildren) {
  return (
    <div className="w-full mt-[calc(40%/3.75)] relative">
      {children}
      <Image
        className="-z-1 w-full"
        src={'/sajuResultBG3.png'}
        width={239}
        height={139}
        style={{ objectFit: 'cover' }}
        unoptimized
        alt="Scene-2"
        aria-hidden
      />
    </div>
  );
}
export default SajuResultScene3;
