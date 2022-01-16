import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconShare = ({style, color, size, width}) => {
  return (
    <Svg style={style} width={size || 26} height={size || 26} fill="none">
      <Path
        d="M11 7.5h.5A1.5 1.5 0 0 1 13 9v4.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5V9a1.5 1.5 0 0 1 1.5-1.5H5M8 1v9.5M8 1 5 4m3-3 3 3"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
