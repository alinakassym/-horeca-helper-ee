import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export const IconRating = ({color, size, width}) => {
  return (
    <Svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M8 10v6M12 12v4M16 8v8"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={3}
        y={4}
        width={18}
        height={16}
        rx={2}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
    </Svg>
  );
};
