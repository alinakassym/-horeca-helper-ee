import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

export const IconDots = ({color, size}) => {
  return (
    <Svg width={size || 16} height={size || 16} fill="none">
      <Circle cx={8} cy={2.5} r={1.5} fill={color || '#000000'} />
      <Circle cx={8} cy={8} r={1.5} fill={color || '#000000'} />
      <Circle cx={8} cy={13.5} r={1.5} fill={color || '#000000'} />
    </Svg>
  );
};
