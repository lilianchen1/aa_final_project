NoPhenotype.Views.CommentForm = Backbone.View.extend({
  template: JST["comment_form"],
  tagName: "form",
  className: "new-comment",

  initialize: function(options) {
    this.commentableModel = options.commentableModel;
  },

  events: {
    "click button": "submit",
  },

  render: function() {
    var content = this.template({comment: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    if (attrs.content === "") {
      this.remove();
      return;
    }
    this.model.save(attrs, {
      success: function() {
        this.collection.add(this.model);
      }.bind(this)
    });
    this.remove();
  }
});
