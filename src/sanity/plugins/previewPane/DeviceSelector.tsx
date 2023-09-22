import { DesktopIcon, MobileDeviceIcon } from "@sanity/icons";
import clsx from "clsx";

import type { FC } from "react";

type Props = {
  device: string;
  onChange?: (device: string) => void;
};
const DeviceSelector: FC<Props> = ({ device, onChange }) => (
  <>
    <button
      className={clsx(
        "mx-[2px] rounded-sm",
        device === "mobile" && "bg-[rgba(128,128,128,0.5)]",
      )}
      type="button"
      onClick={(): void => onChange?.("mobile")}
    >
      <MobileDeviceIcon width={24} height={24} />
    </button>
    <button
      className={clsx(
        "mx-[2px] rounded-sm",
        device === "desktop" && "bg-[rgba(128,128,128,0.5)]",
      )}
      type="button"
      onClick={(): void => onChange?.("desktop")}
    >
      <DesktopIcon width={24} height={24} />
    </button>
  </>
);

export default DeviceSelector;
