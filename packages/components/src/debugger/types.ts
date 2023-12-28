export interface MinDebuggerOptions {
  className?: string
  /** for custom header of the status tab */
  StatusHeader?: React.FC
  /** for custom footer of the status tab */
  StatusFooter?: React.FC
  /** for custom 2nd button in bottom of the status tab */
  StatusButton?: React.FC
}

export interface MinDebuggerProps {
  options?: MinDebuggerOptions
  onMove?(e: { x: number; y: number }): void
}
