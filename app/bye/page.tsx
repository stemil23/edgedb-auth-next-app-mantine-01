import { auth } from '@/edgedb';
import Link from "next/link";
import { Title } from '@mantine/core';


export default function HomePage() {
  return (
    <>

<Title order={1}>Bye for now. Come back soon!!!</Title>
                    <Link
                href={auth.getBuiltinUIUrl()}
                prefetch={false}
                className="text-sm font-semibold leading-6 text-gray-800"
              >
                <button className="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md">
                  Sign in
                </button>
              </Link>
              <Link
                href={auth.getBuiltinUISignUpUrl()}
                prefetch={false}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <button className="bg-primary px-4 py-2 rounded-md text-white">
                  Sign up
                </button>
              </Link> 
    </>
  );
}
