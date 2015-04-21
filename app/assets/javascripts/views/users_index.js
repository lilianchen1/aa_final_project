NoPhenotype.Views.UsersIndex = Backbone.View.extend({
  template: JST["users_index"],

  events: {
    "click button.delete-u": "deleteUser",
    "click a":"removeMakeGreenClass",
    "keyup .search": "handleMatchedUsers"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync remove", this.render);
  },

  render: function() {
    var content = this.template({users: this.collection});
    this.$el.html(content);
    this.listenForScroll();
    return this;
  },

  deleteUser: function(event) {
    event.preventDefault();
    var userId = $(event.target).data("id");
    var user = this.collection.get(userId);
    user.destroy();
  },

  handleMatchedUsers: function(event) {
    event.preventDefault();
    this.inputData = { "query": this.$(".search").val() };
    this.searchList = new NoPhenotype.Collections.Users();
    this.listenTo(this.searchList, "sync", this.renderMatchedUser);
    this.searchList.fetch({
      data: this.inputData,
      success: function(response) {
        this.renderMatchedUser();
      }.bind(this)
    });
  },

  renderMatchedUser: function() {
    this.$("ul.users-list").empty();
    for (var i = 0; i < this.searchList.length; i++) {
      var user = this.searchList.at(i);
      var user_url = "#/users/" + user.id;
      $("ul.users-list").append("<li><a href='"+ user_url + "'><img src='"+ user.get('img_url') + "'/></a><a class='username' href='"+ user_url +"'>"+ user.get('username') +"</a></li>");
    }
  },

  listenForScroll: function() {
    $(window).off("mousewheel DOMMouseScroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on('mousewheel DOMMouseScroll', throttledCallback);
  },

  nextPage: function () {
    if (!this.searchList) {
      var view = this;
      if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        if (view.collection.page < view.collection.total_pages) {
          view.collection.fetch({
            data: {page: view.collection.page + 1},
            remove: false
          });
        }
      }
    }
    if (this.searchList) {
      if ((this.searchList.page === this.searchList.total_pages) && this.$(".search").val() !== "") {
        return;
      }
      var view1 = this;
      if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
        if (view1.searchList.page < view1.searchList.total_pages) {
          this.inputData.page = view1.searchList.page + 1;
          view1.searchList.fetch({
            data: this.inputData,
            remove: false
          });
        }
      }
    }
  },

  removeMakeGreenClass: function() {
    $("a").removeClass("make-green");
  }

});
