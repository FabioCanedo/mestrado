/**
 * @author Christian Deocampo <cdeocampo@cambridge.org>
 * Description: This will be a global js file for use in all business streams
 *   that has ecommerce capabilities
 */

var alreadyClicked = false;
var cartItemCount = 0;

// cart data
var currency = '$';
var subTotal = 0;
var hasAsp = false;

// ajax option including the url of add to cart WS and the success function
var errorCallBack = function () {
    // hide the view cart
    if (cartItemCount < 1) {
        jQuery('.viewCart').hide();
    }

    jQuery('#itemAddedMessage').text("There was a problem getting your cart information.");
    jQuery('#itemAddedModal').reveal();
};
var completeCallBack = function () {
    alreadyClicked = false;
    countryChange = true;
    jQuery('body').css('cursor', 'auto');
};

var addToCartEvent = function (event) {
    event.preventDefault();

    // check first if the user hasn't clicked on the link to prevent multiple
    // AJAX requests
    if (alreadyClicked == false) {
        alreadyClicked = true;

        // make the body to show wait cursor while processing
        jQuery('body').css('cursor', 'wait');
        var $this = jQuery(this);
        addToCart($this.data("isbn"), $this.data("country"), $this.data("page"), $this.data("discountcode"), $this.data("institutiononly"), $this.data("qty"));
    }
};

// finished loading the document
jQuery(function () {
    if (VISTA_SERVICE_REGION !== 'A' && VISTA_SERVICE_REGION !== 'E') {

        jQuery('.addToCartBtn').live('click', addToCartEvent);

        // upon loading the document, check cart web service and update mini cart
        var cartOpt = {
            url: KK_MINI_CART,
            dataType: 'xml',
            success: mini_cart_successful,
            error: function () {
                jQuery('#miniCartDetail .qty').show();
                jQuery('#cartQty').html('(' + jQuery('#qtyValue').html() + ')');
            },
            // https://jira.cambridge.org/browse/KEP-453
            cache: false
        };

        // send request to cart WS
        jQuery.ajax(cartOpt);
    } else {
        // GAW-2570
        if (jQuery('.addToCartBtn.konakartLink').length > 0) {
            jQuery('.addToCartBtn.konakartLink').live('click', addToCartEvent);
        }

        $.ajax({
            url: "/tools/packages/cambridge_themes/miniCart",
            data: {
                source: "Academic_v1"
            },
            success: function (data) {
                if ($('#qtyValue').html() == 0) {
                    jQuery('#cartQty').html('');
                    var cartOpt = {
                        url: KK_MINI_CART,
                        dataType: 'xml',
                        success: mini_cart_successful,
                        error: function () {
                            jQuery('#miniCartDetail .qty').show();
                            jQuery('#cartQty').html('(' + jQuery('#qtyValue').html() + ')');
                        },
                        // https://jira.cambridge.org/browse/KEP-453
                        cache: false
                    };

                    // send request to cart WS
                    jQuery.ajax(cartOpt);
                    jQuery("a.viewCart").attr("href", VYRE_BASKET);
                    jQuery("a.academicCheckout").attr("href", VYRE_BASKET);

                    var minicartDetail = '<p class="qty">You have <span id="qtyString"><span id="qtyValue">0</span>&nbsp;items</span> in your cart.</p>' +
                        '<div id="miniCartItems"></div>' +
                        '<div class="withItems" style="display:none;">' +
                        '<div id="subtotal"><h4>Subtotal: <span id="subtotalValue">0.0</span></h4></div>' +
                        '<div class="clearfix"></div>' +
                        '<div id="buttons">' +
                        '<a href="' + VYRE_BASKET + '" class="button blue large viewCart">View cart <span class="viewCartCountAcademic_v1" style="display:none;">(0)</span></a>' +
                        '<a href="' + VYRE_BASKET + '" class="button orange large checkout academicCheckout">Checkout</a>' +
                        '</div>' +
                        '</div>';

                    $("#miniCartDetail").html(minicartDetail);
                } else {
                    hasAsp = true;
                }
            }
        });
    }
});

/**
 * upon success of calling add to cart WS
 * @param data xml returned data from ecom
 * @param textStatus test status
 * @param isbn string added isbn
 */
var add_to_cart_successful = function (data, textStatus, isbn) {
    var $cartData = jQuery(data);
    // hack to get HTML content in XML
    var cartErrorMessage = $cartData.find('errorMessage').text().trim();
    var cartInfoMessage = $cartData.find('infoMessage').text().trim();

    // get cart lines in the cart WS
    var cartLines = processCartData(data);
    refresh_cart(cartLines);

    // check first if we have error message then display it instead of item added message
    if (cartErrorMessage !== '') {
        jQuery('#addToCartCustom h4').html(cartErrorMessage);
        jQuery('#addToCartCustom h4').css('text-transform', 'none');
        jQuery('#addToCartCustom').reveal();
    } else if (cartInfoMessage !== '') {
        jQuery('#addToCartCustom h4').html(cartInfoMessage);
        jQuery('#addToCartCustom h4').css('text-transform', 'none');
        jQuery('#addToCartCustom').reveal();
    } else {
        // hide the view cart
        if (cartItemCount < 1) {
            jQuery('.viewCart').hide();
        }

        jQuery('#itemAddedMessage').text("Item added to your cart!");
        jQuery('#itemAddedModal').reveal();
        googleTagManager(isbn);
    }
};

// upon success of calling cart WS
var mini_cart_successful = function (data, textStatus) {
    // get cart lines in the cart WS
    var cartLines = processCartData(data);
    refresh_cart(cartLines);
};

/**
 * Convert data collected from the cart WS and traverse and store it in array
 * @param  {XML} xml Expected XML cart data
 * @return {Array}     Array list of lines (products) in the cart
 */
var processCartData = function (xml) {
    // reset
    cartItemCount = 0;
    currency = '$';
    subTotal = 0;

    var $cartData = jQuery(xml);
    var cartLines = [];

    currency = $cartData.find('symbol').text();
    subTotal = $cartData.find('totalValueOverride').text();

    // traverse the orderline
    $cartData.find('orderLines').find('orderLine').each(function () {
        var data = [];
        data['availabilityLegend'] = getXMLValue("availabilityLegend", this);

        cartItemCount += getXMLValue('quantity', this) ? parseInt(getXMLValue('quantity', this)) : 1;
        data['title'] = getXMLValue('title', this);
        data['author'] = getXMLValue('author', this);
        var price = getXMLValue('publishedPriceOverride', this);
        data['price'] = price.length > 0 ? price : getXMLValue('originalValue', this);
        data['price'] = data['price'].replace(',', '');

        data['discountPrice'] = getXMLValue('publishedPriceOverride', this);
        data['discountPrice'] = data['discountPrice'].replace(',', '');
        data['ean'] = getXMLValue('ean', this);
        data['quantity'] = getXMLValue('quantity', this).replace(',', '');
        data['format'] = getXMLValue('format', this);

        var volumeNumber = getXMLValue('volumeNumber', this);
        data['volume'] = volumeNumber.length > 0 && volumeNumber != '0' ? 'Volume ' + volumeNumber : '';

        var partNumber = getXMLValue('partNumber', this);
        data['part'] = partNumber.length > 0 && partNumber != '0' ? 'Part ' + partNumber : '';

        var edition = getXMLValue('edition', this);
        data['edition'] = edition.length > 0 ? edition + ' Edition' : '';

        var lastModified = new Date(getXMLValue('lastModified', this));
        data['lastModified'] = lastModified.getTime();

        cartLines.push(data);
    });

    cartLines.sort(function (a, b) {
        return a['lastModified'] - b['lastModified'];
    });

    return cartLines;
};

var getXMLValue = function (key, container) {
    return jQuery(container).find(key).text();
};

var refresh_cart = function (cartLines) {
    if (cartLines.length > 0) {
        var $miniCartDetail = jQuery('#miniCartDetail');
        var $learningQty = jQuery('p.qty #qtyString', $miniCartDetail);
        var $miniCartItems = jQuery('#miniCartItems');
        var $subTotal = jQuery('#subtotalValue');

        var cartItemString = '<span id="qtyValue">' + cartItemCount + '</span>' +
            (cartItemCount == 0 || cartItemCount > 1 ? ' items' : ' item');

        $learningQty.html(cartItemString);

        var cartItems = '';

        var itemDisplayCount = 1;
        for (var i = 0; i < cartLines.length; i++) {
            cartItems += '<h4><a href="/' + cartLines[i]['ean'] + '">' + cartLines[i]['title'] + '</a></h4>';
            cartItems += '<p>' + cartLines[i]['volume'] + ' ' + cartLines[i]['part'] + ' ' + cartLines[i]['edition'] + '<span>' + ' ' + cartLines[i]['author'] + '</span></p>';
            cartItems += '<p>' + cartLines[i]['format'] + '</p>';
            cartItems += '<p>' + cartLines[i]['availabilityLegend'] + ' | Qty: ' + cartLines[i]['quantity'] + ' | Price: ' + currency + (parseFloat(cartLines[i]['quantity']) * parseFloat(cartLines[i]['price'])).toFixed(2) + '</p>';
            itemDisplayCount++;

            if (itemDisplayCount > 3 && CURRENT_SITE === 'cambridgeenglish') {
                break;
            }
        }

        $miniCartItems.html(cartItems);
        $subTotal.html(currency + subTotal);
        jQuery('#mobileCartQty').html('(' + jQuery('#qtyValue').html() + ')');

        jQuery('.withItems').show();
    }
    else {
        if (jQuery('#miniCartItems > h4').length == 0) {
            jQuery('.withItems').hide();
        }
        jQuery('#miniCartDetail .qty').show();
    }

    jQuery('#cartQty').html('(' + jQuery('#qtyValue').html() + ')');
};

var addToCart = function (isbn, country, page, discountcode, institutiononly, qty) {
    isbn = typeof isbn !== 'undefined' ? isbn : '';
    country = typeof country !== 'undefined' ? country : '';
    page = typeof page !== 'undefined' ? page : '';
    discountcode = typeof discountcode !== 'undefined' ? discountcode : '';
    institutiononly = typeof institutiononly !== 'undefined' ? institutiononly : 0;
    qty = typeof qty !== 'undefined' ? qty : '';
    if(page === "schools") {
        var urlTarget = location.protocol + "//" + location.host
            + "/wm-ecommerce-web/" + page + "/addtocart?isbn=" + isbn
            + "\u0026locale=" + country + "\u0026discountCode=" + discountcode
            + "\u0026institutiononly=" + institutiononly + "\u0026qty=" + qty;
    } else {
        var urlTarget = location.protocol + "//" + location.host
            + "/wm-ecommerce-web/" + page + "/addtocart?isbn=" + isbn
            + "\u0026locale=" + country + "\u0026discountCode=" + discountcode;
    }
    jQuery.ajax({
        url: urlTarget,
        dataType: 'xml',
        success: function (data, textStatus) {
            add_to_cart_successful(data, textStatus, isbn)
        },
        error: errorCallBack,
        complete: completeCallBack,
        cache: false
    });
};

var getCartItems = function (callback) {
    var urlTarget = location.protocol + "//"
        + location.host + "/wm-ecommerce-web/ws/getItems";
    $.ajax({
        url: urlTarget,
        crossDomain: true,
    }).done(callback);
};

/**
 * firing google tag manager after adding to cart
 * the try catch block will take care of the logic for firing GTM if applicable, which is for ELT ATM.
 * @param isbn string
 */
function googleTagManager(isbn) {
    var gtm = {};

    try {
        gtm = new GoogleTagManager();
    } catch(error) {
        // GoogleTagManager is not loaded so just return
        return;
    }
    if ($.isFunction(gtm.addToCart)) {
        $.post(
            '/tools/packages/cambridge_core/titleService',
            {"isbn": isbn, "data": "gtm_data"},
            function (data, status) {
                gtm.addToCart(data);
            }
        );
    }
}