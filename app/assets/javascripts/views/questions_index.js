NoPhenotype.Views.QuestionsIndex = Backbone.View.extend({

  template: JST["questions_index"],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
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
