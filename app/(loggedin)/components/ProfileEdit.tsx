'use client';

import { Button } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Profile = {
  id: string;
  name: string;
  language: string;
  passport_issuer: string;
};

async function updateProfile(id: string, formData: FormData) {
  const response = await fetch(`/api/profile/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
}

export default function EditProfileForm({ profile }: { profile: Profile }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateProfile(profile.id, formData);
      setError(null);
      // Redirect to the dashboard or profile page on success
      router.push('/user/profile'); // Adjust this path as needed
      router.refresh(); // Reset the cache
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <form action={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={profile.name}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language:</label>
        <input
          type="text"
          id="language"
          name="language"
          defaultValue={profile.language}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="passport_issuer" className="block text-sm font-medium text-gray-700">Passport Issuer:</label>
        <input
          type="text"
          id="passport_issuer"
          name="passport_issuer"
          defaultValue={profile.passport_issuer}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <Button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Profile
      </Button>
    </form>
  );
}
