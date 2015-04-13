NoPhenotype.Views.CommentForm = Backbone.View.extend({
  template: JST["comment_form"],
  tagName: "form",
  className: "new-comment",

  initialize: function(options) {
    this.commentableModel = options.commentableModel;
    // this.user_id = options.user_id;
    // this.commentable_id = options.commentable_id;
    // this.commentable_type = options.commentable_type;
  },

  events: {
    "click button": "submit"
  },

  render: function() {
    var content = this.template({comment: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.model.save(attrs, {
      success: function() {
        this.collection.add(this.model);
        // this.model = new NoPhenotype.Models.Comment();
      }.bind(this)
    });
    // this.$("textarea").val("");
    this.remove();
  }
});
