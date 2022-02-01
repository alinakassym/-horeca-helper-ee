import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconEye = ({color, size, style}) => {
  return (
    <Svg style={style} width={size || 16} height={size || 16} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 11.75c-1.937 0-3.995-1.167-5.623-3.75C4.005 5.417 6.063 4.25 8 4.25c1.937 0 3.995 1.167 5.623 3.75-1.627 2.583-3.686 3.75-5.623 3.75Zm7.148-4.128C13.308 4.47 10.72 2.75 8 2.75c-2.72 0-5.309 1.72-7.148 4.872a.75.75 0 0 0 0 .756C2.692 11.53 5.28 13.25 8 13.25c2.72 0 5.309-1.72 7.148-4.872a.75.75 0 0 0 0-.756ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill={color || '#8391A1'}
      />
    </Svg>
  );
};
