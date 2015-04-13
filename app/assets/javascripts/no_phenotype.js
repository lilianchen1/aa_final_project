window.NoPhenotype = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var questions = new NoPhenotype.Collections.Questions();
    new NoPhenotype.Routers.Router({
      $rootEl: $rootEl,
      questions: questions
    });

    Backbone.history.start();
  }
};
