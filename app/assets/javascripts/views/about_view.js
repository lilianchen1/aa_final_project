NoPhenotype.Views.AboutView = Backbone.View.extend({
  template: JST["about_view"],
  className: "about",

  events: {
    "click button.close-about": "closeAboutView"
  },

  show: function() {
    var content = this.template();
    this.$el.html(content);
    // $("#content").addClass("fade");
    $("#content").css("background", "gray");
    return this;
  },

  closeAboutView: function() {
    // $("#content").removeClass("fade");
    $("#content").css("background", "");
    this.remove();
  }
});
