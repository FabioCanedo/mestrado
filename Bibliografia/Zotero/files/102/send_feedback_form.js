/*
  ajax reveal
  used in feedback form
 */
(function ($) {
  'use strict';
  var isFeedbackFormLoaded = false;
  $(function() {
    $(document).on('click', 'a[data-ajax-reveal-id="yourFeedback"]', function(event) {
      event.preventDefault();
      var $containerId = $(this).data('ajax-reveal-id');
      var $container = $('#' + $containerId);

      if(!isFeedbackFormLoaded) {
        /* prep data */
        var $opt = {
                      url: CCM_REL + '/tools/packages/cambridge_themes/ajax_load_area',
                      data: {'pageID': CCM_CID, 'arHandle': 'gac_feedback', 'isGlobal': true},
                      success: renderAndReveal($container)
                  };
        $.ajax($opt);
      } else {
        $container.reveal({
          open: function() {
            $("#featuredContent").trigger('orbit.stop');
          },
          close: revealCloseCallback
        });
}
    });

    var renderAndReveal = function($container) {
      return function(data, textStatus) {
        $container.html(data);
        $container.reveal({open: revealOpenCallback, close: revealCloseCallback});
        isFeedbackFormLoaded = true;
    };
    };
  });

  var revealOpenCallback = function() {
    $("form.rsForm.validate-form").validationEngine('attach',
                                    {
                                      maxErrorsPerField: 1,
                                      promptPosition: "inline",
                                      scroll:true,
                                      prettySelect: true,
                                      usePrefix: 'dk_container_',
                                      ajaxFormValidation: true,
                                      ajaxFormValidationMethod: 'post',
                                      onAjaxFormComplete: feedbackFormComplete
                                    })
      .queue(function(){
        if(typeof(validate_form) != "undefined") {
          if(validate_form) $("form.rsForm.validate-form:not('#feedback_form')").validationEngine('validate');
        } else if(typeof(feedback_validate_form) != 'undefined') {
          if(feedback_validate_form) $("#feedback_form").validationEngine('validate');
        }
      });
    if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i))
      $(".pretty.dk[class*='validate[required]']").dropkick({ change: dropkickSelectChange });

    $("#featuredContent").trigger('orbit.stop');
  };

  var revealCloseCallback = function() {
    $("#featuredContent").trigger('orbit.start');
  };

  var feedbackFormComplete = function(status, form, returnObj, options) {
    var $confirmation = $("<div/>").html("<div style='display:none;margin-bottom:10px;'><span class='success label' style='padding:5px;'>" + returnObj['statusText'] + "</span></div>").contents();
    $("#yourFeedback").prepend($confirmation);
    $confirmation.fadeIn().delay(2000).fadeOut().delay(500).queue(function() {
      $("#yourFeedback").trigger('reveal:close');
      form_reset(form);
    });
  };

  var form_reset = function($form) {
    $form.find(':input').each(function() {
      switch(this.type) {
       case 'password':
       case 'select-multiple':
       case 'select-one':
       case 'text':
       case 'textarea':
       case 'email':
        $(this).val('');
       break;
       case 'checkbox':
       case 'radio':
        this.checked = false;
     }
   });
  };
} ( jQuery ) );