import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconCalendar = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.75 1a.75.75 0 0 0-1.5 0v1H4a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3h-.25V1a.75.75 0 0 0-1.5 0v1h-4.5V1ZM2.5 6h11v6a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 12V6Zm5.25 1.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM7 11.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Zm-.9-3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM5 12.35a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
