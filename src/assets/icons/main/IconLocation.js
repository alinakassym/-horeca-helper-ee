import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconLocation = ({color, size, style}) => {
  return (
    <Svg style={style} width={size || 16} height={size || 16} fill="none">
      <Path
        d="M1.972 3.283 6.56 14.068c.369.867 1.623.79 1.881-.117l1.072-3.75a1 1 0 0 1 .687-.687l3.75-1.071c.906-.26.984-1.513.117-1.882L3.283 1.97c-.828-.352-1.664.484-1.311 1.312Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
