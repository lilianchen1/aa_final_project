NoPhenotype.Views.TagsIndex = Backbone.View.extend({
  template: JST["tags_index"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    var content = this.template({tags: this.collection});
    this.$el.html(content);
    this.listenForScroll();
    return this;
  },

  events: {
    "keyup .search": "handleMatchedTag",
    "click a":"removeMakeGreen"
  },

  removeMakeGreen: function() {
    $("a").removeClass("make-green");
  },

  handleMatchedTag: function(event) {
    event.preventDefault();
    this.inputData = { "query": this.$(".search").val() };
    this.searchList = new NoPhenotype.Collections.Tags();
    this.searchList.fetch({
      data: this.inputData,
      success: function(response) {
        this.renderMatchedTag();
      }.bind(this)
    });
  },

  renderMatchedTag: function() {
    this.$("ul.tag-list").empty();
    for (var i = 0; i < this.searchList.length; i++) {
      var tag = this.searchList.at(i);
      $("ul.tag-list").append("<li><a class='tags' href='#/tags/" + tag.id + "'>"+ tag.get('name') + "</a> x " + tag.get('questions_count') + "</li>");
    }
  },

  listenForScroll: function() {
    $(window).off("mousewheel DOMMouseScroll"); 
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on('mousewheel DOMMouseScroll', throttledCallback);
  },

  nextPage: function () {
    if (this.$(".search").val() !== "") {
      return;
    }
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page < view.collection.total_pages) {
        view.collection.fetch({
          data: { page: view.collection.page + 1 },
          remove: false
        });
      }
    }
  }
});
