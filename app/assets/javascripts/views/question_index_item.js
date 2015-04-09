NoPhenotype.Views.QuestionIndexItem = Backbone.View.extend({
  template: JST["question_index_item"],
  tagName: "li",
  attributes: function() {
    return {
      class : "question-index-item",
      id : this.model.id
    };
  },

  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    this.model.tags().each(function(tag) {
      var tagLink = "<a href='#/tags/" + tag.id + "' class='tags'>" + tag.get('name') + "</a>  ";
      this.$("div.tags").append(tagLink);
    }.bind(this));
    return this;
  }
});
