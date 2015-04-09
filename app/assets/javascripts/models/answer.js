NoPhenotype.Models.Answer = Backbone.Model.extend({
  urlRoot: "/api/answers",

  // comments: function() {
  //
  // },
  //
  // parse: function(response) {
  //
  // }

  votes: function() {
    if (this._votes) {
      return this._votes;
    }

    this._votes = new NoPhenotype.Collections.Votes([], {
      question: this
    });
    return this._votes;
  },

  parse: function(response) {
    if (response.votes) {
      this.votes().set(response.votes, {parse: true});
      delete response.votes;
    }
    return response;
  }

});
