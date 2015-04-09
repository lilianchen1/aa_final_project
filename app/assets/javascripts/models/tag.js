NoPhenotype.Models.Tag = Backbone.Model.extend({
  urlRoot: "/api/tags",

  questions: function() {
    if (this._questions) {
      return this._questions;
    }
    this._questions = new NoPhenotype.Collections.Questions([], {tag: this});
    return this._questions;
  },

  parse: function(response) {
    if (response.questions) {
      this.questions().set(response.questions, {parse: true});
      delete response.questions;
    }
    return response;
  }
});
