NoPhenotype.Views.VoteForm = Backbone.View.extend({
  template: JST["vote_form"],
  tagName: "form",
  className: "vote",

  initialize: function (options) {
    this.votableModel = options.votableModel;
  },

  events: {
    "click button":"submit"
  },

  render: function() {
    var content = this.template({
      vote: this.model
    });
    this.$el.html(content);
    var voteShow = new NoPhenotype.Views.VoteShow({model: this.model});
    voteShow.render().$el.insertBefore("button.downvote");
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    if (event.currentTarget.className === "upvote") {
      this.model.set("value", 1);
    } else {
      this.model.set("value", -1);
    }
    this.model.save({}, {
      success: function() {
        this.collection.add(this.model);
        var vc = this.votableModel.get('vote_count') + this.model.get('value');
        this.votableModel.set('vote_count', vc);
      }.bind(this)
    });
  }
});
