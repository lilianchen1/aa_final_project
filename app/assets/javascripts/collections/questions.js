NoPhenotype.Collections.Questions = Backbone.Collection.extend({
  url: "/api/questions",
  model: NoPhenotype.Models.Question,

  comparator: function(firstQuestion, secondQuestion) {
    if (firstQuestion.get("created_at") < secondQuestion.get("created_at")) {
      return 1;
    } else {
      return -1;
    }
  },

  getOrFetch: function(id) {
    if (this.get(id)) {
      this.get(id).fetch();
      return this.get(id);
    }

    var question = new NoPhenotype.Models.Question({id: id});
    question.fetch({
      success: function() {
        this.add(question);
      }.bind(this)
    });

    return question;
  }
});
