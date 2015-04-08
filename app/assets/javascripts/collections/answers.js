NoPhenotype.Collections.Answers = Backbone.Collection.extend({
  url: "/api/answers",

  model: NoPhenotype.Models.Answer,

  // comparator: "created_at"
});
