NoPhenotype.Views.AboutView = Backbone.View.extend({
  template: JST["about_view"],
  className: "about",

  events: {
    "click button.close-about": "closeAboutView"
  },

  show: function() {
    var content = this.template();
    this.$el.html(content);
    $("body").prepend("<div class='modal-hide-content'></div>")
    return this;
  },

  closeAboutView: function() {
    $("div.modal-hide-content").remove();
    this.remove();
  }
});
