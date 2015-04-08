NoPhenotype.Collections.Answers = Backbone.Collection.extend({
  url: "/api/answers",

  model: NoPhenotype.Models.Answer,

  comparator: function(firstAnswer, secondAnswer) {
    if (firstAnswer.get("created_at") < secondAnswer.get("created_at")) {
      return -1;
    } else {
      return 1;
    }
  }
});
