import * as React from 'react';
import Svg, {Path, Circle, Mask, G} from 'react-native-svg';

export const IconNotifications = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.448 7.97a5.586 5.586 0 0111.104 0l.252 2.266.006.057a8 8 0 001.074 3.18l.03.05.577.963c.525.874.787 1.311.73 1.67a1 1 0 01-.345.61c-.279.234-.789.234-1.808.234H5.932c-1.02 0-1.53 0-1.808-.233a1 1 0 01-.346-.611c-.056-.359.206-.796.73-1.67l.579-.964.03-.05a8 8 0 001.073-3.179l.006-.057.252-2.267z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M9.102 17.406c.171.744.548 1.402 1.072 1.87.524.47 1.166.724 1.826.724.66 0 1.302-.254 1.826-.723.524-.47.9-1.127 1.072-1.871"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
      />
    </Svg>
  );
};
