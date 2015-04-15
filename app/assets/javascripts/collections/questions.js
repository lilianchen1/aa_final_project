NoPhenotype.Collections.Questions = Backbone.Collection.extend({
  url: "/api/questions",
  model: NoPhenotype.Models.Question,

  comparator: function(question) {
    return -Date.parse(question.get("created_at"));
  },

  order_by_popularity: function() {
    this.comparator = this._order_by_popularity;
    this.sort();
  },

  _order_by_popularity: function(question1, question2) {
    if (question1.get('vote_count') > question2.get('vote_count')) {
      return -1;
    }
    else if (question1.get('vote_count') === question2.get('vote_count') && question1.get('answercount') > question2.get('answercount')) {
      return -1;
    }
    else {
      return 1;
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
        this.add(question, {parse: true});
      }.bind(this)
    });

    return question;
  },

  parse: function(response) {
    this.page = response.page ? parseInt(response.page) : 1;
    this.total_pages = parseInt(response.total_pages);
    return response.models || response;
  }
});
