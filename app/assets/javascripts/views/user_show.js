NoPhenotype.Views.UserShow = Backbone.View.extend({
  template: JST["user_show"],
  className: "profile-page",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click a": "removeMakeGreen"
  },

  removeMakeGreen: function() {
    $("a").removeClass("make-green");
  },

  render: function (model, response, jqXhr) {
    var content = this.template({user: this.model});
    this.$el.html(content);
    var that = this;
    var user = this.model;

    user.questions().each(function(question) {
      that.$("ul.user-q").append("<li><a href='#/questions/"+ question.id +"'>" + question.get('title') + "</a></li>");
    });
    user.answers().each(function(answer) {
      that.$("ul.user-a").append("<li><a href='#/questions/"+ answer.get('question_id') +"'>"+ answer.get('questionForAnswer') + "</a></li>");
    });

    if (user.questions().length === 0 && response) {
      that.$("ul.user-q").append("<em style='color:#909094'>none asked</em>");
    }
    if (user.answers().length === 0  && response) {
      that.$("ul.user-a").append("<em style='color:#909094'>none answered</em>");
    }

    return this;
  }
});
