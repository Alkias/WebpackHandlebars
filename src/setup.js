export function setup(){
  $( "button.fc-faq-header" ).on( "click", function ( event ) {
    $( ".fc-faq-contents" ).toggle();
  } );

  var $manageOptions = $( ".fc-button.fc-cta-manage-options" );
  var $choiceDialog = $( ".fc-dialog.fc-choice-dialog" );
  var $prefernceDialog = $( ".fc-dialog.fc-data-preferences-dialog" );
  var $prefernceDialogBack = $( ".fc-dialog-header-back-button.fc-data-preferences-back" );
  var $manageVentors = $( ".fc-navigation-button.fc-manage-vendors" );
  var $ventorsDialog = $( ".fc-dialog.fc-vendor-preferences-dialog" );
  var $ventorsDialogBack = $( ".fc-dialog-header-back-button.fc-vendor-preferences-back" );
  var $helpLink = $( ".fc-purpose-feature-more-info" );
  var $helpDialog = $( ".fc-help-dialog-container" );
  var $helpDialogClose = $( ".fc-help-dialog-close-button-label" );

  var $consentButton = $( ".fc-preference-slider-container.fc-consent-preference-container" );
  var $consentAcceptAllButton = $( ".fc-button.fc-data-preferences-accept-all" );

  $manageOptions.on( "click", function ( event ) {
    $choiceDialog.toggle();
    $prefernceDialog.toggle();
  } );
  $prefernceDialogBack.on( "click", function ( event ) {
    $choiceDialog.toggle();
    $prefernceDialog.toggle();
  } );

  $manageVentors.on( "click", function ( event ) {
    $prefernceDialog.toggle();
    $ventorsDialog.toggle();
  } );
  $ventorsDialogBack.on( "click", function ( event ) {
    $prefernceDialog.toggle();
    $ventorsDialog.toggle();
  } );

  $helpLink.on( "click", function ( event ) {
    var title = $( this ).attr( "data-name" );
    var description = $( this ).attr( "data-legal-description" );
        
    console.log( title, description )

    $helpDialog.find( ".fc-help-dialog h1" ).text( title );
    console.log( $helpDialog.find( ".fc-help-dialog h2" ) );
        
    //.text(title);
    $helpDialog.find( ".fc-help-dialog-contents" ).html( description );
    $helpDialog.show();
        
  } );
  $helpDialogClose.on( "click", function ( event ) {
    $helpDialog.hide();
  } );

  $consentButton.on( "click", function ( event ) {
    var choice = $( this ).find( "intput" );
    console.log( choice.is( ":checked" ) );
    //alert("Consent");
  } )
  
  $consentAcceptAllButton.on( "click", function ( event ){ 
    setCookie( "mitos", "statistics", 360 );
  });
  
  function setCookie ( name, value, days ) {
    var expires = "";
    if ( days ) {
      var date = new Date();
      date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + ( value || "" ) + expires + "; path=/";
  }
  
  function getCookie ( name ) {
    var nameEQ = name + "=";
    var ca = document.cookie.split( ';' );
    for ( var i = 0; i < ca.length; i++ ) {
      var c = ca[ i ];
      while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1, c.length );
      if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
    }
    return null;
  }
  function eraseCookie ( name ) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
