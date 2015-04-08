NoPhenotype.Views.AnswerForm = Backbone.View.extend({
  template: JST["answer_form"],
  tagName: "form",

  events: {
    "click button.add-answer": "submit"
  },

  render: function() {
    var content = this.template({answer: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    attrs.question_id = this.model.get('question_id');
    var newAnswer = new NoPhenotype.Models.Answer(attrs);
    newAnswer.save(attrs, {
      success: function() {
        this.collection.add(newAnswer);
      }.bind(this)
    });
    var answerShow = new NoPhenotype.Views.AnswerShow({model: newAnswer});
    $("ul.answers").append(answerShow.render().$el);
    this.$("textarea").val("");

    // need to fix render so it shows username!!
    // need to sort by date so latest comes last!
  }
});
