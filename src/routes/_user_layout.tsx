import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_user_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>Hello "/_profile_layout"!</div>
      <Outlet />
    </>
  )
}
