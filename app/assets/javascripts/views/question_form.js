NoPhenotype.Views.QuestionForm = Backbone.View.extend({
  template: JST["question_form"],
  tagName: "form",
  className: "new-question",

  events: {
    "click button.ask-question": "submit"
  },

  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.model.save(attrs, {
      success: function() {
        this.collection.add(this.model);
        Backbone.history.navigate("questions/" + this.model.id, {trigger: true});
      }.bind(this)
    });
  }
});
