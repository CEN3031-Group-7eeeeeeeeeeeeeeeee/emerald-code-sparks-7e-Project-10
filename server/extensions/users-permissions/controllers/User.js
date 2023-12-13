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
    if (newUser.password) {
      newUser.password = await strapi.plugins["users-permissions"].services.user.hashPassword(newUser);
    }
    else {
      //remove password field from user if it is not being updates
      delete newUser.password;
    }

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

  async merge(ctx) {
    if (!ctx.state.user || !ctx.state.user.id) {
      strapi.log.debug("NOT LOGGED IN OR NO USER WAS FOUND")
      return (ctx.response.status = 401);
    }

    const currUser = await strapi
        .query("user", "users-permissions")
        .findOne({ id: ctx.state.user.id });

    if (!currUser || currUser.role.type !== "student"){
      return (ctx.response.status = 401);
    }

    const studentIDs = ctx.request.body.students;
    if (!currUser.students){
      currUser.students = [];
    }

    currUser.students = currUser.students.concat(studentIDs);

    //remove duplicates
    currUser.students = [...new Set(currUser.students)];

    
    return await strapi
      .query("user", "users-permissions")
      .update({ id: ctx.state.user.id }, currUser);
  }
};
