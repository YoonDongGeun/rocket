'use client';
import { cn } from '@/utils/cn';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import useParentSize from '@/hooks/useParentSize';

interface ChatBubbleProps {
  direction: 'top' | 'bottom';
  text: string;
  py: number; // 풍선 상하 여백
  px: number; // 풍선 좌우 여백
  className?: string;
  x: number; // 풍선 x위치
  y: number; // 풍선 y 위치
}
// 풍선 말꼬리 위치, 추후 각도 변환식으로 변경이 더 나을 것으로 생각. ex) x도 위치에 y각도만큼 차지하는 말꼬리
const EllipseDrawAngleRange = {
  top: { start: (Math.PI * -60) / 96, end: (Math.PI * -62) / 96, offset: 20 },
  bottom: { start: (Math.PI * 59) / 96, end: (Math.PI * 56) / 96, offset: -20 },
};

function ChatBubble({
  className,
  direction,
  text,
  px,
  py,
  x,
  y,
}: PropsWithChildren<ChatBubbleProps>) {
  const { ref, size } = useParentSize<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dx = (x * size.width) / 375;
  const dy = (y * size.width) / 375;
  const [chatSize, setChatSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 디바이스 물리 픽셀비
    const dpr = window.devicePixelRatio || 1;

    // 상대 크기값
    const relativeSizeRatio = size.width / 375;
    const fontFamily = 'GapyeongHanseokbongBigBrush';
    const fontSize = 16 * relativeSizeRatio;
    const fontWeight = 400;
    const font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    ctx.font = font;
    // 텍스트 크기 측정
    const textMetrics = measureText(text, fontSize, ctx);

    // 원의 X, Y 반지름
    const radiusX = textMetrics.width / 2 + px * relativeSizeRatio;
    const radiusY = textMetrics.height / 2 + py * relativeSizeRatio;

    // 타원의 중심 위치
    const EllipseCenterX = radiusX + 1; // 잘림 방지
    const EllipseCenterY = direction === 'top' ? radiusY + 21 * relativeSizeRatio : radiusY + 1; // 말꼬리 위치에 따른 중심 조정

    // 실측된 크기와 물리 픽셀에 비율에 따른 Canvas 크기 조정
    const chatWidth = EllipseCenterX + radiusX + 1;
    const chatHeight = EllipseCenterY + radiusY + 21;
    canvas.width = Math.round(chatWidth * dpr);
    canvas.height = Math.round(chatHeight * dpr);
    // x, y 스케일 dpr로 조정
    ctx.scale(dpr, dpr);
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. 먼저 타원 그리기 (채우기만)
    ctx.beginPath();
    const angleRange = EllipseDrawAngleRange[direction];
    ctx.ellipse(
      EllipseCenterX,
      EllipseCenterY,
      radiusX,
      radiusY,
      0,
      angleRange.start,
      angleRange.end,
    );
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 1;
    ctx.stroke();
    const startPoint = getEllipsePoint(
      EllipseCenterX,
      EllipseCenterY,
      radiusX,
      radiusY,
      0,
      angleRange.start,
    );
    const endPoint = getEllipsePoint(
      EllipseCenterX,
      EllipseCenterY,
      radiusX,
      radiusY,
      0,
      angleRange.end,
    );
    // 2. 꼬리 그리기

    const { 꼭지점X, 꼭지점Y, 진입제어점X, 진입제어점Y, 출입제어점X, 출입제어점Y } = 꼭지점좌표(
      startPoint,
      endPoint,
      direction,
    );

    // 테두리
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.quadraticCurveTo(출입제어점X, 출입제어점Y, 꼭지점X, 꼭지점Y);
    ctx.quadraticCurveTo(진입제어점X, 진입제어점Y, endPoint.x, endPoint.y);
    ctx.lineWidth = 2;
    ctx.stroke();

    // 채우기
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.quadraticCurveTo(출입제어점X, 출입제어점Y, 꼭지점X, 꼭지점Y);
    ctx.quadraticCurveTo(진입제어점X, 진입제어점Y, endPoint.x, endPoint.y);
    ctx.lineTo(꼭지점X, (startPoint.y + endPoint.y + angleRange.offset) / 2);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // 3. 텍스트 그리기
    ctx.fillStyle = '#000000';
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const startY = EllipseCenterY - textMetrics.height / 2 + textMetrics.lineHeight / 2;

    textMetrics.lines.forEach((line, index) => {
      const y = startY + index * textMetrics.lineHeight;
      ctx.fillText(line, EllipseCenterX, y);
    });

    setChatSize({ width: chatWidth, height: chatHeight });
  }, [text, size]);

  return (
    <div ref={ref} className={cn('absolute left-0 top-0 w-full h-full', className)}>
      <canvas
        style={{
          transform: `translate(${dx}px,${dy}px)`,
          width: `${chatSize.width}px`,
          height: `${chatSize.height}px`,
        }}
        ref={canvasRef}
      />
    </div>
  );
}

export default ChatBubble;


const measureText = (text: string, fontSize: number, ctx: CanvasRenderingContext2D) => {
  const lines = text.split('\n');
  let maxWidth = 0;
  const lineHeight = fontSize * 1.5;

  lines.forEach((line) => {
    const metrics = ctx.measureText(line);
    maxWidth = Math.max(maxWidth, metrics.width);
  });

  const totalHeight = lines.length * lineHeight;

  return {
    width: maxWidth,
    height: totalHeight,
    lineHeight: lineHeight,
    lines: lines,
  };
};

function getEllipsePoint(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotation: number,
  theta: number,
) {
  const x =
    cx + rx * Math.cos(theta) * Math.cos(rotation) - ry * Math.sin(theta) * Math.sin(rotation);
  const y =
    cy + rx * Math.cos(theta) * Math.sin(rotation) + ry * Math.sin(theta) * Math.cos(rotation);
  return { x, y };
}

function 꼭지점좌표(
  startPoint: { x: number; y: number },
  endPoint: { x: number; y: number },
  direction: 'top' | 'bottom',
) {
  // 왼쪽, 오른쪽, 위, 아래 + 갈고리 휘는 방향 등 세부 설정까지 정리 후 리팩터링 필요.
  const isTopDirection = direction === 'top';
  const 꼭지점X = isTopDirection ? (startPoint.x + endPoint.x) / 2 : endPoint.x + 10;
  const 꼭지점Y = isTopDirection
    ? (startPoint.y + endPoint.y - 47) / 2
    : (startPoint.y + endPoint.y + 47) / 2;
  const 출입제어점X = (startPoint.x + 꼭지점X) / 2; // 오른쪽으로 얼마나 휘게 할지
  const 출입제어점Y = (꼭지점Y + startPoint.y) / 2; // 위쪽으로 살짝 들어올릴 수도 있음
  const 진입제어점X = endPoint.x; // 오른쪽으로 얼마나 휘게 할지
  const 진입제어점Y = (꼭지점Y + endPoint.y) / 2 - 5; // 위쪽으로 살짝 들어올릴 수도 있음

  return {
    꼭지점X,
    꼭지점Y,
    출입제어점X,
    출입제어점Y,
    진입제어점X,
    진입제어점Y,
  };
}
