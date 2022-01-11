import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconBucket = ({color, size, width, style}) => {
  return (
    <Svg style={style} width={size || 16} height={size || 16} fill="none">
      <Path
        d="m3.5 4 .87 9.142A1.5 1.5 0 0 0 5.865 14.5h4.272a1.5 1.5 0 0 0 1.493-1.358L12.5 4M2 4h3.5M14 4h-3.5m0 0h-5m5 0V3A1.5 1.5 0 0 0 9 1.5H7A1.5 1.5 0 0 0 5.5 3v1M9.5 6.5 9.25 12m-2.5 0L6.5 6.5"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
