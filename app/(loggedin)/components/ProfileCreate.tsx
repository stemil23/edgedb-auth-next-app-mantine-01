'use client';

import { useFormStatus } from 'react-dom';
import { Button, Input } from '@mantine/core';

export default function ProfileFormClient({
  createProfile,
}: {
  createProfile: (formData: FormData) => Promise<{ success: boolean }>;
}) {
  const { pending } = useFormStatus();

  return (
    <form action={createProfile} className="max-w-md mx-auto mt-8 space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
          Language:
        </label>
        <Input
          type="text"
          id="language"
          name="language"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="passport_issuer" className="block text-sm font-medium text-gray-700">
          Passport Issuer:
        </label>
        <Input type="text" id="passport_issuer" name="passport_issuer" required />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? 'Creating...' : 'Create Profile'}
      </Button>
    </form>
  );
}
