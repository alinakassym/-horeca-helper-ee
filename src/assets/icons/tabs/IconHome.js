import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconHome = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12.76c0-1.358 0-2.037.274-2.634.275-.597.79-1.038 1.821-1.922l1-.857C9.96 5.75 10.89 4.95 12 4.95c1.11 0 2.041.799 3.905 2.396l1 .857c1.03.884 1.546 1.325 1.82 1.922.275.597.275 1.276.275 2.634V17c0 1.886 0 2.828-.586 3.414C17.828 21 16.886 21 15 21H9c-1.886 0-2.828 0-3.414-.586C5 19.828 5 18.886 5 17v-4.24z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M14.5 21v-5a1 1 0 00-1-1h-3a1 1 0 00-1 1v5"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
