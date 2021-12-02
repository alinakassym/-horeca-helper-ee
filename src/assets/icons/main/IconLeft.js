import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconLeft = ({color, size}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.707 6.707a1 1 0 0 0-1.414-1.414l1.414 1.414ZM9 12l-.707-.707-.707.707.707.707L9 12Zm5.293 6.707a1 1 0 0 0 1.414-1.414l-1.414 1.414Zm0-13.414-6 6 1.414 1.414 6-6-1.414-1.414Zm-6 7.414 6 6 1.414-1.414-6-6-1.414 1.414Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
