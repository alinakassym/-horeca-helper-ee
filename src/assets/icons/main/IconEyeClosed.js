import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconEyeClosed = ({color, size, width, style}) => {
  return (
    <Svg style={style} width={size || 16} height={size || 16} fill="none">
      <Path
        d="M1.5 5.5a11.08 11.08 0 0 0 1.713 2m11.287-2a11.077 11.077 0 0 1-1.712 2m0 0L14.5 9.234M12.788 7.5c-.933.847-1.944 1.425-2.982 1.734M3.213 7.5 1.5 9.234M3.213 7.5c.933.847 1.943 1.425 2.982 1.734m3.61 0 .723 2.266m-.722-2.266a6.268 6.268 0 0 1-3.611 0m0 0L5.472 11.5"
        stroke={color || '#8391A1'}
        strokeWidth={width || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
