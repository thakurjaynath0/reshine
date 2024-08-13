const allRoles = {
  superuser: ['createUser', 'readUser', 'updateUser', 'deleteUser', 'change-password'],
  admin: ['createUser', 'readUser', 'updateUser', 'deleteUser', 'change-password'],
  employee: [],
  user: ['readUser', 'updateUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
