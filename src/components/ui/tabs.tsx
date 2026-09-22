import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={cn("flex flex-wrap gap-1 rounded-md border border-border bg-elevated p-1", className)}
    {...props}
  />
);
export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "min-h-10 flex-1 rounded-sm px-3 text-sm text-muted transition-colors data-[state=active]:bg-surface data-[state=active]:text-fg",
      className,
    )}
    {...props}
  />
);
export const TabsContent = TabsPrimitive.Content;
