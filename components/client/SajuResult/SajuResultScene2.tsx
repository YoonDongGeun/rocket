import Image from 'next/image';
import CartoonText from '../CartoonText';

function SajuResultScene2() {
  return (
    <div className="w-full mt-[calc(114%/3.75)] pr-[6.4%] relative">
      <Image
        className="-z-1 w-full"
        src={'/sajuResultBG2.png'}
        width={351}
        height={285}
        style={{ objectFit: 'cover' }}
        unoptimized
        alt="Scene-2"
        aria-hidden
      />
      <CartoonText className="absolute left-[41.3%] top-[6.7%] translate-x-1/2 text-clamp-normal">
        슥슥
      </CartoonText>
    </div>
  );
}
export default SajuResultScene2;
