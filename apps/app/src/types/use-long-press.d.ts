declare module "use-long-press" {
  export function useLongPress(
    callback: () => void,
    options?: { cancelOnMovement?: number },
  ): (props: any) => any;
}
