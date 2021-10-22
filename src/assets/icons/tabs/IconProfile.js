import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

export const IconProfile = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={10}
        r={3}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={9}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M17.78 18.826a.286.286 0 00.134-.355c-.386-.966-1.128-1.818-2.133-2.438C14.697 15.363 13.367 15 12 15s-2.697.363-3.781 1.033c-1.005.62-1.747 1.471-2.133 2.438a.286.286 0 00.133.355 12.011 12.011 0 0011.561 0z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
