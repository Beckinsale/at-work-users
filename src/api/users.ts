import type { User } from '../types/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Ошибка получения пользователей');
  const data: User[] = await res.json();
  return data.slice(0, 6);
}

export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error('Ошибка получения пользователя');
  return res.json();
}
