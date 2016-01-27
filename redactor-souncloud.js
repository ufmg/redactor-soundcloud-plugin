(function ($) {
  $.Redactor.prototype.soundcloud = function () {
    return {
      /**
       * settings object
       * @type {Object}
       */
      settings: {
        CLIENT_ID: 'yout soundcloud client id here',
        RESOLVE_URL: 'https://api.soundcloud.com/resolve.json'
      },

      /**
       * lang object
       * default is en
       * @type {Object}
       */
      langs: {
        en: {
          'modalTitle': 'SoundCloud',
          'description': 'insert SoundCloud track link'
        },
        pt_br: {
          'modalTitle': 'SoundCloud',
          'description': 'inserir link de faixa do SoundCloud'
        }
      },

      /**
       * this function return soundcloud modal html structure
       * @return {string} modal html structure
       */
      getTemplate: function () {
        return '<div class="modal-section" id="redactor-modal-audio-insert">' +
                  '<section>' +
                    '<label>' + this.lang.get('description') + '</label>' +
                    '<input class="soundCloudLink" style="width: 100%;">' +
                 '</section>' +
                 '<section>' +
                    '<button id="redactor-modal-button-action">Insert</button>' +
                    '<button id="redactor-modal-button-cancel">Cancel</button>' +
                  '</section>' +
               '</div>';
      },

      /**
       * this function
       * @param  {string} uri api track url
       * @return {string}     soundcloud iframe html structure
       */
      getPlayer: function (uri) {
        return '<iframe  width="100%"' +
                        'height="166"'  +
                        'scrolling="no"'  +
                        'frameborder="no"' +
                        'src="https://w.soundcloud.com/player/?url=' + uri + '&amp;' +
                              'color=ff5500&amp;' +
                              'auto_play=false&amp;' +
                              'hide_related=false&amp;' +
                              'show_comments=true&amp;' +
                              'show_user=true&amp;' +
                              'show_reposts=false">' +
                '</iframe>';
      },

      /**
       * this function add soundcloud button in menu
       * and set your callback action
       */
      init: function () {
        var button = this.button.add('soundcloud', this.lang.get('modalTitle'));
        this.button.setIcon(button, '<i class="fa fa-soundcloud"></i>');
        this.button.addCallback(button, this.soundcloud.show);
      },

      /**
       * this function show modal and set action on insert button
       */
      show: function () {
        this.modal.addTemplate('audio', this.soundcloud.getTemplate());
        this.modal.load('audio', this.lang.get('modalTitle'), 700);
        this.modal.getActionButton().text(this.lang.get('insert')).on('click', this.soundcloud.insert);
        this.modal.show();

      },

      /**
       * callback for insert button click
       */
      insert: function () {
        var soundcloudClass = this;
        var url = this.soundcloud.settings.RESOLVE_URL;
        var client_id = this.soundcloud.settings.CLIENT_ID;
        var soundCloudLink = $('.soundCloudLink', '#redactor-modal-audio-insert').val();

        $.ajax({
          method: "GET",
          url: url,
          data: {
            url: soundCloudLink,
            client_id: client_id
          }
        }).done(function (res) {
          var data = soundcloudClass.soundcloud.getPlayer(res.uri);

          soundcloudClass.modal.close();
          soundcloudClass.buffer.set();
          soundcloudClass.air.collapsed();
          soundcloudClass.insert.html(data);
        });
      }
    };
  };
})(jQuery);
