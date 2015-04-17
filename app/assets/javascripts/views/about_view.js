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
    //append a div with opacity ~0.5 and z index greater than body but less than modal?
    return this;
  },

  closeAboutView: function() {
    // $("#content").removeClass("fade");
    $("#content").css("background", "");
    //remove that div?
    this.remove();
  }
});
