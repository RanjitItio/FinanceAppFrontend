import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';


const data = [
  { value: 5, label: 'Bitcoin' },
  { value: 10, label: 'Etherium' },
  { value: 15, label: 'Binance' },
  { value: 20, label: 'Polkstar' },
];

const size = {
//   width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

const StyledNumber = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  fontWeight: 'bold'
}));


function PieCenterLabel({label, amount }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
    <StyledText x={left + width / 2} y={top + height / 2.5}>
      {label}
    </StyledText>

    <StyledNumber x={left + width / 2} y={top + height / 1.7}>
      {amount}
    </StyledNumber>
    </>
  );
}


export default function TotalBalanceChart() {
    const balanceText = 'Total Balance'
    const balanceValue = "$8970.67"

  return (
    <PieChart series={[{ data, innerRadius: 70 }]} {...size}>
      <PieCenterLabel label={balanceText} 
      amount={balanceValue}
      >
     </PieCenterLabel>
    </PieChart>
  );
}