import { createFileRoute } from "@tanstack/react-router";
import { ForgeShell } from "@/components/forge-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ForgeShell />;
}
