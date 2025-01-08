"use client";

import { useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      toast.error('Please fill in all fields');
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if(response.status === 401) {
      toast.error("Invalid email or password");
    } else if (response.status === 200) {
      toast.success("Login successful");

      if (data.role === 'MANAGER') {
        router.push('/dashboard/manager');
      } else if (data.role === 'PANTRY_STAFF') {
        router.push('/dashboard/pantry-staff');
      } else if (data.role === 'DELIVERY_PERSONNEL') {
        router.push('/dashboard/delivery-personnel');
      }
    } else {
      toast.error("Failed to connect to the server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
