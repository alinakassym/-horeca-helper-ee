import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const IconCrown = ({color, size, width}) => {
  return (
    <Svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M21.729 7.778a.772.772 0 00-.84-.107l-4.227 2.058-3.967-4.574a.773.773 0 00-1.168 0L7.561 9.73 3.333 7.67a.773.773 0 00-1.077.92l2.935 9.656a.773.773 0 00.74.548h12.36c.34 0 .64-.222.74-.548l2.936-9.657a.772.772 0 00-.238-.812zm-4.01 9.472H6.503L4.25 9.835l3.168 1.543a.772.772 0 00.922-.189l3.772-4.348 3.772 4.348c.229.265.607.342.922.189l3.168-1.543-2.254 7.415z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
