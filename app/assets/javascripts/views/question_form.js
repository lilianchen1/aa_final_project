NoPhenotype.Views.QuestionForm = Backbone.View.extend({
  template: JST["question_form"],
  tagName: "form",
  className: "new-question",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click button.ask-question": "submit"
  },

  render: function() {
    var content = this.template({
      question: this.model,
      tag_list: this.model.get('tag_list')
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
    $("a").removeClass("make-green");
  }
});
