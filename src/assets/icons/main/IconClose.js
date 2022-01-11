import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconClose = ({style, color, size, width}) => {
  return (
    <Svg
      style={style}
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
