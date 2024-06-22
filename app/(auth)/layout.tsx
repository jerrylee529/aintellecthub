import { AuthNavBar } from "@/components/layout/auth-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";


interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col">
      <AuthNavBar />
      <MaxWidthWrapper className="min-h-screen" large>
        {children}
      </MaxWidthWrapper>
      <SiteFooter className="border-t" />
    </div>
  );
}
