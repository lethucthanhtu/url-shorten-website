import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { createFileRoute, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/authen')({
	component: RouteComponent,
});

function RouteComponent() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const search: { url: string } = useSearch({ from: '/authen' });

	return (
		<>
			<div className='w-screen h-screen flex justify-center items-center'>
				<Tabs defaultValue='login' className='w-5/12'>
					<TabsList className='bg-gray-500h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2 mb-2'>
						<TabsTrigger
							value='login'
							className='capitalize inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
						>
							sign in
						</TabsTrigger>
						<TabsTrigger
							value='signup'
							className='capitalize inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
						>
							sign up
						</TabsTrigger>
					</TabsList>
					<TabsContent value='login' className=''>
						<Card>
							<CardHeader>
								<CardTitle>Account</CardTitle>
								<CardDescription>
									Make changes to your account here. Click save when you're
									done.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='space-y-1'>
									<Label>Name</Label>
									<Input id='name' />
								</div>
								<div className='space-y-1'>
									<Label>Username</Label>
									<Input id='username' />
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save changes</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value='signup'>
						<Card>
							<CardHeader>
								<CardTitle>Password</CardTitle>
								<CardDescription>
									Change your password here. After saving, you'll be logged out.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='space-y-1'>
									<Label>Current password</Label>
									<Input id='current' type='password' />
								</div>
								<div className='space-y-1'>
									<Label>New password</Label>
									<Input id='new' type='password' />
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save password</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}
