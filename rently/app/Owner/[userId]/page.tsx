import OwnerPage from "../OwnerPage";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

interface OwnerUserPageProps {
  params: Promise<{ userId: string }>;
}

export default async function OwnerUserPage({ params }: OwnerUserPageProps) {
  const { userId } = await params;
  const userName = (await cookies()).get("userName")?.value ?? "";
  const owner = await prisma.owner.findUnique({
    where: { userId },
    select: { id: true },
  });

  return <OwnerPage userName={userName} ownerId={owner?.id ?? ""} />;
}
