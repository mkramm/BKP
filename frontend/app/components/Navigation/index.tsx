import { Suspense } from "react";
import StaticNavigation from "./StaticNavigation";
import ClientNavigation from "./ClientNavigation";
import type { NavigationProps } from "./types";

export default function Navigation(props: NavigationProps) {
  return (
    <Suspense fallback={<StaticNavigation {...props} />}>
      <ClientNavigation {...props} />
    </Suspense>
  );
}
