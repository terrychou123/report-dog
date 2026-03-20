export type TagWithPermissions = {
  userId: string;
  viewers: string[] | null;
  editors: string[] | null;
};

export function canViewTag(userId: string, tag: TagWithPermissions): boolean {
  return (
    userId === tag.userId ||
    (tag.viewers ?? []).includes(userId) ||
    (tag.editors ?? []).includes(userId)
  );
}

export function canEditTag(userId: string, tag: TagWithPermissions): boolean {
  return userId === tag.userId || (tag.editors ?? []).includes(userId);
}

export function isTagOwner(userId: string, tag: TagWithPermissions): boolean {
  return userId === tag.userId;
}
