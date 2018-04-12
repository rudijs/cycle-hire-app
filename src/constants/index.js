
const permissionLevels = ["*", "admin", "user"];

export const permission = name => permissionLevels.filter(name);