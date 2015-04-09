NoPhenotype.Views.QuestionShow = Backbone.View.extend({
  template: JST["question_show"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click button": "reRender"
  },


  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);

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
