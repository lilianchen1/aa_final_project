NoPhenotype.Views.HeaderView = Backbone.View.extend({
  template: JST["header_view"],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
