import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "./selection.json";

const iconLists = ["bell", "favorite", "bag"] as const;

export type IconTypes = (typeof iconLists)[number];

const Icon = (props: IconProps & { icon: IconTypes }) => (
  <IcoMoon iconSet={iconSet} {...props} />
);

export default Icon;
