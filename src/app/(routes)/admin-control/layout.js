import AuthGuard from "@/components/Auth/authGuard";

export default function RootLayout({ children }) {
  return (
    <AuthGuard>{children}</AuthGuard>
  );
}
