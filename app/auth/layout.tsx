const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Auth flex h-screen items-center justify-center bg-gradient-to-br from-neutral-300 to-stone-400">
      {children}
    </div>
  );
};
export default AuthLayout;
