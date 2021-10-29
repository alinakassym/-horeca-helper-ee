import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconExpandRightLight = ({color, size}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 12l.354-.354.353.354-.353.354L15 12zM9.354 5.646l6 6-.708.708-6-6 .708-.708zm6 6.708l-6 6-.708-.708 6-6 .708.708z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
