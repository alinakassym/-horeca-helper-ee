import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const IconSearch = ({color, width, size}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={10}
        cy={10}
        r={7.5}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="m21 21-5.5-5.5"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
