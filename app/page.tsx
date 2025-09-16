import ChatBubble from '@/components/client/ChatBubble';
import SajuResultBoard from '@/components/client/SajuResult/SajuResultBoard';
import SajuResultScene1 from '@/components/client/SajuResult/SajuResultScene1';
import SajuResultScene2 from '@/components/client/SajuResult/SajuResultScene2';
import SajuResultScene3 from '@/components/client/SajuResult/SajuResultScene3';
import ResultPage from '@/components/server/ResultPage';
import ResultTitle from '@/components/server/ResultTitle';
import { SajuResultDTO } from '@/entities/Saju';

const dummyData: SajuResultDTO = {
  name: '김로켓',
  birth: {
    year: 1980,
    month: 8,
    day: 27,
    time: {
      hour: 8,
      minute: 10,
    },
  },
  gender: 'M',
  result: {
    columns: ['', '時', '日', '月', '年'],
    rows: [
      { attribute: '十星', values: ['傷官', '比肩', '傷官', '傷官'] },
      {
        attribute: '天干',
        values: [
          { 십간: '壬', 음양오행: '陽水' },
          { 십간: '丁', 음양오행: '陰火' },
          { 십간: '癸', 음양오행: '陰水' },
          { 십간: '癸', 음양오행: '陰水' },
        ],
      },
      {
        attribute: '地支',
        values: [
          { 십이지: '寅', 음양오행: '陽木' },
          { 십이지: '巳', 음양오행: '陰火' },
          { 십이지: '亥', 음양오행: '陰水' },
          { 십이지: '酉', 음양오행: '陽金' },
        ],
      },
      { attribute: '十星', values: ['比肩', '劫財', '食神', '偏財'] },
      { attribute: '十二運星', values: ['死', '帝旺', '胎', '長生'] },
      { attribute: '十二神煞', values: ['劫煞', '地殺', '驛馬殺', '將星殺'] },
      { attribute: '貴人', values: [[], [], ['天乙'], ['天乙', '太極', '文昌']] },
    ],
  },
};

export default function Home() {
  const firstName = dummyData.name.slice(1);
  return (
    <ResultPage header={<ResultTitle chapter="제 1장" title="나의 사주 팔자" />}>
      <SajuResultScene1>
        <ChatBubble
          direction="top"
          px={40}
          py={22}
          x={24}
          y={613}
          text={`이제 본격적으로\n${firstName}님의 사주팔자를\n분석해볼 차례네요.`}
        />
      </SajuResultScene1>
      <SajuResultScene2 />
      <SajuResultScene3>
        {/* Gapyeong Hanseokbong라는 폰트가 CDN으로는 없고 직접 다운받아야해서 그냥 CDN 있는 Gapyeong Hanseokbong 큰붓체로 사용. (더 Bold합니다.)  */}
        <ChatBubble
          direction="bottom"
          px={34}
          py={34}
          x={24}
          y={-104}
          text={`제가 ${firstName}님의 사주를\n보기 쉽게 표로 정리했어요`}
        />
      </SajuResultScene3>
      <SajuResultBoard sajuResult={dummyData} />
    </ResultPage>
  );
}
