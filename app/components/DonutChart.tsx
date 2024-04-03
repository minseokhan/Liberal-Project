"use client";

import styled from "styled-components";

interface DonutChartProps {
  deg: number;
  color: string;
  grade: string;
}

const ChartBar = styled.div<{ color: string; deg: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${(props) =>
    `conic-gradient(#f5f5f5 ${360 - props.deg * 3.6}deg, ${props.color} ${
      360 - props.deg * 3.6
    }deg)`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DonutChart: React.FC<DonutChartProps> = ({ deg, color, grade }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center">
      <div
        className={`
        relative
        rounded-[50%]
        transition
        delay-150
        bg-slate-100
        inline-block
        after:content-['']
        after:absolute 
      after:bg-white
        after:top-[50%]
        after:left-[50%]
        w-24 h-24 after:w-16 after:h-16
        after:rounded-[50%]
        after:-translate-x-1/2
        after:-translate-y-1/2
      `}
      >
        <ChartBar deg={deg} color={color}>
          <p className="z-20 text-blue7">{deg}%</p>
        </ChartBar>
      </div>
      <p className="text-blue7">{grade}</p>
    </div>
  );
};

export default DonutChart;
