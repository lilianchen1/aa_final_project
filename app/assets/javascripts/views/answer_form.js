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
    this.model.save(attrs, {
      success: function() {
        this.collection.add(this.model);
        this.model = new NoPhenotype.Models.Answer({
          question_id: this.model.get('question_id')
        });
      }.bind(this)
    });
    this.$("textarea").val("");

  }
});
