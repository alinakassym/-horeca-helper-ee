import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconOptions = ({color}) => {
  return (
    <Svg width={16} height={16} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.413 5.5A3.251 3.251 0 0 1 1 4.75 3.25 3.25 0 0 1 7.413 4H13a.75.75 0 0 1 0 1.5H7.413ZM2.25 11.25A.75.75 0 0 1 3 10.5h5.587a3.251 3.251 0 0 1 6.413.75 3.25 3.25 0 0 1-6.413.75H3a.75.75 0 0 1-.75-.75Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
