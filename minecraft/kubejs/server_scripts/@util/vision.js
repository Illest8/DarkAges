
global.getMaxSightDistance = function(entity) {
  if (!entity) return 0;

  if (entity.type === 'darkages:guard') return 20;
  if (entity.type === 'mca:female_villager' || entity.type === 'mca:male_villager') return 12;
  
  return 10;
};

global.canSeePlayer = function(observer, target) {
  if (!observer || !target) return false;

  const maxDistance = global.getMaxSightDistance(observer);
  if (maxDistance <= 0) return false;

  const dx = target.x - observer.x;
  const dy = target.eyeY - observer.eyeY;
  const dz = target.z - observer.z;
  const distanceSquared = dx * dx + dy * dy + dz * dz;

  if (distanceSquared > maxDistance * maxDistance) return false;
  if (!observer.hasLineOfSight(target)) return false;

  const lookVec = observer.getLookAngle();
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (length === 0) return false;

  const toPlayer = {
    x: dx / length,
    y: dy / length,
    z: dz / length
  };

  const dot = lookVec.x() * toPlayer.x + lookVec.y() * toPlayer.y + lookVec.z() * toPlayer.z;

  return dot > 0.1;
};
