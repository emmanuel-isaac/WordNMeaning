'use strict';

$('.Thesaurus').prepend('<img class="loadingThes" src="img/loading.gif" />');
$('.Definition').prepend('<img class="loadingDef" src="img/loading.gif" />');
$('.alert').hide();


if ($('.Thesaurus').text() !== '') {
  $('img').hide();
}
