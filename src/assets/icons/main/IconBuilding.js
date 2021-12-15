import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconBuilding = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 13.086V19.5a.75.75 0 0 0 .75.75h13.5a.75.75 0 0 0 .75-.75v-6.413M5.066 3.75h13.868a.75.75 0 0 1 .721.544L21 9H3l1.345-4.706a.75.75 0 0 1 .72-.544Z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9v1.5a3 3 0 0 1-6 0V9M15 9v1.5a3 3 0 0 1-6 0V9M21 9v1.5a3 3 0 0 1-6 0V9"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
