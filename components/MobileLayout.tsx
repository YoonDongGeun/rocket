import { PropsWithChildren } from 'react';

function MobileLayout({ children }: PropsWithChildren) {
  return <div className="max-w-md mx-auto">{children}</div>;
}

export default MobileLayout;
