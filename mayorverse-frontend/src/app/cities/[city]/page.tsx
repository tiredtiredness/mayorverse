import { redirect } from 'next/navigation';

export default async function CityRedirectPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const cityParams = await params;
  return redirect(`/cities/${cityParams.city}/polls`);
}
