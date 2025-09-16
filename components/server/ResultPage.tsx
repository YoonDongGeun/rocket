import { PropsWithChildren, ReactNode } from 'react';

interface SajuResultPageProps {
  header: ReactNode;
}

function ResultPage({ header, children }: PropsWithChildren<SajuResultPageProps>) {
  return (
    <div className="relative bg-[#F3F2EF] pb-20">
      <header>{header}</header>
      {children}
    </div>
  );
}

export default ResultPage;
