NoPhenotype.Models.Question = Backbone.Model.extend({
  urlRoot: "/api/questions",

  answers: function() {
    if (this._answers) {
      return this._answers;
    }
    this._answers = new NoPhenotype.Collections.Answers([], {question: this});
    return this._answers;
  },

  parse: function(response) {
    if (response.answers) {
      this.answers().set(response.answers, {parse: true});
      delete response.answers;
    }
    return response;
  }
});
