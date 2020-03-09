/* function to enable/disable element if  -*/
$(function() {
  $("select[data-otherelement][data-otherval]").change(enableFromSelect);

  $("#titleSelect").change(function(){
    var val = $(this).val();
    var isbn = $("#isbn");
    var journalvol = $("#journalvol");

    if(val == "book" || val == "audioCD" || val == "cdrom") {
      journalvol.parent().hide()
      journalvol.val("");
      isbn.parent().show();
    } else if (val=="journal") {
      isbn.parent().hide();
      isbn.val("");
      journalvol.parent().show();
    }
  });

  $("form.rsForm.validate-form").validationEngine('attach', { promptPosition: "inline", scroll:true, prettySelect: true, usePrefix: 'dk_container_' })
    .queue(function(){
      if(typeof(validate_form) != "undefined") {
        if(validate_form) $("form.rsForm.validate-form:not('#feedback_form')").validationEngine('validate');
      } else if(typeof(feedback_validate_form) != 'undefined') {
        if(feedback_validate_form) $("#feedback_form").validationEngine('validate');
      }
    });

  // foundation select to work on validation engine on blur
  $("select[class='validate[required]']").change( foundationSelectChange );
  $(".pretty.dk[class*='validate[required]']").dropkick({ change: dropkickSelectChange });

  if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i)) {
    $(".custom select").css({'top':2,'visibility':'visible','display':'block', 'position':'absolute', 'z-index':9999, 'width':'100%', 'height':28, 'opacity':0});
    $(document).off('click', "form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector");
    $(document).on('click', "form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector", function(e) {
      e.preventDefault();
    });
    
    $("select[data-otherelement][data-otherval]").unbind('change', enableFromSelect);
    $("select[data-otherelement][data-otherval]").quickChange(enableFromSelect);
  }
});

var foundationSelectChange = function(value, label) {
  if($(this).val() == "") {
    $(this).validationEngine('showPrompt', '* This field is required', 'error', 'inline');
  } else {
    $(this).validationEngine('hide');
  }
}

var dropkickSelectChange = function(value, label) {
  if(value == "") {
    $("#dk_container_" + $(this).attr('id')).validationEngine('showPrompt', '* This field is required', 'error', 'inline');
  } else {
    $("#dk_container_" + $(this).attr('id')).validationEngine('hide');
  }
}

var enableFromSelect = function() {
  /* get id of "other" element */
  var otherelement = "#" + $(this).data('otherelement');
  /* value used to trigger enabling of other element */
  var otherval     = $(this).data('otherval');

  if($(this).val() == otherval) {
    $(otherelement).removeAttr("disabled");
    if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i))
      $(otherelement).focus();
  } else {
    $(otherelement).attr("disabled", "disabled");
    $(otherelement).val("");
  }
}

/**
 * Change placeholder of certain element then focus on the element
 * @param  {String} element Element ID
 * @param  {String} text    Text to replace current placeholder
 * @return {N/A}
 */
function changePlaceholderAndFocus(element, text) {
  text = text.charAt(0).toUpperCase() + text.slice(1);
  $("#" + element).attr("placeholder",text);
  $("#" + element).focus();
}


//credits to InvisibleBacon of Stack Overflow
$.fn.quickChange = function(handler) {
    return this.each(function() {
        var self = this;
        self.qcindex = self.selectedIndex;
        var interval;
        function handleChange() {
            if (self.selectedIndex != self.qcindex) {
                self.qcindex = self.selectedIndex;
                handler.apply(self);
            }
        }
        $(self).focus(function() {
            interval = setInterval(handleChange, 100);
        }).blur(function() { window.clearInterval(interval); })
        .change(handleChange); //also wire the change event in case the interval technique isn't supported (chrome on android)
    });
};