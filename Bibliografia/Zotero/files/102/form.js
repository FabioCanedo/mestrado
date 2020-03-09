$(document).ready(function () {
    $("input[name=simplePromoType]:radio").change(function () {
        changePromoForm($( this ).val());
    });

    $('.tabs-content > li.active').css('display', 'block');

    $('#simple_promo_form_full-tabs > dd > a').unbind();
    $('#simple_promo_form_full-tabs > dd > a').bind('click', function(e) {
        e.preventDefault();
    });
});

function changePromoForm(val) {
    if (val == "1") {
        $("#simple_promo_form_default").hide();
        $("#simple_promo_form_full").show();
    } else {
        $("#simple_promo_form_default").show();
        $("#simple_promo_form_full").hide();
    }
}