import { getCurrentUser } from "@/lib/session";
import { prisma } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';


interface DashboardChildProps {
  params: {
    id: string;
  };
}

const DashboardChild = async ({ params }: DashboardChildProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>New Workspace ID: {params.id}</p>
    </div>
  );
};

export default DashboardChild;