import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

export const IconVacancies = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Rect
        x={6}
        y={4}
        width={13}
        height={17}
        rx={2}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M15 10V8M4 9h4M4 13h4M4 17h4"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
      />
    </Svg>
  );
};
