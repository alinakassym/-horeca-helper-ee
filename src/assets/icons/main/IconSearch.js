import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const IconSearch = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={11}
        cy={11}
        r={7}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M20 20l-3-3"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
      />
    </Svg>
  );
};
