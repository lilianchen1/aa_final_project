NoPhenotype.Views.UserShow = Backbone.View.extend({
  template: JST["user_show"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
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
    return this;
  }
});
