NoPhenotype.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  questions: function() {
    if (this._questions) {
      return this._questions;
    }
    this._questions = new NoPhenotype.Collections.Questions([], {tag: this});
    return this._questions;
  },

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

    if (response.questions) {
      this.questions().set(response.questions, {parse: true});
      delete response.questions;
    }
    return response;
  }

});
