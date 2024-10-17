import { auth } from '@/edgedb';
import e from '@/dbschema/edgeql-js';
import EditProfileForm from '../../../../components/ProfileEdit';

type Profile = {
  id: string;
  name: string;
  language: string;
  passport_issuer: string;
};

async function getProfile(id: string): Promise<Profile | null> {
  const session = await auth.getSession();
  const result = await e.select(e.Profile, (profile) => ({
    filter: e.op(
      e.op(profile.id, '=', e.uuid(id)),
      'and',
      e.op(profile.created_by, '=', e.global.current_user)
    ),
    id: true,
    name: true,
    language: true,
    passport_issuer: true,
  })).run(session.client);

  return result[0] ?? null;
}

export default async function EditProfilePage({ params }: { params: { id: string } }) {
  const profile = await getProfile(params.id);

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return <EditProfileForm profile={profile} />;
}
