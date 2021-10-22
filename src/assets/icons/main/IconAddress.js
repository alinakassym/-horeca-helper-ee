import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const IconAddress = ({color, size, width}) => {
  return (
    <Svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.398 19.804C13.881 19.034 19 16.016 19 11a7 7 0 10-14 0c0 5.016 5.119 8.035 6.602 8.804a.855.855 0 00.796 0zM12 14a3 3 0 100-6 3 3 0 000 6z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
