import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export function addPrefix(id: number | string, type: 'column' | 'task') {
  return `${type}_${id}`;
}

export function stripPrefix(sortableId: string) {
  return Number(sortableId.split('_')[1]);
}

export function arrayMove(array: any[], from: number, to: number) {
  const newArray = [...array];
  const item = newArray.splice(from, 1)[0];
  newArray.splice(to, 0, item);
  return newArray;
}

export function convertToGithubRepoName(name: string) {
  // Convert to lowercase
  let repoName = name.toLowerCase();

  // Replace spaces with hyphens
  repoName = repoName.replace(/\s+/g, '-');

  // Remove special characters except hyphens
  repoName = repoName.replace(/[^a-z0-9-]/g, '');

  // Remove leading and trailing hyphens
  repoName = repoName.replace(/^-+|-+$/g, '');

  // GitHub repository names must be between 1 and 100 characters long
  repoName = repoName.substring(0, 100);

  return repoName;
}
