import { AdminBuilder } from "@/components/admin/AdminBuilder";
import { getSiteConfig, getSiteConfigStorage } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const config = await getSiteConfig();
  const storage = getSiteConfigStorage();

  return <AdminBuilder initialConfig={config} initialStorage={storage} />;
}
