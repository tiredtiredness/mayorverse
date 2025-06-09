import { redirect } from "next/navigation";

export default async function CityRedirectPage({
  params,
}: {
  params: Promise<{ cityId: string }>;
}) {
  const cityParams = await params;
  return redirect(`/cities/${cityParams.cityId}/polls`);
}
