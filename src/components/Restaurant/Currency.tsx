import { IndianRupee } from "lucide-react";
import React from "react";

type Props = {
  children?: React.ReactNode;
  onlyIcon?: boolean;
  size?: string;
};

const Currency = ({ children, onlyIcon = false, size = "w-4" }: Props) => {
  return (
    <div className="flex items-center">
      <IndianRupee className={size} />
      {onlyIcon ? <></> : children}
    </div>
  );
};

export default Currency;
