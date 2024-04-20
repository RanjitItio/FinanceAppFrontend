import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { blue, orange, red } from '@mui/material/colors';
import { color } from 'chart.js/helpers';




export default function BasicSparkLine({ChartColor}) {
  
  return (
    <Stack direction="row" sx={{ width: '60px'}}>
      <Box sx={{ flexGrow: 1}}>
        <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={50} showTooltip={true} sx={{ "& path": { stroke: ChartColor } }} />
      </Box>
    </Stack>


  );
}