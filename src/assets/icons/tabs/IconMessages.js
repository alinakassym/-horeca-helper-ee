import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export const IconMessages = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={6}
        width={16}
        height={12}
        rx={2}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M4 9l7.106 3.553a2 2 0 001.788 0L20 9"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
    </Svg>
  );
};
