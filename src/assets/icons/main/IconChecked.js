import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconChecked = ({size, color}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21a9 9 0 100-18 9 9 0 000 18zm-.232-5.36l5-6-1.536-1.28-4.3 5.159-2.225-2.226-1.414 1.414 3 3 .774.774.701-.84z"
        fill={color || '#ffffff'}
      />
    </Svg>
  );
};
