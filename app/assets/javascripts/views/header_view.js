NoPhenotype.Views.HeaderView = Backbone.View.extend({
  template: JST["header_view"],
  id: "backbone-header",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
