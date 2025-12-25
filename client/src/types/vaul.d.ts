declare module "vaul" {
  import * as React from "react";

  type AnyComponent<P = Record<string, unknown>> =
    | React.ForwardRefExoticComponent<P & React.RefAttributes<any>>
    | React.ComponentType<P>;

  interface DrawerRootProps {
    shouldScaleBackground?: boolean;
    children?: React.ReactNode;
  }

  type DrawerTriggerProps = React.HTMLAttributes<HTMLElement>;
  type DrawerPortalProps = React.PropsWithChildren<Record<string, unknown>>;
  type DrawerCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
  type DrawerOverlayProps = React.HTMLAttributes<HTMLDivElement>;
  type DrawerContentProps = React.HTMLAttributes<HTMLDivElement>;
  type DrawerTitleProps = React.HTMLAttributes<HTMLElement>;
  type DrawerDescriptionProps = React.HTMLAttributes<HTMLElement>;

  export const Drawer: {
    Root: AnyComponent<DrawerRootProps> & { displayName?: string };
    Trigger: AnyComponent<DrawerTriggerProps> & { displayName?: string };
    Portal: AnyComponent<DrawerPortalProps> & { displayName?: string };
    Close: AnyComponent<DrawerCloseProps> & { displayName?: string };
    Overlay: AnyComponent<DrawerOverlayProps> & { displayName?: string };
    Content: AnyComponent<DrawerContentProps> & { displayName?: string };
    Title: AnyComponent<DrawerTitleProps> & { displayName?: string };
    Description: AnyComponent<DrawerDescriptionProps> & { displayName?: string };
  };

  export default Drawer;
}
