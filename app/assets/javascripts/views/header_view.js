NoPhenotype.Views.HeaderView = Backbone.View.extend({
  template: JST["header_view"],
  id: "backbone-header",

  events: {
    "click button.about": "renderAbout",
    "click a": "swapLinkColor",
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderAbout: function() {
    var aboutView = new NoPhenotype.Views.AboutView();
    $("body").prepend(aboutView.show().$el);
  },

  swapLinkColor: function(event) {
    this.$("a.all-questions-link").removeClass("make-green");
    if (this._currentLink) {
      this._currentLink.removeClass("make-green");
    }
    this._currentLink = $(event.currentTarget);
    this._currentLink.addClass("make-green");
  }
});
