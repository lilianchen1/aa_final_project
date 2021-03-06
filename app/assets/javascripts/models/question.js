NoPhenotype.Models.Question = Backbone.Model.extend({
  urlRoot: "/api/questions",

  tags: function() {
    if (this._tags) {
      return this._tags;
    }
    this._tags = new NoPhenotype.Collections.Tags([], {question: this.model});
    return this._tags;
  },

  answers: function() {
    if (this._answers) {
      return this._answers;
    }
    this._answers = new NoPhenotype.Collections.Answers([], {question: this});
    return this._answers;
  },

  votes: function() {
    if (this._votes) {
      return this._votes;
    }

    this._votes = new NoPhenotype.Collections.Votes({
      question: this
    });
    return this._votes;
  },

  comments: function() {
    if (this._comments) {
      return this._comments;
    }
    this._comments = new NoPhenotype.Collections.Comments({
      question: this
    });
    return this._comments;
  },

  parse: function(response) {
    if (response.answers) {
      this.answers().set(response.answers, {parse: true});
      delete response.answers;
    }

    if (response.tags.length > 0) {
      this.tags().set(response.tags, {parse: true});
      delete response.tags;
    }

    if (response.votes) {
      this.votes().set(response.votes);
      delete response.votes;
    }

    if (response.comments) {
      this.comments().set(response.comments, {parse: true});
      delete response.comments;
    }
    return response;
  }
});
