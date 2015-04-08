NoPhenotype.Views.TagShow = Backbone.View.extend({
  template: JST["tag_show"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({tag: this.model});
    this.$el.html(content);
    this.model.questions().each(function(question) {
      var questionItem = new NoPhenotype.Views.QuestionIndexItem({model: question});
      this.$("ul.tagged-questions").append(questionItem.render().$el);
    }.bind(this));
    
    return this;
  }
});
