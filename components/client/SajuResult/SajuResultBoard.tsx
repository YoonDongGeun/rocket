import { SajuResultDTO } from '@/entities/Saju';
import Cloud1 from '@/public/cloud1.svg';
import Cloud2 from '@/public/cloud2.svg';
import SajuResultTable from './table/SajuResultTable';
import { PropsWithChildren, Ref, useRef } from 'react';
import html2canvas from 'html2canvas-pro';
interface SajuResultProps {
  sajuResult: SajuResultDTO;
}
function SajuResultBoard({ sajuResult }: SajuResultProps) {
  const sajuTableData = sajuResult.result;
  const resultRef = useRef<HTMLDivElement>(null);
  const handleCapture = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2, // 고해상도로 뽑고 싶으면 2~3 정도
        useCORS: true,
      });
      // 이미지 다운로드
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'saju-table.png';
      link.click();
    } catch (err) {
      console.error('캡처 실패', err);
    }
  };
  return (
    <BoardLayout ref={resultRef} onClick={handleCapture}>
      <BoardHeader sajuResult={sajuResult} />
      <SajuResultTable sajuTableData={sajuTableData} />
    </BoardLayout>
  );
}
export default SajuResultBoard;

function BoardLayout({
  children,
  ref,
  onClick,
}: PropsWithChildren<{ ref: Ref<HTMLDivElement>; onClick: () => void }>) {
  return (
    <div
      ref={ref}
      className="w-[93.6%] mx-auto -mt-[calc(15%/3.75)] relative border-3 bg-[#F5F3EC] border-[#1B2F49] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] cursor-pointer"
      style={{ backgroundColor: '#F5F3EC' }}
      onClick={onClick}
    >
      <Cloud1
        // className="absolute left-2 top-11.25"
        style={{
          position: 'absolute',
          left: '8px',
          top: '45px',
        }}
      />
      <Cloud2 className="absolute right-2 top-6.5" />
      <InnerBorder position="top" />
      <InnerBorder position="right" />
      {children}
      <InnerBorder position="left" />
      <InnerBorder position="bottom" />
    </div>
  );
}

function BoardHeader({ sajuResult }: { sajuResult: SajuResultDTO }) {
  const { name, birth } = sajuResult;
  const 출생년월일 = `${birth.year}년 ${birth.month}월${birth.day}일`;
  const 출생시간 = birth.time ? `${birth.time.hour}:${birth.time.minute}` : '';
  return (
    <div className="mx-auto text-center mt-8">
      <h3 className="text-base font-gapyeong">{`${name}님의 사주`}</h3>
      <span className="text-xl font-gapyeong font-bold">{`${출생년월일}${출생시간 ? ` ${출생시간}` : ''}`}</span>
    </div>
  );
}

function InnerBorder({ position }: { position: 'top' | 'right' | 'left' | 'bottom' }) {
  const borderClassName = {
    top: 'border-b-1 w-full h-2',
    right: 'absolute border-l-1 h-full w-2 top-0 right-0',
    left: 'absolute border-r-1 h-full w-2 top-0 left-0',
    bottom: 'border-t-1 w-full h-2',
  };
  return <div className={borderClassName[position]} />;
}
