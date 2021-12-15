import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconTime = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} fill="none">
      <Path
        d="M3 2h1m9 0h-1M3 14h1m9 0h-1M4 2h8M4 2c0 2 .75 3 1.5 3.75M7 8h2M7 8a1.75 1.75 0 0 0-.307-1M7 8c0 1.817-2.477 1.983-2.93 5M4 14h8m-8 0c0-.365.025-.697.07-1M12 2c0 2-.75 3-1.5 3.75M9 8c0-.396.118-.714.307-1M9 8c0 1.817 2.477 1.983 2.93 5m.07 1c0-.365-.025-.697-.07-1M10 6.229H6m4 0c-.269.255-.513.499-.693.771M10 6.229c.16-.153.33-.31.5-.479M6 6.229c.269.255.513.499.693.771M6 6.229c-.16-.153-.33-.31-.5-.479M6.693 7h2.614M10.5 5.75h-5M11.93 13H4.07"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
