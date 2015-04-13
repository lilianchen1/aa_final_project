NoPhenotype.Views.CommentShow = Backbone.View.extend({
  template: JST["comment_show"],
  tagName: "li",
  className: "comment-content",

  // initialize: function() {
  //   this.listenTo(this.model, "sync add", this.render);
  // },

  render: function() {
    var content = this.template({comment: this.model});
    this.$el.html(content);
    return this;
  }
});
