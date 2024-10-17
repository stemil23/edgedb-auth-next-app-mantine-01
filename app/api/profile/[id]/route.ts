import { NextResponse } from 'next/server';
import { auth } from '@/edgedb';
import e from '@/dbschema/edgeql-js';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth.getSession();
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const language = formData.get('language') as string;
  const passport_issuer = formData.get('passport_issuer') as string;

  try {
    await e.update(e.Profile, (profile) => ({
      filter: e.op(
        e.op(profile.id, '=', e.uuid(params.id)),
        'and',
        e.op(profile.created_by, '=', e.global.current_user)
      ),
      set: {
        name,
        language,
        passport_issuer,
      },
    })).run(session.client);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
  }
}
