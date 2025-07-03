import { forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { EChartsReactProps } from 'echarts-for-react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import ReactEChartsCore from 'echarts-for-react/lib/core';

export interface ReactEchartProps extends BoxProps {
  echarts: EChartsReactProps['echarts'];
  option: EChartsReactProps['option'];
}

const ReactEchart = forwardRef<null | EChartsReactCore, ReactEchartProps>(
  ({ option, ...rest }, ref) => {
    return (
      <Box
        component={ReactEChartsCore}
        ref={ref}
        option={{
          ...option,
          tooltip: {
            ...option.tooltip,
            confine: true,
          },
        }}
        {...rest}
      />
    );
  },
);

export default ReactEchart;
// import { forwardRef } from 'react';
// import { Box, BoxProps } from '@mui/material';
// import { EChartsOption } from 'echarts';
// import ReactECharts from 'echarts-for-react/lib/core';
// import { EChartsReactProps } from 'echarts-for-react';

// export interface ReactEchartProps extends BoxProps {
//   echartsInstance: EChartsReactProps['echarts'];
//   option: EChartsOption;
//   style?: React.CSSProperties;
// }

// const ReactEchart = forwardRef<any, ReactEchartProps>(
//   ({ echartsInstance, option, style, ...rest }, ref) => (
//     <Box
//       component={ReactECharts}
//       ref={ref}
//       echarts={echartsInstance}
//       option={{
//         ...option,
//         tooltip: { ...option.tooltip, confine: true },
//       }}
//       style={style}
//       {...rest}
//     />
//   ),
// );

// export default ReactEchart;
