import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconWarningCircle = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeMiterlimit={10}
      />
      <Path
        d="M12 7.5v5.25"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17.25A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0 2.25Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
