
export interface ProtectedRouteInterface {
  userToken: string | null
  redirectPath?: string
  children: JSX.Element
}
