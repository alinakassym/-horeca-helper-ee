import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

export const IconProfile = ({color, size}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={7} r={5} fill={color || '#000000'} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.311 21.633c-1.684-.721-2.368-2.755-1.253-4.21A9.984 9.984 0 0 1 12 13.5a9.984 9.984 0 0 1 7.942 3.923c1.115 1.455.432 3.489-1.253 4.21A16.944 16.944 0 0 1 12 23c-2.375 0-4.636-.487-6.689-1.367Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
