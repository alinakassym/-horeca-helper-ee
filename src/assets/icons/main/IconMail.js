import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const IconMail = ({color, size, width}) => {
  return (
    <Svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M20 20H4a2 2 0 01-2-2V5.913A2 2 0 014 4h16a2 2 0 012 2v12a2 2 0 01-2 2zM4 7.868V18h16V7.868L12 13.2 4 7.868zM4.8 6l7.2 4.8L19.2 6H4.8z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
