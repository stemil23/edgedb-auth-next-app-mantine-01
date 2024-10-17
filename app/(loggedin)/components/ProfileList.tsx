import { List } from '@mantine/core';
import { Profile } from '@/dbschema/interfaces';

export const dynamic = 'force-dynamic';

export default function Profiles({ profiles }: { profiles: Profile[] }) {
  return (
    <List>
      {profiles.map((profile) => (
        <List.Item key={profile.id}>
          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {profile.name}
              </p>
              <p className="flex-none text-xs text-gray-600">
                <time dateTime={profile.updated?.toLocaleDateString()}>
                  {profile.updated?.toLocaleDateString()}
                </time>
              </p>
            </div>
            <div>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                Author: {profile.created_by.email}
              </p>
            </div>
          </div>
        </List.Item>
      ))}
    </List>
  );
}
