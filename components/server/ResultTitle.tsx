import TitleDeco from '@/public/TitleDeco.svg';
interface ResultTitleProps {
  chapter: string;
  title: string;
}

/* 결과 페이지 공통 타이틀 컴포넌트 */
function ResultTitle({ chapter, title }: ResultTitleProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-21 text-center z-1 font-gyeonggi w-[41.8%]">
      <h2 className="text-clamp-title tracking-tighter text-white">{chapter}</h2>
      <TitleDeco className="mx-auto my-[7.65%] w-full" viewBox="0 0 157 20" />
      <h1 className="text-clamp-title tracking-tighter text-white">{title}</h1>
    </div>
  );
}

export default ResultTitle;
