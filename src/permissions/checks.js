const config = require('../config/defaults');

function hasRole(member, roleId) {
  if (!member || !member.roles) return false;
  return member.roles.cache.has(roleId);
}

function hasAnyRole(member, roleIds = []) {
  return roleIds.some((roleId) => hasRole(member, roleId));
}

function isAuthorized(member, requiredRoles = []) {
  if (!member) return false;
  return hasAnyRole(member, requiredRoles);
}

function isSeniorTo(memberA, memberB) {
  if (!memberA || !memberB) return false;

  const order = {
    director: 1,
    deputyDirector: 2,
    assistantDirector: 3,
    chiefOfStaff: 4,
  };

  const aRank = memberA.roles?.cache?.find((role) => Object.values(config.roles).flat().includes(role.id));
  const bRank = memberB.roles?.cache?.find((role) => Object.values(config.roles).flat().includes(role.id));

  if (!aRank || !bRank) return false;

  const rankOrderA = order[Object.keys(config.roles).find((key) => config.roles[key] === aRank.id)] || 99;
  const rankOrderB = order[Object.keys(config.roles).find((key) => config.roles[key] === bRank.id)] || 99;

  return rankOrderA < rankOrderB;
}

module.exports = {
  hasRole,
  hasAnyRole,
  isAuthorized,
  isSeniorTo,
};
