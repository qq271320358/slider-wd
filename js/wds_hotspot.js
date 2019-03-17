function wds_display_hotspot() {
    jQuery(".wds_layer").each(function() {
        if (jQuery(this).data("displaytype") == "hover") {
            jQuery(this).hover(function() {
                jQuery(this).next().next().hide();
                jQuery(this).next().next().stop().fadeIn();
            }, function() {
                jQuery(this).next().next().stop().fadeOut();
            });
        }
        else {
            jQuery(this).click(function(e) {
                e.stopPropagation();
                if (jQuery(this).next().next().is(":visible") == true) {
                    jQuery(this).next().next().stop().fadeOut();
                }
                else {
                    jQuery(this).next().next().hide();
                    jQuery(this).next().next().stop().fadeIn();
                }
            });
            jQuery("body").click(function() {
                jQuery('span[data-type="hotspot_text"]').fadeOut();
            });
        }
    });
}

function wds_hotspot_position(prefix, ratio) {
    if (typeof prefix == 'undefined' || prefix == "") {
        var hotspot_layer = ".hotspot_container";
    }
    else {
        hotspot_layer = "#" + prefix + "_div";
    }
    if (typeof ratio == 'undefined') {
        var ratio = 1;
    }
    var arrow_size = Math.round(7 * ratio);
    var distance = Math.round(20 * ratio);

    jQuery(hotspot_layer).each(function() {
        var layer_id = jQuery(this).attr("id").replace("_div", "");
        var text_pos = jQuery(this).attr("data-text-position");
        var slide_width = jQuery(this).parent().outerWidth();
        var slide_height = jQuery(this).parent().outerHeight();
        var layer_left = parseFloat(jQuery(this).css("left"));
        var layer_top = parseFloat(jQuery(this).css("top"));
        var layer_text_bgcolor = jQuery(this).find("span:nth-child(3)").css("background-color");

        var chw1, chw2, chw3, chh1, chh2, chh3, marginTop, left, right;
        var right_border, left_border, top_border, bottom_border, bottom_angle, top_angle;
        chw1 = parseFloat(jQuery(this).find("span:nth-child(1)").outerWidth());
        chw2 = parseFloat(jQuery(this).find("span:nth-child(2)").outerWidth());
        chw3 = parseFloat(jQuery(this).find("span:nth-child(3)").outerWidth());

        chh1 = parseFloat(jQuery(this).find("span:nth-child(1)").outerHeight());
        chh2 = parseFloat(jQuery(this).find("span:nth-child(2)").outerHeight());
        chh3 = parseFloat(jQuery(this).find("span:nth-child(3)").outerHeight());

        right_border = layer_left + ((text_pos == "top" || text_pos == "bottom") ? (chw3 / 2 + chw1 / 2) : (chw2 + chw3 + distance));
        left_border = layer_left - ((text_pos == "top" || text_pos == "bottom") ? (chw3 / 2 - chw1 / 2) : (chw3 + distance));

        top_border = (text_pos == "left" || text_pos == "right") ? layer_top : (layer_top - chh3 - distance);
        bottom_border = (text_pos == "left" || text_pos == "right") ? (layer_top + chh2) : (layer_top + chh2 + chh3 + distance);

        bottom_angle = layer_top + chh2 / 2 + chh3 / 2;
        top_angle = layer_top - chh3 / 2 + chh2 / 2;

        if (right_border > slide_width) {
            text_pos = "left";
        }
        else if (left_border < 0) {
            text_pos = "right";
        }
        else if (top_border < 0) {
            text_pos = "bottom";
        }
        else if (bottom_border > slide_height) {
            text_pos = "top";
        }

        if (top_angle < 0) {
            if (text_pos == "right") {
                text_pos = "top-left";
            }
            else if (text_pos == "left") {
                text_pos = "top-right";
            }
        }
        else if (bottom_angle > slide_height) {
            if (text_pos == "right") {
                text_pos = "bottom-left";
            }
            else if (text_pos == "left") {
                text_pos = "bottom-right";
            }
        }

        jQuery(this).find("span.hotspot_text_before").removeAttr("style");
        if (text_pos == "bottom-left") {
            marginTop = "-" + (chh3 - chw2) + "px";
            left = (chw2 + distance) + 'px';
            right = 'auto';
            jQuery(this).find("span.hotspot_text_before").css({
                left: "-" + arrow_size + "px",
                top: (chh3 - (2 * arrow_size + 3)) + "px",
                borderTop: arrow_size + "px solid transparent",
                borderBottom: arrow_size + "px solid transparent",
                borderRight: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        else if (text_pos == "bottom-right") {
            marginTop = "-" + (chh3 - chw2) + "px";
            left = 'auto';
            right = (chw2 + distance) + 'px';
            jQuery(this).find("span.hotspot_text_before").css({
                right: "-" + arrow_size + "px",
                top: (chh3 - (2 * arrow_size + 3)) + "px",
                borderTop: arrow_size + "px solid transparent",
                borderBottom: arrow_size + "px solid transparent",
                borderLeft: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        else if (text_pos == "top-left") {
            marginTop = 0;
            left = (chw2 + distance) + 'px';
            right = 'auto';
            jQuery(this).find("span.hotspot_text_before").css({
                left: "-" + arrow_size + "px",
                top: "3px",
                borderTop: arrow_size + "px solid transparent",
                borderBottom: arrow_size + "px solid transparent",
                borderRight: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        else if (text_pos == "top-right") {
            marginTop = 0;
            left = 'auto';
            console.log(chw2);
            right = (chw2 + distance) + 'px';
            jQuery(this).find("span.hotspot_text_before").css({
                right: "-" + arrow_size + "px",
                top: "3px",
                borderTop: arrow_size + "px solid transparent",
                borderBottom: arrow_size + "px solid transparent",
                borderLeft: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        else if (text_pos == "top") {
            marginTop = (-1 * (chh3 + distance)) + 'px';
            left = '-' + ((chw3 - chw2) / 2) + 'px';
            right = 'auto';
            jQuery(this).find("span.hotspot_text_before").css({
                left: (chw3 / 2 - arrow_size) + "px",
                bottom: "-" + arrow_size + "px",
                borderLeft: arrow_size + "px solid transparent",
                borderRight: arrow_size + "px solid transparent",
                borderTop: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        else if (text_pos == "bottom") {
            marginTop = (chw2 + distance) + 'px';
            left = '-' + ((chw3 - chw2) / 2) + 'px';
            right = 'auto';
            jQuery(this).find("span.hotspot_text_before").css({
                left: (chw3 / 2 - arrow_size) + "px",
                top: "-" + arrow_size + "px",
                borderLeft: arrow_size + "px solid transparent",
                borderRight: arrow_size + "px solid transparent",
                borderBottom: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        else if (text_pos == "left") {
            marginTop = (-1 * ((chh3 - chw2) / 2)) + "px";
            left = 'auto';
            right = (chw2 + distance) + 'px';
            jQuery(this).find("span.hotspot_text_before").css({
                right: "-" + arrow_size + "px",
                top: (chh3 / 2 - arrow_size) + "px",
                borderTop: arrow_size + "px solid transparent",
                borderBottom: arrow_size + "px solid transparent",
                borderLeft: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        else if (text_pos == "right") {
            marginTop = ((chw2 - chh3) / 2) + "px";
            left = (chw2 + distance) + 'px';
            right = 'auto';
            jQuery(this).find("span.hotspot_text_before").css({
                left: "-" + arrow_size + "px",
                top: (chh3 / 2 - arrow_size) + "px",
                borderTop: arrow_size + "px solid transparent",
                borderBottom: arrow_size + "px solid transparent",
                borderRight: arrow_size + "px solid " + layer_text_bgcolor
            });
        }
        jQuery(this).find(".wds_hotspot_text").css({
            marginTop : marginTop,
            left : left,
            right : right,
        });

        /*var random = Math.random() * 10;
         random = random.toFixed(2) + "s";
         jQuery(this).find("span:nth-child(2)").css({animationDelay: random, "-webkit-animation-delay": random});*/
    });
}