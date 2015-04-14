NoPhenotype.Views.QuestionsIndex = Backbone.View.extend({

  template: JST["questions_index"],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.searchList = new NoPhenotype.Collections.Questions();
  },

  events: {
    "click button": "handleMatchedQ"
  },

  handleMatchedQ: function(event) {
    event.preventDefault();
    var inputData = {"query": this.$(".search").val()};
    this.searchList.fetch({
      data: inputData,
      success: function(response) {
        this.renderMatchedQ();
      }.bind(this)
    });
    this.$(".search").val("");
  },

  renderMatchedQ: function() {
    this.$("ul.questions-index").empty();
    for (var i = 0; i < this.searchList.length; i++) {
      //make question index item view and append to li?
      var questionIndexView = new NoPhenotype.Views.QuestionIndexItem({model: this.searchList.at(i)});
      this.$("ul.questions-index").append(questionIndexView.render().$el);

    }
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(question) {
      var indexItemView = new NoPhenotype.Views.QuestionIndexItem({
        model: question
      });
      this.$("ul.questions-index").append(indexItemView.render().$el);
    });

    return this;
  }

});
