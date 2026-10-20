import { ArcLinkProvider } from "@/components/arc-link-provider";
import { ShellFrame } from "@/components/shell-frame";
import { getExperiments } from "@/lib/experiments";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <ArcLinkProvider>
      <ShellFrame count={getExperiments().length}>{children}</ShellFrame>
    </ArcLinkProvider>
  );
}
