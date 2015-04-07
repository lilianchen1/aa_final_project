NoPhenotype.Views.QuestionsIndex = Backbone.View.extend({

  // template: JST[""]

  initialize: function() {
    this.listenTo(this.collection, "sync add", this.render);
  },

  events: {

  }
});
