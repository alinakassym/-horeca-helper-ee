import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconArrowBack = ({color, size}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12l-.707-.707-.707.707.707.707L4 12zm15 1a1 1 0 100-2v2zM9.293 5.293l-6 6 1.414 1.414 6-6-1.414-1.414zm-6 7.414l6 6 1.414-1.414-6-6-1.414 1.414zM4 13h15v-2H4v2z"
        fill={color || '#CCD2E3'}
      />
    </Svg>
  );
};
