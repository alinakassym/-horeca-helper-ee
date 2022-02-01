import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconMessages = ({style, color, size}) => {
  return (
    <Svg
      style={style}
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 11.5c0 5.247-4.925 9.5-11 9.5-1.04 0-1.665-.032-3-.358-.82-.2-3.658 1.116-5.721 2.16-.67.338-1.494-.45-1.235-1.154.664-1.803 1.233-4.217.266-5.648C1.426 14.692 1 13.128 1 11.5 1 6.253 5.925 2 12 2s11 4.253 11 9.5ZM7 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm6.5-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM17 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
