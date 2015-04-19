NoPhenotype.Views.QuestionsIndex = Backbone.View.extend({

  template: JST["questions_index"],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  events: {
    'submit form': 'handleMatchedQ',
    'click button.popularity-sort': function(event) {
      this.sortByPopularity(event);
    },
    'click button.newest': function(event) {
      this.renderByCreatedAt(event);
    },

    'click a': "removeMakeGreen"
  },

  removeMakeGreen: function() {
    $("a.all-questions-link").removeClass("make-green");
  },

  renderByCreatedAt: function(event) {
    event.preventDefault();
    this.$("ul.questions-index").empty();
    this.collection.order_by_date();
    this.collection.fetch({
      success: function(response) {
        this.render();
      }.bind(this)
    });
  },

  sortByPopularity: function(event) {
    event.preventDefault();
    this.$("ul.questions-index").empty();
    this.collection.order_by_popularity();
    this.sortingNow = true;
    this.collection.fetch({
      data: { sort: this.sortingNow },
      success: function(response) {
        this.renderByPopularity();
      }.bind(this)
    });
  },

  renderByPopularity: function() {
    for (var j = 0; j < this.collection.length; j++) {
        var questionIndexView = new NoPhenotype.Views.QuestionIndexItem({model: this.collection.at(j)});
        this.$("ul.questions-index").append(questionIndexView.render().$el);
    }
  },

  handleMatchedQ: function(event) {
    event.preventDefault();
    this.inputData = {};
    this.inputData = { "query": this.$(".search").val() };
    this.searchList = new NoPhenotype.Collections.Questions();
    this.listenTo(this.searchList, "sync", this.renderMatchedQ);
    this.searchList.fetch({
      data: this.inputData,
      success: function(response) {
        this.renderMatchedQ();
      }.bind(this)
    });
    this.$(".search").val("");
  },

  renderMatchedQ: function() {
    this.$("ul.questions-index").empty();
    if (this.searchList.length === 0) {
      this.$("ul.questions-index").html("no question's title or content match your input");
    }
    for (var i = 0; i < this.searchList.length; i++) {
      var questionIndexView = new NoPhenotype.Views.QuestionIndexItem({model: this.searchList.at(i)});
      this.$("ul.questions-index").append(questionIndexView.render().$el);

    }
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(question) {
      var indexItemView = new NoPhenotype.Views.QuestionIndexItem({
        model: question
      });
      this.$("ul.questions-index").append(indexItemView.render().$el);
    });
    this.listenForScroll();
    return this;
  },

  listenForScroll: function() {
    $(window).off("scroll"); // remove previous listeners
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    if (!this.searchList) {
      var view = this;
      if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        if (view.collection.page < view.collection.total_pages) {
          this.inputData = this.inputData || {};
          this.inputData.sort = this.sortingNow;
          this.inputData.page = view.collection.page + 1;
          view.collection.fetch({
            data: this.inputData,
            remove: false
          });
        }
      }
    }
    if (this.searchList) {
      if (this.searchList.page === this.searchList.total_pages) {
        return;
      }
      var view1 = this;
      if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        if (view1.searchList.page < view1.searchList.total_pages) {
          this.inputData = this.inputData || {};
          this.inputData.sort = this.sortingNow;
          this.inputData.page = view1.searchList.page + 1;
          view1.searchList.fetch({
            data: this.inputData,
            remove: false
          });
        }
      }
    }
  }

});
