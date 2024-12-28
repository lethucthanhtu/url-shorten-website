import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main_layout/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/contact/_layout/"!</div>
}
