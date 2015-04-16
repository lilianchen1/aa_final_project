NoPhenotype.Collections.Answers = Backbone.Collection.extend({
  url: "/api/answers",

  model: NoPhenotype.Models.Answer,

  comparator: function(answer) {
    return [-answer.get('accepted'), Date.parse(answer.get('created_at'))];
  }
});
