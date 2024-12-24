import TulttLogo from "@/assets/svg/TuLTTlogo.svg";
import { cn } from "@/lib/utils";

import { ImgHTMLAttributes } from "react";

type LogoProps = {
  showText?: boolean;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export default function Logo({ showText = false, ...props }: LogoProps) {
  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <a
          href="/"
          className={cn(
            "flex justify-center items-center gap-2 rounded",
            props.className
          )}
        >
          <img {...props} className={cn("dark:invert")} src={TulttLogo} />
          <span className="sr-only">TuLTT</span>
        </a>
        {showText && <h1 className="text-xl font-bold">TuLTT</h1>}
      </div>
    </>
  );
}
