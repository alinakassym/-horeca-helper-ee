import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconNotifications = ({color, size}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22.5a3 3 0 0 0 2.999-3.084c-.007-.242-.217-.418-.459-.42l-5.068-.058c-.242-.003-.456.168-.468.41A3 3 0 0 0 12 22.5ZM5 9c0-3.866 3.134-7.5 7-7.5s7 3.634 7 7.5v2.46c0 1.298.555 2.533 1.524 3.395 1.04.925.386 2.645-1.006 2.645H4.481c-1.391 0-2.046-1.72-1.005-2.645A4.541 4.541 0 0 0 5 11.46V9Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
