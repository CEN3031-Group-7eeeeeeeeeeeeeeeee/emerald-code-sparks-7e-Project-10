export const roleIDs = {
  ClassroomManager: 1,
  ContentCreator: 8,
  Public: 2,
  Researcher: 9,
  Student: 3,
};

export const getRoleType = (roleName) => {
  switch (roleName.toLowerCase()) {
    case "classroom manager":
    case "classroommanager":
    case "teacher":
    case "mentor":
      return "authenticated";

    case "content creator":
    case "contentcreator":
      return "content_creator";

    case "public":
      return "public";

    case "student":
      return "student";

    default:
      return "public";
  }
};
