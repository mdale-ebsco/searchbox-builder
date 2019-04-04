$( document ).ready(function() {

//***********Auth Page Function**************
//*******************************************

function proxyCheck(){
  var proxycheckbox = $(this);
  if((proxycheckbox.val() == 'yes') && (proxycheckbox.is(":checked"))){
    $("#proxy-options").show();
    $(".proxytype input[type=radio]").each(ezCheck).change(ezCheck);
    return false;
  }
  else{
      $("#proxy-options").hide();
      $("#proxy-ez").hide();
      $("#proxy-wam").hide();
      $("#proxy-other").hide();
    }
}

function ezCheck(){
  var proxytypecheckbox = $(this);
  if((proxytypecheckbox.val() == 'ezproxy') && (proxytypecheckbox.is(":checked"))){
    $("#proxy-ez").show();
    $("#proxy-wam").hide();
    $("#proxy-other").hide();
    return false;
  }
  else if((proxytypecheckbox.val() == 'wam') && (proxytypecheckbox.is(":checked"))){
    $("#proxy-wam").show();
    $("#proxy-ez").hide();
    $("#proxy-other").hide();
    return false;
  }
  else if((proxytypecheckbox.val() == 'pxy-other') && (proxytypecheckbox.is(":checked"))){
    $("#proxy-other").show();
    $("#proxy-wam").hide();
    $("#proxy-ez").hide();
    return false;
  }
  else{
      $("#proxy-ez").hide();
      $("#proxy-wam").hide();
      $("#proxy-other").hide();
    }
}

function runAuthPage(){
  $(".proxyradio input[type=radio]").each(proxyCheck).change(proxyCheck);
}

//***********Form Validation*****************
//*******************************************
  var account_form = $("#account_form" );
  account_form.validate( {
    rules: {
      custid: "required",
      groupid: "required",
      profileid: "required"
    },
    messages: {
      custid: "Please enter your custID",
      groupid: "Please enter the groupID",
      profileid: "Please enter the profileID"
    },
    errorElement: "small",
    errorPlacement: function ( error, element ) {
        // Add the `help-block` class to the error element
        error.addClass( "help-block" );
        error.addClass( "text-danger" );

        if ( element.prop( "type" ) === "checkbox" ) {
          error.insertAfter( element.parent( "label" ) );
        } else {
          error.insertAfter( element );
        }
      },
			highlight: function ( element, errorClass, validClass ) {
				$( element ).addClass( "is-invalid" );
			},
			unhighlight: function (element, errorClass, validClass) {
				$( element ).removeClass( "is-invalid" );
			}
  } );

  var auth_form = $("#auth_form" );
  auth_form.validate( {
    rules: {
      proxy: "required",
      proxytype: "required"
    },
    messages: {
      proxy: "Please select yes or no",
      proxytype: "Please select a proxy"
    },
    errorElement: "small",
    errorPlacement: function ( error, element ) {
        // Add the `help-block` class to the error element
        error.addClass( "help-block" );
        error.addClass( "text-danger" );

        if ( element.prop( "type" ) === "radio" ) {
          error.insertAfter( element.closest( ".form-group" ) );
        } else {
          error.insertAfter( element );
        }
      },
			highlight: function ( element, errorClass, validClass ) {
        if($(element).prop("type") === "text"){
          	$( element ).addClass( "is-invalid" );
        }

			},
			unhighlight: function (element, errorClass, validClass) {
        if($(element).prop("type") === "text"){
				      $( element ).removeClass( "is-invalid" );
          }
			}
  } );


  //*******Next/Prev Button Function***********
  //*******************************************
  var current_step;
  var next_step;
  var steps;
  steps = $("fieldset").length;
  $(".next").click(function(e){
    if($(this).closest("form").valid()){
      e.preventDefault();
      current_step = $(this).parent().parent().parent();
      next_step = $(this).parent().parent().parent().next();
      next_step.show();
      current_step.hide();
      setProgressBar(++current);

      if($(this).is("#next_account")){
        runAuthPage();
      }
    }
    else{
      e.preventDefault();
      e.stopPropagation();
    }
  });
  $(".previous").click(function(e){
    e.preventDefault();
    current_step = $(this).parent().parent().parent();
    next_step = $(this).parent().parent().parent().prev();
    next_step.show();
    current_step.hide();
    setProgressBar(--current);
  });


  //**************Progress Bar*****************
  //*******************************************
  var current = 1;
  setProgressBar(current);

  function setProgressBar(curStep){
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
      .css("width",percent+"%");
  }

});
