declare module "vaul" {
  import * as React from "react"

  type AnyComponent = React.ForwardRefExoticComponent<any> | React.ComponentType<any>

  export const Drawer: {
    Root: AnyComponent & { displayName?: string }
    Trigger: AnyComponent & { displayName?: string }
    Portal: AnyComponent & { displayName?: string }
    Close: AnyComponent & { displayName?: string }
    Overlay: AnyComponent & { displayName?: string }
    Content: AnyComponent & { displayName?: string }
    Title: AnyComponent & { displayName?: string }
    Description: AnyComponent & { displayName?: string }
  }

  export default Drawer
}
