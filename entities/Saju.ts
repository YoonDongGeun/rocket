export const 십간Map = {
  甲: '갑',
  乙: '을',
  丙: '병',
  丁: '정',
  戊: '무',
  己: '기',
  庚: '경',
  辛: '신',
  壬: '임',
  癸: '계',
} as const;
export const 십이지Map = {
  子: '자',
  丑: '축',
  寅: '인',
  卯: '묘',
  辰: '진',
  巳: '사',
  午: '오',
  未: '미',
  申: '신',
  酉: '유',
  戌: '술',
  亥: '해',
} as const;
export const 십성Map = {
  比肩: '비견',
  劫財: '겁재',
  食神: '식신',
  傷官: '상관',
  偏財: '편재',
  正財: '정재',
  七殺: '칠살',
  正官: '정관',
  偏印: '편인',
  正印: '정인',
} as const;
export const 운성Map = {
  長生: '장생',
  沐浴: '목욕',
  冠帶: '관대',
  臨官: '임관',
  帝旺: '제왕',
  衰: '쇠',
  病: '병',
  死: '사',
  墓: '묘',
  絶: '절',
  胎: '태',
  養: '양',
} as const;
export const 신살Map = {
  孤辰: '고신',
  寡宿: '과숙',
  亡神: '망신',
  災煞: '재살',
  天羅: '천라',
  地網: '지망',
  孤鶴: '고학',
  月殺: '월살',
  歲殺: '세살',
  劫煞: '겁살',
  羊刃: '양인',
  驛馬殺: '역마살',
  將星殺: '장성살',
  空亡: '공망',
  天殺: '천살',
  地殺: '지살',
  半安殺: '반안살',
  天玉殺: '천옥살',
} as const;
export const 귀인Map = {
  天乙: '천을귀인',
  月德: '월덕귀인',
  天德: '천덕귀인',
  月令: '월령귀인',
  文昌: '문창귀인',
  武人: '무인귀인',
  財運: '재운귀인',
  陽刃: '양인귀인',
  桃花: '도화귀인',
  貴門: '귀문귀인',
  太極: '태극귀인',
  元辰: '원진귀인',
} as const;
export const SajuTableRowHeaderMap = {
  十星: '십성',
  天干: '천간',
  地支: '지지',
  十二運星: '십이운성',
  十二神煞: '십이신살',
  貴人: '귀인',
} as const;
export type SajuTableRowHeader = keyof typeof SajuTableRowHeaderMap;
export type 십간 = keyof typeof 십간Map;
export type 십이지 = keyof typeof 십이지Map;
export type 귀인 = keyof typeof 귀인Map;
export type 신살 = keyof typeof 신살Map;
export type 운성 = keyof typeof 운성Map;
export type 십성 = keyof typeof 십성Map;
export type 오행 = '木' | '火' | '土' | '金' | '水';
export type 음양 = '陰' | '陽';
export type 음양오행 = `${음양}${오행}`;

export type 십간음양오행 = {
  십간: 십간;
  음양오행: 음양오행;
};
export type 십이지음양오행 = {
  십이지: 십이지;
  음양오행: 음양오행;
};

export type SajuResultDTO = {
  name: string;
  gender: 'M' | 'W';
  birth: {
    year: number;
    month: number;
    day: number;
    time: { hour: number; minute: number } | null;
  };
  result: {
    columns: ['', '時', '日', '月', '年'];
    rows: SajuTableRow[];
  };
};
export type SajuTableRow =
  | { attribute: '十星'; values: 십성[] }
  | { attribute: '天干'; values: 십간음양오행[] }
  | { attribute: '地支'; values: 십이지음양오행[] }
  | { attribute: '十二運星'; values: 운성[] }
  | { attribute: '十二神煞'; values: 신살[] }
  | { attribute: '貴人'; values: 귀인[][] };
