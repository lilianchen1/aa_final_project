NoPhenotype.Views.QuestionShow = Backbone.View.extend({
  template: JST["question_show"],

  initialize: function() {
    this.listenTo(this.model, "sync change:vote_count", this.render);
    this.listenTo(this.model.answers(), "sync add", this.render);
  },

  events: {
    "click button": "reRender"
  },


  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);

    var voteForm = new NoPhenotype.Views.VoteForm({
      model: new NoPhenotype.Models.Vote({
        question_id: this.model.id,
      }),
      collection: this.model.votes(),
      votableModel: this.model
    });
    this.$("div.voting").append(voteForm.render().$el);

    this.model.tags().each(function(tag) {
      var tagLink = "<a href='#/tags/" + tag.id + "' class='tags'>" + tag.get('name') + "</a>  ";
      this.$("div.tags").append(tagLink);
    }.bind(this));
    this.model.answers().each(function(answer) {
      var answerShow = new NoPhenotype.Views.AnswerShow({model: answer});
      this.$("ul.answers").append(answerShow.render().$el);
    }.bind(this));

    var answerForm = new NoPhenotype.Views.AnswerForm({
      model: new NoPhenotype.Models.Answer({
        question_id: this.model.id
      }),
      collection: this.model.answers()
    });

    this.$("div.new-answer").append(answerForm.render().$el);
    return this;
  }
});
