////////////////////////////////////////////////////////////////////////////////////////
// Events                                                                             //
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Constants                                                                          //
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Variables                                                                          //
////////////////////////////////////////////////////////////////////////////////////////
var deactivated = false;
var additionalInfo = "";
var btnVal = 3;

////////////////////////////////////////////////////////////////////////////////////////
// Constructor & Destructor                                                           //
////////////////////////////////////////////////////////////////////////////////////////	


////////////////////////////////////////////////////////////////////////////////////////
// Public Methods                                                                     //
////////////////////////////////////////////////////////////////////////////////////////
function tenwebReady( prefix ) {

  var agree_with_pp = false;
  reset_popup();
  jQuery( document ).on( "click", "." + window[prefix + "WDDeactivateVars"].deactivate_class, function () {
    agree_with_pp = false;
    jQuery( ".wd-" + prefix + "-opacity" ).show();
    jQuery( ".wd-" + prefix + "-deactivate-popup" ).show();
    if ( jQuery( this ).attr( "data-uninstall" ) == "1" ) {
      btnVal = 2;
    }

    return false;
  } );

  jQuery( document ).on( "change", "[name=" + prefix + "_reasons]", function () {

    jQuery( "." + prefix + "_additional_details_wrap" ).html( "" );
    jQuery( ".wd-" + prefix + "-deactivate-popup" ).removeClass( "wd-popup-active1 wd-popup-active2 wd-popup-active4" );
    if ( jQuery( this ).val() == "reason_plugin_is_hard_to_use_technical_problems" ) {

      additionalInfo = '<div class="wd-additional-active"><div><strong>Please describe your issue.</strong></div><br>' +
        '<textarea name="' + prefix + '_additional_details" rows = "4"></textarea><br>' +
        '<div>Our support will contact <input type="text" name="' + prefix + '_email" value="' + window[prefix + "WDDeactivateVars"].email + '"> shortly.</div>' +
        '<br><div><button class="button button-primary wd-' + prefix + '-deactivate" data-val="' + btnVal + '">Submit support ticket</button></div></div>';
      jQuery( "." + prefix + "_additional_details_wrap" ).append( additionalInfo );
      jQuery( ".wd-" + prefix + "-deactivate-popup" ).addClass( "wd-popup-active1" );

    }
    else if ( jQuery( this ).val() == "reason_free_version_limited" ) {
      additionalInfo = '<div class="wd-additional-active">' +
        '<div><strong>We believe our premium version will fit your needs.</strong></div>' +
        '<div><a href="' + window[prefix + "WDDeactivateVars"].plugin_wd_url + '" target="_blank">Try with 30 day money back guarantee.</a></div>';

      jQuery( "." + prefix + "_additional_details_wrap" ).append( additionalInfo );
      jQuery( ".wd-" + prefix + "-deactivate-popup" ).addClass( "wd-popup-active2" );
    }
    else {
      jQuery( ".wd-" + prefix + "-deactivate-popup" ).addClass( "wd-popup-active4" );
    }

    var checked = ( agree_with_pp === true ) ? "checked" : "";
    var agree_checkbox =
      "<div style='margin-top: 5px;'>" +
      "<input type='checkbox' " + checked + " name='" + prefix + "_agree_with_pp" + "' id='" + prefix + "_agree_with_pp" + "'/>" +
      "By submitting this form your email and website URL will be sent to 10Web. Click the checkbox if you consent to usage of mentioned data by 10Web in accordance with our <a target='_blank' href='https://10web.io/privacy-policy/'>Privacy Policy</a>." +
      "</div>";
    jQuery( "." + prefix + "_additional_details_wrap" ).prepend( agree_checkbox );

    jQuery( "#wd-" + prefix + "-submit-and-deactivate" ).show();
  } );
  jQuery( document ).on( "keyup", "[name=" + prefix + "_additional_details]", function () {
    if ( jQuery( this ).val().trim() || jQuery( "[name=" + prefix + "_reasons]:checked" ).length > 0 ) {
      jQuery( "#wd-" + prefix + "-submit-and-deactivate" ).show();
    }
    else {
      jQuery( "#wd-" + prefix + "-submit-and-deactivate" ).hide();
    }
  } );

  jQuery( document ).on( "change", "[name=" + prefix + "_agree_with_pp]", function () {
    if ( jQuery( this ).prop( 'checked' ) ) {
      agree_with_pp = true;
    } else {
      agree_with_pp = false;
    }
  } );

  jQuery( document ).on( "click", ".wd-" + prefix + "-deactivate", function ( e ) {
    var data_val = jQuery( this ).data( 'val' );
    var checkbox = jQuery( "#" + prefix + "_agree_with_pp" );

    if ( data_val !== 1 && ( checkbox.length === 0 || checkbox.prop( 'checked' ) === false ) ) {
      return false;
    }

    jQuery( ".wd-deactivate-popup-opacity-" + prefix ).show();
    if ( jQuery( this ).hasClass( "wd-clicked" ) == false ) {
      jQuery( this ).addClass( "wd-clicked" );
      jQuery( "[name=" + prefix + "_submit_and_deactivate]" ).val( jQuery( this ).attr( "data-val" ) );
      jQuery( "#" + prefix + "_deactivate_form" ).submit();
    }
    return false;
  } );

  jQuery( document ).on( "click", ".wd-" + prefix + "-cancel, .wd-opacity, .wd-deactivate-popup-close-btn", function () {
    jQuery( ".wd-" + prefix + "-opacity" ).hide();
    jQuery( ".wd-" + prefix + "-deactivate-popup" ).hide();
    reset_popup();

    return false;
  } );

  function reset_popup() {
    jQuery( "." + prefix + "_additional_details_wrap" ).html( "" );
    jQuery( ".wd-" + prefix + "-deactivate-popup" ).removeClass( "wd-popup-active1 wd-popup-active2 wd-popup-active4" );

    jQuery( "#wd-" + prefix + "-submit-and-deactivate" ).hide();
    jQuery( '#' + prefix + '_deactivate_form input[name="' + prefix + '_reasons' + '"]' ).prop( 'checked', false );
  }

}

////////////////////////////////////////////////////////////////////////////////////////
// Getters & Setters                                                                  //
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Private Methods                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Listeners                                                                          //
////////////////////////////////////////////////////////////////////////////////////////