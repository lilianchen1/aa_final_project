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
    //
    // var tagForm = new NoPhenotype.Views.TagForm({
    //   question_id: this.model.id
    // });
    // (tagForm.render().$el).insertBefore(this.$("button.ask-question"));
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    debugger
    this.model.save(attrs, {
      success: function() {
        this.collection.add(this.model);
        Backbone.history.navigate("questions/" + this.model.id, {trigger: true});
      }.bind(this)
    });
  }
});
