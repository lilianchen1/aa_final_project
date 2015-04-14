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

  listenForScroll: function() {
    $(window).off("scroll"); // remove previous listeners
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
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
