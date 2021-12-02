import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconMessageStatus = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} fill="none">
      <Path
        d="m3 12 2.5 2.5 7-8.5M8.5 13.5l1 1 7-8.5"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
