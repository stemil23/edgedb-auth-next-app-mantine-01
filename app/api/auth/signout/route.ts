"use server";

import { auth } from '@/edgedb';
import { NextResponse } from 'next/server';


const authActions = auth.createServerActions();
export const { signout } = authActions;

export async function POST() {
  await signout();
  return NextResponse.json({ success: true });
}
