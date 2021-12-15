import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconAdd = ({color, size, width}) => {
  return (
    <Svg width={size || 16} height={size || 16} fill="none">
      <Path
        d="M8 2v6m0 0h6M8 8H2m6 0v6"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
      />
    </Svg>
  );
};
