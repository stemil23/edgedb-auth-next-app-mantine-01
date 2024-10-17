import { auth } from '@/edgedb';
import ProfileFormClient from '../../../components/ProfileCreate';

export const dynamic = 'force-dynamic';

async function createProfile(formData: FormData) {
'use server';

  const session = await auth.getSession();
  const name = formData.get('name') as string;
  const language = formData.get('language') as string;
  const passport_issuer = formData.get('passport_issuer') as string;

  await session.client.query(`
    with
      name := <str>$name,
      language := <str>$language,
      passport_issuer := <str>$passport_issuer
    insert Profile {
      name := name,
      language := language,
      passport_issuer := passport_issuer
    }
  `, { name, language, passport_issuer });
  return { success: true };
  // redirect("/dashboard/profile");
}

export default function ProfileFormPage() {
  return <ProfileFormClient createProfile={createProfile} />;
}
