NoPhenotype.Views.QuestionIndexItem = Backbone.View.extend({
  template: JST["question_index_item"],
  tagName: "li",
  attributes: function() {
    return {
      class : "question-index-item",
      id : this.model.id
    };
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);
    return this;
  }
})
