NoPhenotype.Views.VoteForm = Backbone.View.extend({
  template: JST["vote_form"],
  tagName: "form",
  className: "vote",

  initialize: function (options) {
    this.votableModel = options.votableModel;
    this.listenTo(this.model, "sync change:value add remove", this.render);
  },

  events: {
    "click button":"submit"
  },

  render: function() {
    var content = this.template({
      vote: this.model,
      votableModel: this.votableModel,
    });
    this.$el.html(content);
  
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    if (event.currentTarget.className === "upvote") {
      this.model.set("value", 1);
      this.handleVote(this.model, this.votableModel);

    } else {
      this.model.set("value", -1);
      this.handleVote(this.model, this.votableModel);
    }
  },

  handleVote: function(vote, votableType) {
    vote.set("votable_id", votableType.id);
    vote.set("votable_type", votableType.attributes.title ? "Question" : "Answer");
    vote.set("user_id", parseInt(window.currentUser.current_user_id));
    var deleteVotes = [];

    votableType.votes().each(function(v) {
      if (v.get('votable_id') === vote.get('votable_id') &&
          v.get('votable_type') === vote.get('votable_type') &&
          v.get('user_id') === vote.get('user_id')) {
        deleteVotes.push(v);
      }
    });

    if (deleteVotes.length >= 1) {
      // debugger
      // if (deleteVotes[0].get('value') !== vote.get('value')) {
      //   vote.save({}, {
      //     success: function() {
      //       this.collection.add(vote);
      //     }.bind(this),
      //   });
      // }

      for (var i = 0; i < deleteVotes.length; i++) {
        deleteVotes[i].destroy();
      }
      var vc = votableType.votes().length;
      votableType.set('vote_count', vc);
      return;
    }

    else {
      vote.save({}, {
        success: function() {
          this.collection.add(vote);
          var vc = votableType.get('vote_count') + vote.get('value');
          votableType.set('vote_count', vc);
        }.bind(this),

      });
    }
  },

});
