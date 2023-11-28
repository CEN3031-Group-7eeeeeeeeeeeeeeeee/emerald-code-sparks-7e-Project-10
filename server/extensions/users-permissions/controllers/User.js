"use strict";

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

// module.exports = (plugin) => {
//   plugin.controllers.user.updateMeTest = async (ctx) => {
//     if (!ctx.state.user || !ctx.state.user.id) {
//       return (ctx.response.status = 401);
//     }
//     await strapi
//       .query("plugin::users-permissions.user")
//       .update({
//         where: { id: ctx.state.user.id },
//         data: ctx.request.body,
//       })
//       .then((res) => {
//         ctx.response.status = 200;
//       });
//   };

//   plugin.routes["content-api"].routes.unshift({
//     method: "PUT",
//     path: "/users/me",
//     handler: "User.fakefakefakse",
//     config: {
//       prefix: "",
//       policies: [],
//     },
//   });

//   return plugin;
// };

module.exports = {
  async updateMe(ctx) {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }

    return await strapi
      .query("user", "users-permissions")
      .update({ id: ctx.state.user.id }, { ...ctx.request.body });
  },
};
