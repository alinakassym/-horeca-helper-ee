import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconWallet = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 7.28V5c0-1.1-.9-2-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"
        fill={color || '#000000'}
      />
      <Path
        d="M16 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
