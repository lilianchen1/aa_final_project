NoPhenotype.Views.AnswerShow = Backbone.View.extend({
  template: JST["answer_show"],
  tagName: "li",
  className: "answer",

  initialize: function() {
    this.listenTo(this.model, "sync add change:vote_count", this.render);
    this.listenTo(this.model.votes(), "remove", this.render);
  },

  events: {
    "click button.delete-q": "deleteQuestion"
  },

  deleteQuestion: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var content = this.template({answer: this.model});
    this.$el.html(content);
    var voteForm = new NoPhenotype.Views.VoteForm({
      model: new NoPhenotype.Models.Vote({
        answer_id: this.model.id,
        user_id: window.currentUser.current_user_id
      }),
      collection: this.model.votes(),
      votableModel: this.model
    });
    this.$("div.voting").append(voteForm.render().$el);
    return this;
  }
});
