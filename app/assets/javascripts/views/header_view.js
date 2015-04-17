NoPhenotype.Views.HeaderView = Backbone.View.extend({
  template: JST["header_view"],
  id: "backbone-header",

  events: {
    "click button.about": "renderAbout",
    "click a": "swapLinkColor",
    "click a.all-questions-link": "renderAllQ"
  },

  renderAllQ: function() {
    var indexView = new NoPhenotype.Views.QuestionsIndex({
      collection: this.collection
    });
    indexView.render();
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
    if (this._currentLink) {
      this._currentLink.removeClass("make-green");
    }
    this._currentLink = $(event.currentTarget);
    this._currentLink.addClass("make-green");
  }
});
