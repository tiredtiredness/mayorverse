import { redirect } from 'next/navigation';

export default async function ProfileRedirectPage() {
  return redirect(`/profile/favorites`);
}
