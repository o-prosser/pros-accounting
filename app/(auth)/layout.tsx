import Logo from "@/components/ui/logo";

const AuthLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className="px-6 sm:px-8 sm:min-h-screen w-screen overflow-x-hidden sm:flex flex-col items-center justify-center space-y-3 sm:space-y-8 pt-8 sm:pt-0">
      <Logo className="h-6 fill-foreground w-auto" />
      <div className="sm:max-w-lg mx-auto w-full">
        {children}
      </div>
      <div className="flex sm:justify-center text-muted-foreground text-sm">
        <p>&copy; Owen Prosser {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default AuthLayout;