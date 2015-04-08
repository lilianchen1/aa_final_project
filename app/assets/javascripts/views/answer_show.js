NoPhenotype.Views.AnswerShow = Backbone.View.extend({
  template: JST["answer_show"],
  tagName: "li",
  className: "answer",

  // initialize: function() {
  //   this.listenTo(this.model, "sync add remove", this.render);
  // },

  render: function() {
    var content = this.template({answer: this.model});
    this.$el.html(content);
    return this;
  }
});
