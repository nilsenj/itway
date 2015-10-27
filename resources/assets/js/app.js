/*! ItwayIO app.js
 * ================
 * Main JS application file for ItwayIO This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive ItwayIO plugins.
 *
 * @Author  nilsenj
 * @Email   ni_cole@i.ua
 * @version 0.1
 */
'use strict';

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
    throw new Error("ItwayIO requires jQuery");
}

/* ItwayIO
 *
 * @type Object
 * @description $.ItwayIO is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.ItwayIO = {};


/* --------------------
 * - ItwayIO Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.ItwayIO.options = {

    //sockets and event handlers
    host: "http://"+window.location.hostname,
    socket: io('http://www.itway.io:6378'),
    //-------------------
    notifyBlock: $('.notify'),
    notifyBtn: $('.button-notify'),
    //Add slimscroll to navbar menus
    //This requires you to load the slimscroll plugin
    //in every page before app.js
    navbarMenuSlimscroll: true,
    navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
    navbarMenuHeight: "200px", //The height of the inner menu
    sidebarControlWidth: "280px",
    //Sidebar push menu toggle button selector
    sidebarToggleSelector: "[data-toggle='offcanvas']",
    //Activate sidebar push menu
    sidebarPushMenu: true,
    //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
    sidebarSlimScroll: false,
    //Enable sidebar expand on hover effect for sidebar mini
    //This option is forced to true if both the fixed layout and sidebar mini
    //are used together
    sidebarExpandOnHover: true,
    //BoxRefresh Plugin
    enableBoxRefresh: true,
    //Bootstrap.js tooltip
    enableBSToppltip: true,
    BSTooltipSelector: "[data-toggle='tooltip']",
    //Enable Fast Click. Fastclick.js creates a more
    //native touch experience with touch devices. If you
    //choose to enable the plugin, make sure you load the script
    //before ItwayIO's app.js
    enableFastclick: true,
    //Control Sidebar Options
    enableControlSidebar: true,
    controlSidebarOptions: {
        //Which button should trigger the open/close event
        toggleBtnSelector: "[data-toggle='control-sidebar']",
        //The sidebar selector
        selector: ".control-sidebar",
        //Enable slide over content
        slide: true
    },
    //Box Widget Plugin. Enable this plugin
    //to allow boxes to be collapsed and/or removed
    enableBoxWidget: true,
    //Box Widget plugin options
    boxWidgetOptions: {
        boxWidgetIcons: {
            //Collapse icon
            collapse: 'fa-minus',
            //Open icon
            open: 'fa-plus',
            //Remove icon
            remove: 'fa-times'
        },
        boxWidgetSelectors: {
            //Remove button selector
            remove: '[data-widget="remove"]',
            //Collapse button selector
            collapse: '[data-widget="collapse"]'
        }
    },
    //Direct Chat plugin options
    directChat: {
        //Enable direct chat by default
        enable: true,
        //The button to open and close the chat contacts pane
        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
    },
    //Define the set of colors to use globally around the website
    colors: {
        lightBlue: "#3c8dbc",
        red: "#f56954",
        green: "#00a65a",
        aqua: "#00c0ef",
        yellow: "#f39c12",
        blue: "#0073b7",
        navy: "#001F3F",
        teal: "#39CCCC",
        olive: "#3D9970",
        lime: "#01FF70",
        orange: "#FF851B",
        fuchsia: "#F012BE",
        purple: "#8E24AA",
        maroon: "#D81B60",
        black: "#222222",
        gray: "#d2d6de"
    },
    //The standard screen sizes that bootstrap uses.
    //If you change these in the variables.less file, change
    //them here too.
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements ItwayIO's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
    //Extend options if external options exist
    if (typeof ItwayIOOptions !== "undefined") {
        $.extend(true,
            $.ItwayIO.options,
            ItwayIOOptions);
    }

    //Easy access to options
    var o = $.ItwayIO.options;

    //Set up the object
    _init(o);

    $.ItwayIO.search.activate();
    // start of handling events and sockets
    $.ItwayIO.notifier.activate();
    //Activate the layout maker
    $.ItwayIO.layout.activate();
    //Activate messenger functionality
    $.ItwayIO.messenger.activate();

    //Enable sidebar tree view controls
    $.ItwayIO.tree('.sidebar');

    //Enable control sidebar
    if (o.enableControlSidebar) {
        $.ItwayIO.controlSidebar.activate();
        //Add slimscroll to navbar dropdown
        //if (typeof $.fn.slimscroll != 'undefined') {
        //    $(".control-sidebar-bg").slimscroll({
        //        height: $(window).height() - o.navbarMenuHeight,
        //        alwaysVisible: false,
        //    }).css("width", "230px");
        //}
    }

    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
        $(".navbar .menu").slimscroll({
            height: o.navbarMenuHeight,
            alwaysVisible: false,
            size: o.navbarMenuSlimscrollWidth
        }).css("width", "100%");
    }

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
        $.ItwayIO.pushMenu.activate(o.sidebarToggleSelector);
    }

    ////Activate Bootstrap tooltip
    //if (o.enableBSToppltip) {
    //    $('body').tooltip({
    //        selector: o.BSTooltipSelector
    //    });
    //}

    //Activate box widget
    if (o.enableBoxWidget) {
        $.ItwayIO.boxWidget.activate();
    }

    //Activate fast click
    if (o.enableFastclick && typeof FastClick != 'undefined') {
        FastClick.attach(document.body);
    }

    //Activate direct chat widget
    if (o.directChat.enable) {
        $(o.directChat.contactToggleSelector).on('click', function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
        });
    }

    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $('.button-group[data-toggle="btn-toggle"]').each(function () {
        var group = $(this);
        $(this).find(".button").on('click', function (e) {
            group.find(".button.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });

    });
});

/* ----------------------------------
 * - Initialize the ItwayIO Object -
 * ----------------------------------
 * All ItwayIO functions are implemented below.
 */
function _init(o) {

    /* Notifier
     * ======
     * Notifies posts and notifies admin about the users and posts.
     *
     * @type Object
     * @usage $.ItwayIO.notifier.activate()
     *        $.ItwayIO.notifier.newPostCreated()
     *        $.ItwayIO.notifier.addNotifiedState()
     */
    $.ItwayIO.notifier = {
        activate: function() {
            var _this = this;
            _this.newPostCreated();
            _this.removeNotifiedState();
            //o.notifyBlock.children().length
        },
        newPostCreated: function(){
            var _this = this;
            o.socket.on("post-created:itway\\Events\\PostWasCreatedEvent", function(message){
                o.notifyBlock.prepend(
                    '<div class="control-sidebar-heading">New Post added</div> <li><span class=\"has-notify\"></span>' +
                    '<a class="message-link" href=\"'+ o.host+'/'+message.post.locale+'/blog/post/' + message.post.id + '\"> ' +
                    '<p class="message-title">'+message.post.title+'</p> ' +
                    '<small class=\"notifier-info text-center\" >'+message.post.preamble+'<div class="clearfix"></div>' +
                    '<img class="avatar" src="'+ o.host+'/images/users/'+message.user.photo+'" alt=\"\"></img> ' +
                    '<span class=\"author\">'+message.user.name+'</span> </small>' +
                    '</a></li>');
                o.notifyBlock.data('data-new', 'present');
                _this.addNotifiedState();
            });
        },
        addNotifiedState: function(){
            o.notifyBtn.prepend('<span class=\"has-notify\"></span>');
        },
        removeNotifiedState: function(){
            o.notifyBtn.bind('click', function(){
                if($(this).find('span.has-notify').length > 0) {
                    $(this).find('span.has-notify').remove();
                }
            });

        }
    };
    var timer;


    /* Search functionality */
    $.ItwayIO.search = {

        activate: function () {
            var _this = this;

            $("#search button").click(function(e){
                e.preventDefault();
                _this.search();
            });

            $('.tag-search').on('click', function(e){
                e.preventDefault();
                _this.tagSearch();
            });

            $('a[href="#search"]').on('click', function(event) {
                event.preventDefault();

                $('#search').addClass('open');

                $('#search > form > input[type="search"]').focus();
                $('body').css({'overflow': 'hidden'});

            });

            $('#search, #search button.close').on('click keyup', function(event) {
                if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                    $(this).removeClass('open');
                    $('body').css({'overflow': 'auto'});

                }
            });


            //Do not include! This prevents the form from submitting for DEMO purposes only!
            $('#search form').submit(function(event) {
                event.preventDefault();
                return false;
            });

            $('#search > form > input[type="search"]').keyup(function(e) {
                if(e.keyCode == 13 && $('#search .search-input').val().length > 0 || $('#search .search-input').val().length > 0) {
                    _this.search();
                }
                else {
                    _this.stopSearch();
                }
            })
        },
        search: function(){
            var _this = this;
        timer = setTimeout(function(){

            $.ajax({
                url:'http://www.itway.io/search',
                data: {'keywords':$('#search .search-input').val()},
                method:'post',
                success: function(markup){

                    $('.search-result').html(markup);

                },
                error: function(err){
                    $('.search-result').html('<h3 class="text-danger"> Error occured </h3>');
                    console.log(err.type);
                    _this.stopSearch();

                }
            });

        }, 500);
    },
    tagSearch: function (){
        var _this = this;
        timer = setTimeout(function(){

            $.ajax({
                url:'http://www.itway.io/getAllExistingTags',
                method:'post',
                success: function(markup){

                    $('.search-result').html(markup);

                },
                error: function(err){
                    $('.search-result').html('<h3 class="text-danger"> Error occured </h3>');
                    console.log(err.type);
                    _this.stopSearch();

                }
            });

        }, 500);
    },
        stopSearch: function() {
            clearTimeout(timer);
        }

    };

    $.ItwayIO.messenger = {


            /***
             Initialization
             ***/
            activate: function(){

                var _this = this;

                //_this.chatConnected();

                _this.scrollToBottom();

                _this.noRoom();

                _this.createNewRoom();

                o.socket.on("chat-connected:itway\\Events\\UserEnteredChatEvent", function(message){

                });

                var jqxhr  = $.ajax({
                        url: '/chat/' + user_id + '/rooms',
                        type: 'GET',
                        dataType: 'json'
                    });

                jqxhr.done(function(data) {

                    if(data.success && data.result.length > 0) {

                        console.log(data.result);

                        $.each(data.result, function(index, conversation) {

                            o.socket.emit('join', { room:  conversation.id });

                        });
                    }
                });

                o.socket.on('welcome', function (data) {

                    console.log(data.message);

                    o.socket.emit('join', { room:  current_thread });
                });

                o.socket.on('joined', function(data) {

                    console.log(data.message);

                });

                o.socket.on('userCount', function (data) {

                    var chatRightPanel = $("#chatRightPanel");

                    if($("#chatRightPanel .numUsers").length >=1 ) {

                        chatRightPanel.find("small.numUsers").remove();

                        chatRightPanel.append("<small class=\"numUsers\">"+"online users count " + data.userCount+ "</small>");

                    }
                    else {
                        chatRightPanel.append("<small class=\"numUsers\">"+"online users count " + data.userCount+ "</small>");
                    }
                });

                o.socket.on('userJoined', function (data) {

                    var userList = $("#users"),
                        commentUserList = $(".message-wrap");


                    userList.find(".media-body .online").remove();
                    userList.removeClass("active");
                    commentUserList.find(".comment .online").remove();


                    $.each(data.users, function(index, user) {

                        var currentUser = userList.find("a[data-userid='"+user.customId+"']"),
                            currentCommentUser = commentUserList.find(".comment[data-comment-user='"+user.customId+"']");

                        currentUser.addClass("active");

                        currentUser.find(".media-body").append("<span class=\"online\"></span>");

                        currentCommentUser.append("<span class=\"online\">online</span>");

                    });

                });
                o.socket.on('connect', function (data) {

                    o.socket.emit('storeClientInfo', { customId: user_id });

                    console.log(data);
                });

                o.socket.on("chat.messages:itway\\Events\\ChatMessageCreated", function(message){

                    var
                        data = message.data,
                        $messageList  = $(".msg-wrap .comments"),
                        $conversation = $(".conversation-wrap a[data-room='"+data.room+"']");

                    var message      = data.message.body,
                        from_user_id = data.message.user_id,
                        conversation = data.room;

                    _this.getMessages(from_user_id, conversation).done(function(data) {

                        $conversation.find('.last-message-body').text(message);

                        if(conversation === current_thread) {

                            $messageList.append(data);

                            _this.scrollToBottom();

                        }

                        if(from_user_id !== user_id && conversation !== current_thread) {

                            _this.updateConversationCounter($conversation);

                        }
                    });

                });


                o.socket.on("chat.rooms:itway\\Events\\ChatRoomCreated", function(message) {

                    var $conversationList = $(".rooms .conversation-wrap");
                    var
                        data = message.data,
                        $messageList  = $(".msg-wrap .comments"),
                        $conversationTab = $(".button-panel-conversation a[data-tab='rooms']");


                    var message      = data.message.body,
                        from_user_id = data.message.user_id,
                        conversation = data.room;

                    _this.getConversations(user_id, conversation, current_thread).done(function(data) {

                        if(!data.notInRoom){

                            $conversationList.prepend(data);
                            var $conversation = $(".conversation-wrap a[data-room='"+conversation+"']");
                            _this.notifyNewRoom($conversationTab);
                            _this.updateConversationCounter($conversation);
                        }

                    });
                });

                _this.events();


            },
            /***
             Functions
             ***/
            noRoom: function() {

                var noRoom = $("#no-room"),
                    createRoom = $("#create-room");
                    if (noRoom.length >= 1){
                        noRoom.addClass('hidden');
                        createRoom.on("click", function(e){

                            e.preventDefault();

                            noRoom.removeClass('hidden').addClass('active');
                        });

                    }


            },
            createNewRoom: function(){

                $("#chatDropdown").dropdown({
                        onChange: function(value, text, $selectedItem) {
                            console.log(value, text, $selectedItem);
                        },
                    transition: 'drop'

                });

                $("#create-room").on("click", function(){

                    var jqxhr  = $.ajax({
                        url: '/chat/create',
                        type: 'GET',
                        dataType: 'html'
                    }),
                        msgWrap = $(".message-wrap");

                    jqxhr.done(function(data){
                        msgWrap.find(".msg-wrap").addClass("hidden");
                        msgWrap.find(".send-wrap").addClass("hidden");
                        msgWrap.prepend(data);
                    });

                });
            },
            notifyNewRoom: function($conversation) {

                var
                    $badge  = $conversation.find('.badge'),
                    counter = Number($badge .text());

                if($badge.length) {

                    $badge.text(counter + 1);

                } else {

                    $conversation.append('<span class="badge">1</span>');

                }

            },
            notifyUsers: function(user) {

                var usersBlock = $("#users");

                usersBlock.prepend("<div class=\"user\" id="+ user.id +">" + user.name +"</div>");

            },
            getConversations: function(user_id, conversation, current_thread) {

                var jqxhr = $.ajax({
                    url: '/chat/conversations',
                    type: 'GET',
                    data: { user_id: user_id, conversation: conversation, current_thread: current_thread}
                });

                return jqxhr;
            },

            getMessages: function (from_user_id, conversation) {

                var jqxhr = $.ajax({
                    url: '/room/getMessage',
                    type: 'GET',
                    data: { user_id: from_user_id, conversation: conversation },
                    dataType: 'html'
                });

                return jqxhr;
            },

            sendMessage: function (body, conversation, user_id) {
                var jqxhr = $.ajax({
                    url: '/room/create-message',
                    type: 'POST',
                    data:  { body: body , conversation: conversation, user_id: user_id },
                    dataType: 'json'
                });

                return jqxhr;
            },

            updateConversationCounter: function ($conversation) {
                var
                    $badge  = $conversation.find('.chat-user-name small .badge'),
                    counter = Number($badge .text());

                if($badge.length) {

                    $badge.text(counter + 1);

                } else {

                    $conversation.find('.chat-user-name small').append('<span class="badge">1</span>');

                }
            },

            scrollToBottom: function () {
                var $messageList  = $(".msg-wrap");

                if($messageList.length) {

                    $messageList.animate({scrollTop: $messageList[0].scrollHeight}, 500);

                }
            },

            /***
             Events
             ***/
            events: function(){
                var _this = this;
                $('#btnSendMessage').on('click', function (evt) {

                    var $messageBox  = $("#messageBox");

                    evt.preventDefault();

                    _this.sendMessage($messageBox.val(), current_thread, user_id).done(function(data) {
                        console.log(data);
                        $messageBox.val('');
                        $messageBox.focus();
                    });
                });

                $('#btnNewMessage').on('click', function() {
                    $('#newMessageModal').modal('show');
                });

                /**
                 * ctr+Enter to send message
                 */
                $('#messageBox').keypress(function (event) {
                    if (event.keyCode == 13 && event.ctrlKey) {
                        event.preventDefault();

                        $('#btnSendMessage').trigger('click');
                    }
                });

            }

};
    /* Layout
     * ======
     * Fixes the layout height in case min-height fails.
     *
     * @type Object
     * @usage $.ItwayIO.layout.activate()
     *        $.ItwayIO.layout.fix()
     *        $.ItwayIO.layout.fixSidebar()
     */
    $.ItwayIO.layout = {
        activate: function () {
            var _this = this;
            _this.fix();
            _this.fixSidebar();
            $(window, ".container.wrapper").resize(function () {
                _this.fix();
                _this.fixSidebar();
            });
        },
        fix: function () {
            //Get window height and the wrapper height
            var neg = $('#navigation').outerHeight() + $('#footer').outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height();
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css('min-height', window_height - $('#footer').outerHeight());
            } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                    $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                    postSetWidth = window_height - neg;
                } else {
                    $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                    postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $($.ItwayIO.options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== "undefined") {
                    if (controlSidebar.height() > postSetWidth)
                        $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                }

            }
        },
        fixSidebar: function () {
            //Make sure the body tag has the .fixed class
            if (!$("body").hasClass("fixed")) {
                if (typeof $.fn.slimScroll != 'undefined') {
                    $(".sidebar").slimScroll({destroy: true}).height("auto");
                }
                return;
            } else if (typeof $.fn.slimScroll == 'undefined' && console) {

                console.error("Error: the fixed layout requires the slimscroll plugin!");
            }
            //Enable slimscroll for fixed layout
            if ($.ItwayIO.options.sidebarSlimScroll) {
                if (typeof $.fn.slimScroll != 'undefined') {
                    //Destroy if it exists
                    $(".sidebar").slimScroll({destroy: true}).height("auto");

                    //Add slimscroll
                    $(".sidebar").slimscroll({
                        height: ($(window).height() - $("#navigation").height()) + "px",
                        color: "rgba(0,0,0,0.2)",
                        size: "3px"
                    });
                }
            }
        }
    };

    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.ItwayIO.pushMenu("[data-toggle='offcanvas']")
     */
    $.ItwayIO.pushMenu = {
        activate: function (toggleBtn) {
            //Get the screen sizes
            var screenSizes = $.ItwayIO.options.screenSizes;

            //Enable sidebar toggle
            $(toggleBtn).on('click', function (e) {
                e.preventDefault();

                console.log("notifier clicked");
                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {

                    $("body").toggleClass('sidebar-collapse');
                }
                //Handle sidebar push menu for small screens
                else {
                    if ($("body").hasClass('sidebar-open')) {

                        $("body").removeClass('sidebar-open');
                        $("body").removeClass('sidebar-collapse')
                    } else {
                        $("body").addClass('sidebar-open');
                    }
                }
            });

            $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass('sidebar-open');
                }
            });

            //Enable expand on hover for sidebar mini
            if ($.ItwayIO.options.sidebarExpandOnHover
                || ($('body').hasClass('fixed')
                && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHover();
            }

        },
        expandOnHover: function () {
            var _this = this;
            var screenWidth = $.ItwayIO.options.screenSizes.sm - 1;
            //Expand sidebar on hover
            $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini')
                    && $("body").hasClass('sidebar-collapse')
                    && $(window).width() > screenWidth) {
                    _this.expand();
                }
            }, function () {
                if ($('body').hasClass('sidebar-mini')
                    && $('body').hasClass('sidebar-expanded-on-hover')
                    && $(window).width() > screenWidth) {
                    _this.collapse();
                }
            });
        },
        expand: function () {
            $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
        },
        collapse: function () {

            if ($('body').hasClass('sidebar-expanded-on-hover')) {

                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');

            }
        }
    };

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel
     * tree view menu.
     *
     * @type Function
     * @Usage: $.ItwayIO.tree('.sidebar')
     */
    $.ItwayIO.tree = function (menu) {
        var _this = this;

        $("li a", $(menu)).on('click', function (e) {
            //Get the clicked link and the next element
            var $this = $(this);
            var checkElement = $this.next();

            //Check if the next element is a menu and is visible
            if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                //Close the menu
                checkElement.slideUp('normal', function () {
                    checkElement.removeClass('menu-open');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parent("li").removeClass("active");
            }
            //If the menu is not visible
            else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp('normal');
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var parent_li = $this.parent("li");

                //Open the target menu and add the menu-open class
                checkElement.slideDown('normal', function () {
                    //Add the class active to the parent li
                    checkElement.addClass('menu-open');
                    parent.find('li.active').removeClass('active');
                    parent_li.addClass('active');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    _this.layout.fix();
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
            }
        });
    };

    /* ControlSidebar
     * ==============
     * Adds functionality to the right sidebar
     *
     * @type Object
     * @usage $.ItwayIO.controlSidebar.activate(options)
     */
    $.ItwayIO.controlSidebar = {
        //instantiate the object
        activate: function () {
            //Get the object
            var _this = this;
            //Update options
            var o = $.ItwayIO.options.controlSidebarOptions;
            //Get the sidebar
            var sidebar = $(o.selector);
            //The toggle button
            var btn = $(o.toggleBtnSelector);

            //Listen to the click event
            btn.on('click', function (e) {
                e.preventDefault();
                //If the sidebar is not open
                if (!sidebar.hasClass('control-sidebar-open')
                    && !$('body').hasClass('control-sidebar-open')) {
                    //Open the sidebar
                    _this.open(sidebar, o.slide);
                    $(this).addClass('active');
                } else {
                    _this.close(sidebar, o.slide);
                    $(this).removeClass('active');

                }
            });

            //If the body has a boxed layout, fix the sidebar bg position
            var bg = $(".control-sidebar-bg");
            _this._fix(bg);

            //If the body has a fixed layout, make the control sidebar fixed
            if ($('body').hasClass('fixed')) {
                _this._fixForFixed(sidebar);
            } else {
                //If the content height is less than the sidebar's height, force max height
                if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                    _this._fixForContent(sidebar);
                }
            }
        },
        //Open the control sidebar
        open: function (sidebar, slide) {
            var _this = this;
            //Slide over content
            if (slide) {
                sidebar.addClass('control-sidebar-open');
            } else {
                //Push the content by adding the open class to the body instead
                //of the sidebar itself
                $('body').addClass('control-sidebar-open');
            }
        },
        //Close the control sidebar
        close: function (sidebar, slide) {
            if (slide) {
                sidebar.removeClass('control-sidebar-open');
            } else {
                $('body').removeClass('control-sidebar-open');
            }
        },
        _fix: function (sidebar) {
            var _this = this;
            var neg = $('#navigation').outerHeight();
            if ($("body").hasClass('layout-boxed')) {
                sidebar.css('position', 'absolute');
                sidebar.height($(window).height()/2 - neg).css({"overflow-y":"auto"});
                $(window).resize(function () {
                    _this._fix(sidebar);
                });
            } else {
                sidebar.css({
                    'position': 'fixed',
                    'height': 'auto'
                });
            }
        },
        _fixForFixed: function (sidebar) {
            sidebar.css({
                'position': 'fixed',
                'max-height': '100%',
                'overflow': 'auto',
                'padding-bottom': '50px'
            });
        },
        _fixForContent: function (sidebar) {
            $(".content-wrapper, .right-side").css('min-height', sidebar.height());
        }
    };

    /* BoxWidget
     * =========
     * BoxWidget is a plugin to handle collapsing and
     * removing boxes from the screen.
     *
     * @type Object
     * @usage $.ItwayIO.boxWidget.activate()
     *        Set all your options in the main $.ItwayIO.options object
     */
    $.ItwayIO.boxWidget = {
        selectors: $.ItwayIO.options.boxWidgetOptions.boxWidgetSelectors,
        icons: $.ItwayIO.options.boxWidgetOptions.boxWidgetIcons,
        activate: function () {
            var _this = this;
            //Listen for collapse event triggers
            $(_this.selectors.collapse).on('click', function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_this.selectors.remove).on('click', function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
        },
        collapse: function (element) {
            var _this = this;
            //Find the box parent
            var box = element.parents(".box").first();
            //Find the body and the footer
            var box_content = box.find("> .box-body, > .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(":first")
                    .removeClass(_this.icons.collapse)
                    .addClass(_this.icons.open);
                //Hide the content
                box_content.slideUp(300, function () {
                    box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(":first")
                    .removeClass(_this.icons.open)
                    .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(300, function () {
                    box.removeClass("collapsed-box");
                });
            }
        },
        remove: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp();
        }
    };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function ($) {

    $.fn.boxRefresh = function (options) {

        // Render options
        var settings = $.extend({
            //Refresh button selector
            trigger: ".refresh-btn",
            //File source to be loaded (e.g: ajax/src.php)
            source: "",
            //Callbacks
            onLoadStart: function (box) {
            }, //Right after the button has been clicked
            onLoadDone: function (box) {
            } //When the source has been loaded

        }, options);

        //The overlay
        var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

        return this.each(function () {
            //if a source is specified
            if (settings.source === "") {
                if (console) {
                    console.log("Please specify a source first - boxRefresh()");
                }
                return;
            }
            //the box
            var box = $(this);
            //the button
            var rBtn = box.find(settings.trigger).first();

            //On trigger click
            rBtn.on('click', function (e) {
                e.preventDefault();
                //Add loading overlay
                start(box);

                //Perform ajax call
                box.find(".box-body").load(settings.source, function () {
                    done(box);
                });
            });
        });

        function start(box) {
            //Add overlay and loading img
            box.append(overlay);

            settings.onLoadStart.call(box);
        }

        function done(box) {
            //Remove overlay and loading img
            box.find(overlay).remove();

            settings.onLoadDone.call(box);
        }

    };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function ($) {

    $.fn.todolist = function (options) {
        // Render options
        var settings = $.extend({
            //When the user checks the input
            onCheck: function (ele) {
            },
            //When the user unchecks the input
            onUncheck: function (ele) {
            }
        }, options);

        return this.each(function () {

            if (typeof $.fn.iCheck != 'undefined') {
                $('input', this).on('ifChecked', function (event) {
                    var ele = $(this).parents("li").first();
                    ele.toggleClass("done");
                    settings.onCheck.call(ele);
                });

                $('input', this).on('ifUnchecked', function (event) {
                    var ele = $(this).parents("li").first();
                    ele.toggleClass("done");
                    settings.onUncheck.call(ele);
                });
            } else {
                $('input', this).on('change', function (event) {
                    var ele = $(this).parents("li").first();
                    ele.toggleClass("done");
                    settings.onCheck.call(ele);
                });
            }
        });
    };
}(jQuery));