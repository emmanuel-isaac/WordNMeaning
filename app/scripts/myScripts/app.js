'use strict';

// PREPENDS THE LOADING GIF TO THESAURUS AND DEFINITION DIVS RESPECTIVELY
$('.Thesaurus').prepend('<img class="loadingThes" src="img/loading2.gif" />');
$('.Definition').prepend('<img class="loadingDef" src="img/loading2.gif" />');

// HIDES LOADING GIF ON PAGE LOAD
$('img').hide();
$('table').hide();
$('.alert').hide();
$('.responseAlert').hide()
