NoPhenotype.Views.HeaderView = Backbone.View.extend({
  template: JST["header_view"],
  id: "backbone-header",

  events: {
    "click button.about": "renderAbout"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderAbout: function() {
    var aboutView = new NoPhenotype.Views.AboutView();
    $("#content").prepend(aboutView.show().$el);

  }
});
