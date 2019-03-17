/* EMBED handling. */
function wds_get_embed_info(input_id) {
    jQuery('#opacity_div').show();
    jQuery('#loading_div').show();
    var url = encodeURI(jQuery("#" + input_id).val());
    if (!url) {
        alert(wds_object.translate.please_enter_url_to_embed);
        return '';
    }
    var filesValid = [];
    var data = {
        'action': 'wds_addEmbed',
        'URL_to_embed': url,
        'async':true
    };
    // get from the server data for the url. Here we use the server as a proxy, since Cross-Origin Resource Sharing AJAX is forbidden.
    jQuery.post(ajax_url, data, function(response) {
        if (response == false) {
            alert(wds_object.translate.error_cannot_get_response_from_the_server);
            jQuery('#opacity_div').hide();
            jQuery('#loading_div').hide();
            return '';
        }
        else {
            var index_start = response.indexOf("WD_delimiter_start");
            var index_end = response.indexOf("WD_delimiter_end");
            if (index_start == -1 || index_end == -1) {
                alert(wds_object.translate.error_something_wrong_happened_at_the_server);
                jQuery('#opacity_div').hide();
                jQuery('#loading_div').hide();
                return '';
            }
            /*filter out other echoed characters*/
            /*18 is the length of "wd_delimiter_start"*/
            response = response.substring(index_start+18,index_end);
            response_JSON = jQuery.parseJSON(response);
            /*if indexed array, it means there is error*/
            if (typeof response_JSON[0] !== 'undefined') {
                alert('Error: ' + jQuery.parseJSON(response)[1]);
                jQuery('#opacity_div').hide();
                jQuery('#loading_div').hide();
                return '';
            }
            else {
                fileData = response_JSON;
                filesValid.push(fileData);
                var slideID = jQuery("div[id^='wbs_subtab'].wds_sub_active").attr("id");
                slideID = slideID.substr(10);
                if (jQuery("#wds_video_type" + slideID).val() == "video") {
                    wds_add_embeded_video(filesValid);
                }
                else {
                    wds_add_layer("video", slideID, '', '', filesValid, '');
                }
                document.getElementById(input_id).value = '';
                jQuery('#opacity_div').hide();
                jQuery('#loading_div').hide();
                return 'ok';
            }
        }
        return '';
    });
    return 'ok';
}

function wds_add_embeded_video(fileData, type, prefix) {
    var slideID = jQuery("div[id^='wbs_subtab'].wds_sub_active").attr("id");
    slideID = slideID.substr(10);

    if (typeof type == "undefined") {
        var type = "";
    }
    if (typeof prefix == "undefined") {
        var prefix = "";
    }
    if (type == "layer") {
        jQuery("#" + prefix).attr("src", fileData[0]['thumb_url']);
        jQuery("#" + prefix + "_image_url").val(fileData[0]['thumb_url']);
        jQuery("#" + prefix + "_link").val(fileData[0]['filename']);
        jQuery("#" + prefix + "_alt").val(fileData[0]['filetype']);
        jQuery("#" + prefix + "_image_width").val(300);
        jQuery("#" + prefix + "_image_height").val(200);
        wds_scale("#" + prefix + "_image_scale", prefix);
    }
    else {
        jQuery("#image_url" + slideID).val(fileData[0]['filename']);
        jQuery("#thumb_url" + slideID).val(fileData[0]['thumb_url']);
        jQuery("#type" + slideID).val(fileData[0]['filetype']);
        jQuery("#trlink" + slideID).hide();
        jQuery("#wds_preview_image" + slideID).css("background-image", 'url("' + fileData[0]['thumb_url'] + '")');
        jQuery("#wds_tab_image" + slideID).css("background-image", 'url("' + fileData[0]['thumb_url'] + '")');
    }
    jQuery("#wds_video_type" + slideID).val("");
    jQuery("#controls" + slideID).hide();
    jQuery("#autoplay" + slideID).show();
    if (fileData[0]['filetype'] == 'EMBED_OEMBED_YOUTUBE_VIDEO') {
        jQuery("#youtube_rel_video" + slideID).show();
    }
    else {
        jQuery("#youtube_rel_video" + slideID).hide();
    }
    jQuery(".edit_thumb").text(wds_object.translate.edit_filmstrip_thumbnail);
}

function wds_add_video(id, type) {
    spider_set_input_value("wds_video_type" + id, type);
    jQuery(".opacity_add_video").show();
    jQuery("#add_embed_help").hide();
    return false;
}