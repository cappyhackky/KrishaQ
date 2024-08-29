import ClientProviders from "./ClientProviders";
import AuthProvider from "@/lib/Providers/AuthProvider";
export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <AuthProvider>{children}</AuthProvider>
    </ClientProviders>
  );
}
