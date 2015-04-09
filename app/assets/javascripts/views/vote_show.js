NoPhenotype.Views.VoteShow = Backbone.View.extend({
  template: JST["vote_show"],

  render: function() {
    var content = this.template({ vote: this.model });
    this.$el.html(content);
    return this;
  }
});
