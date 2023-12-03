//
// Check if the current user is a student
//
module.exports = async (ctx, next) => {
  const userIsStudent =
    ctx.state.user.isStudent ||
    (ctx.state.user.role && ctx.state.user.role.type === "student");
  strapi.log.debug("userIsStudent: ", userIsStudent);
  if (ctx.state.user && userIsStudent) {
    // Go to next policy or controller
    return await next();
  }

  ctx.unauthorized(`You're not allowed to perform this action!`);
};
