import { ColumnColor } from '@prisma/client';

export const columnBadgeClassNames = {
  [ColumnColor.BLUE]: 'border-blue-800 text-blue-800',
  [ColumnColor.GRAY]: 'border-gray-800 text-gray-800',
  [ColumnColor.GREEN]: 'border-green-800 text-green-800',
  [ColumnColor.ORANGE]: 'border-orange-800 text-orange-800',
  [ColumnColor.PINK]: 'border-pink-800 text-pink-800',
  [ColumnColor.PURPLE]: 'border-purple-800 text-purple-800',
  [ColumnColor.RED]: 'border-red-800 text-red-800',
  [ColumnColor.YELLOW]: 'border-yellow-800 text-yellow-800',
};
