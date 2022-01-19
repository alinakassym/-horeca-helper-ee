import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

export const IconDot = ({style, color, size}) => {
  return (
    <Svg
      style={style}
      width={size || 4}
      height={size || 4}
      viewBox="0 0 4 4"
      fill="none">
      <Circle cx={2} cy={2} r={2} fill={color || '#000000'} />
    </Svg>
  );
};
