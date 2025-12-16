declare module "cmdk" {
    import * as React from "react"
    type CmdkPrimitive = React.ForwardRefExoticComponent<
        React.ComponentPropsWithoutRef<"div"> & React.RefAttributes<HTMLDivElement>
    >

    export const Command: CmdkPrimitive & {
        Input: CmdkPrimitive
        List: CmdkPrimitive
        Empty: CmdkPrimitive
        Group: CmdkPrimitive
        Separator: CmdkPrimitive
        Item: CmdkPrimitive
    }

    export default Command
}
