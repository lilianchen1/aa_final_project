NoPhenotype.Views.AboutView = Backbone.View.extend({
  template: JST["about_view"],
  className: "about",

  events: {
    "click button.close-about": "closeAboutView"
  },

  show: function() {
    var content = this.template();
    this.$el.html(content);
    // $("#content").css("background", "gray");
    //append a div with opacity ~0.5 and z index greater than body but less than modal?]
    $("body").prepend("<div class='modal-hide-content'></div>")
    return this;
  },

  closeAboutView: function() {
    // $("#content").css("background", "");
    //remove that div?
    $("div.modal-hide-content").remove();
    this.remove();
  }
});
