import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconBookmark = ({style, color, fillColor, size, width}) => {
  return (
    <Svg
      style={style}
      width={size || 24}
      height={size || 24}
      fill={fillColor || 'none'}>
      <Path
        d="M12.5 14 8 11.5 3.5 14V2.5A.5.5 0 0 1 4 2h8a.5.5 0 0 1 .5.5V14Z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
