import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconExpandUp = ({size, color, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} fill="none">
      <Path
        d="m3 10 5-5 5 5"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
