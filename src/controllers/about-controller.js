export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About RunRiot",
      };
      return h.view("about-view", viewData);
    },
  },
};
