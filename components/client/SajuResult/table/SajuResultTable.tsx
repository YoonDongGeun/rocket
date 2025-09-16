'use client';
import {
  귀인,
  귀인Map,
  오행,
  SajuResultDTO,
  SajuTableRowHeaderMap,
  신살Map,
  십이지Map,
  십간Map,
  십성Map,
  운성Map,
  SajuTableRow,
  음양오행,
} from '@/entities/Saju';
import { cn } from '@/utils/cn';

import { PropsWithChildren, useRef } from 'react';

interface SajuResultTableProps {
  sajuTableData: SajuResultDTO['result'];
}
function SajuResultTable({ sajuTableData }: SajuResultTableProps) {
  return (
    <div className="grid grid-rows-[45fr_44fr_66.5fr_66.5fr_44fr_44fr_44fr_auto] mx-[5.3%] mt-6.5 mb-6.25 text-center cursor-pointer">
      <TableHeaderRowContainer>
        {sajuTableData.columns.map((column) => (
          <TableHeaderCell key={`header-${column}`} value={column} />
        ))}
      </TableHeaderRowContainer>
      {sajuTableData.rows.map((row, index) => (
        <TableRowContainer key={`row-header-${index}`}>
          <TableRowHeaderCell value={row.attribute} />
          <TableRowDataCells row={row} />
        </TableRowContainer>
      ))}
    </div>
  );
}

export default SajuResultTable;

const AttributeHangeulMap = {
  十星: 십성Map,
  十二神煞: 신살Map,
  十二運星: 운성Map,
  天干: 십간Map,
  地支: 십이지Map,
};
const TextSizeClass = {
  columnHeader: 'text-[clamp(12px,calc(21px+(100vw-375px)/24),24px)]',
  dataCellTitle: 'text-[clamp(10px,calc(15px+(100vw-375px)/24),18px)]',
  dataCellSubTitle: 'text-[clamp(8px,calc(12px+(100vw-375px)/24),14px)]',
  rowHeaderTitle: 'text-[clamp(8px,calc(12px+(100vw-375px)/5),12px)]',
  rowHeaderTitleLong: 'text-[clamp(8px,calc(10px+(100vw-375px)/5),11px)]',
  rowHeaderSubTitle: 'text-[clamp(6px,calc(8px+(100vw-375px)/48),10px)]',
  colorCell한글: 'text-[clamp(6px,calc(8px+(100vw-375px)/48),9px)]',
  colorCell한자: 'text-[clamp(18px,calc(24px+(100vw-375px)/15),25px)]',
  colorCell음양오행: 'text-[clamp(6px,calc(8px+(100vw-375px)/48),10px)]',
} as const;
function TableHeaderRowContainer({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[48fr_65fr_65fr_65fr_65fr] w-full h-full border-b-2">
      {children}
    </div>
  );
}

function TableHeaderCell({ value }: { value: string }) {
  return (
    <div
      className={cn('flex items-center justify-center w-full h-full', {
        'border-r-1': true,
        '[&:first-child]:border-r-2': true,
        '[&:last-child]:border-r-2': true,
      })}
    >
      <span
        className={cn('align-middle font-zen', {
          [TextSizeClass['columnHeader']]: true,
        })}
      >
        {value}
      </span>
    </div>
  );
}
function TableRowContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={cn('grid grid-cols-[48fr_65fr_65fr_65fr_65fr] place-items-center w-full h-full', {
        '[&>div]:border-r-1': true,
        '[&>div:first-child]:border-r-2': true,
        '[&>div:last-child]:border-r-2': true,
        '[&]:border-b-2': true,
        '[&:nth-child(3)]:border-b-1': true,
        '[&>div:not(:first-child)]:bg-white/80': true,
      })}
    >
      {children}
    </div>
  );
}

function TableRowHeaderCell({ value }: { value: keyof typeof SajuTableRowHeaderMap }) {
  return (
    <div className="flex flex-col w-full h-full justify-center overflow-visible min-w-0">
      <span
        className={
          value.length > 2
            ? TextSizeClass['rowHeaderTitleLong']
            : `${TextSizeClass['rowHeaderTitle']} tracking-normal font-zen`
        }
      >
        {value}
      </span>
      <span className={`${TextSizeClass['rowHeaderSubTitle']} font-gyeonggi`}>
        ({SajuTableRowHeaderMap[value]})
      </span>
    </div>
  );
}
function TableRowDataCells({ row }: { row: SajuTableRow }) {
  switch (row.attribute) {
    case '十星':
      return (
        <>
          {row.values.map((value, index) => (
            <십성신살운성Cell
              key={`cell-${index}`}
              한자={value}
              한글={AttributeHangeulMap[row.attribute][value]}
            />
          ))}
        </>
      );
    case '十二神煞':
      return (
        <>
          {row.values.map((value, index) => (
            <십성신살운성Cell
              key={`cell-${index}`}
              한자={value}
              한글={AttributeHangeulMap[row.attribute][value]}
            />
          ))}
        </>
      );
    case '十二運星':
      return (
        <>
          {row.values.map((value, index) => (
            <십성신살운성Cell
              key={`cell-${index}`}
              한자={value}
              한글={AttributeHangeulMap[row.attribute][value]}
            />
          ))}
        </>
      );
    case '天干':
      return (
        <>
          {row.values.map((value, index) => (
            <음양오행Cell
              key={`cell-${index}`}
              한자={value.십간}
              한글={십간Map[value.십간]}
              음양오행={value.음양오행}
            />
          ))}
        </>
      );
    case '地支':
      return (
        <>
          {row.values.map((value, index) => (
            <음양오행Cell
              key={`cell-${index}`}
              한자={value.십이지}
              한글={십이지Map[value.십이지]}
              음양오행={value.음양오행}
            />
          ))}
        </>
      );
    case '貴人':
      return (
        <>
          {row.values.map((value, index) => (
            <귀인Cell key={`cell-${index}`} values={value} />
          ))}
        </>
      );
    default:
      throw new Error('없는 테이블 행 속성');
  }
}

function 십성신살운성Cell({ 한자, 한글 }: { 한자: string; 한글: string }) {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <span className={`font-zen ${TextSizeClass['dataCellTitle']}`}>{한자}</span>
      <span className={`font-gyeonggi ${TextSizeClass['dataCellSubTitle']}`}>({한글})</span>
    </div>
  );
}
function 음양오행Cell({
  한자,
  한글,
  음양오행,
}: {
  한자: string;
  한글: string;
  음양오행: 음양오행;
}) {
  const 오행 = 음양오행[1] as 오행;
  return (
    <div className="p-1.25 w-full h-full relative">
      <div
        className={cn('flex flex-col items-center justify-center rounded-[15%] aspect-square', {
          [OHeangClassMap[오행]]: true,
        })}
        style={{ backgroundColor: OHeangColorMap[오행] }}
      >
        <span className={`${TextSizeClass['colorCell한글']} font-gyeonggi`}>{한글}</span>
        <span className={`${TextSizeClass['colorCell한자']} leading-none font-zen`}>{한자}</span>
        <span className={`${TextSizeClass['colorCell음양오행']} font-zen-maru`}>{음양오행}</span>
      </div>
    </div>
  );
}
function 귀인Cell({ values }: { values: 귀인[] }) {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      {values.length === 0 ? (
        <span className="text-[10px]">(없음)</span>
      ) : (
        values.map((value, index) => (
          <div className="flex flex-col" key={`GuiIn-${index}`}>
            <span className={`${TextSizeClass['dataCellTitle']} font-zen`}>{value}</span>
            <span className={`${TextSizeClass['dataCellSubTitle']} font-gyeonggi`}>
              ({귀인Map[value]})
            </span>
          </div>
        ))
      )}
    </div>
  );
}

const OHeangClassMap: Record<오행, string> = {
  土: 'bg-[#007FFF] text-black border-1',
  木: 'bg-[#18878C] text-white',
  水: 'bg-[#2F2F2F] text-white',
  火: 'bg-[#C23030] text-white',
  金: 'bg-[#F9F9F9] text-black border-1',
};
const OHeangColorMap: Record<오행, string> = {
  土: '#007FFF',
  木: '#18878C',
  水: '#2F2F2F',
  火: '#C23030',
  金: '#F9F9F9',
};
