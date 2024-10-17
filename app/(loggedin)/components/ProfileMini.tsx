import Link from 'next/link';
import { Button, Title } from '@mantine/core';
import { auth } from '@/edgedb';
import e from '@/dbschema/edgeql-js';

export const dynamic = 'force-dynamic';

export default async function UserProfileMini() {
  const { client } = auth.getSession();

  const profiles = await e.select(e.Profile, (profile) => ({
    filter: e.op(profile.created_by, '=', e.global.current_user),
    id: true,
    name: true,
    language: true,
    passport_issuer: true,
    created: true,
    updated: true,
    created_by: {
      name: true,
      email: true,
    },
  })).run(client);

  return (
    <>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">

        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div key={profile.id} className="border-t border-gray-200">
                      <Title order={1}>Mini Profile</Title>
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.name}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Language</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.language}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Passport issuer</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.passport_issuer}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Last updated</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.updated?.toLocaleString()}</dd>
                </div>
              </dl>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <Link href={`/user/profile/edit/${profile.id}`}>
                  <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2">
                    Edit Profile
                  </Button>
                </Link>

              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-5 sm:px-6">
            <p className="text-sm text-gray-500">No profile information available.</p>
            <Link href="/user/profile/create">
              <Button>
                Create Profile
              </Button>
            </Link>
          </div>
        )}
      </div>

    </>
  );
}
