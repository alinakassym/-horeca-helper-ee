import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconCheck = ({color, size, width}) => {
  return (
    <Svg width={size || 16} height={size || 16} fill="none">
      <Path
        d="m13.5 4.5-7 7L3 8"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
