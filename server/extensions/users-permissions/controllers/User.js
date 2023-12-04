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

    const newUser = { ...ctx.request.body };

    newUser.password = await strapi.plugins[
      "users-permissions"
    ].services.user.hashPassword(newUser); 

    return await strapi
      .query("user", "users-permissions")
      .update({ id: ctx.state.user.id }, newUser);
  },

  async deleteMe(ctx) {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }

    const data = await strapi.plugins["users-permissions"].services.user.remove(
      {
        id: ctx.state.user.id,
      }
    );

    ctx.send(data);
    return data;
  },
};
