import { redirect } from 'next/navigation';

export default async function CityRedirectPage({ params }) {
  const cityParams = await params;
  return redirect(`/cities/${cityParams.city}/polls`);
}
