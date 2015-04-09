NoPhenotype.Views.TagsIndex = Backbone.View.extend({
  template: JST["tags_index"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    "keyup input.tag-search": "renderMatchedTag"
  },

  render: function() {
    var content = this.template({tags: this.collection});
    this.$el.html(content);
    return this;
  },

  renderMatchedTag: function(event) {
    event.preventDefault();
    var attrs = this.$(":input").serializeJSON();
    // implement search...
  }
});
