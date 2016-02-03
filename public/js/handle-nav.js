'use strict';

function setBlueIcon($el) {
  var $img = $el.find('img');
  var path = $img.attr('src');
  $img.attr('src', path.substring(0, path.length - 4) + '_blue.svg');
};

function setWhiteIcon($el) {
  var $img = $el.find('img');
  var path = $img.attr('src');
  $img.attr('src', path.substring(0, path.length - 9) + '.svg');
};

(function(pathname) {
  pathname = pathname || $(location).attr('pathname').toLowerCase();
  if (pathname === '/') pathname = '/connect';
  $('#primary-nav li a').removeClass('active');
  var $el = $('#primary-nav li a[data-section=' + pathname.slice(1) + ']');
  $el.addClass('active');
  setBlueIcon($el);
})();

$('#primary-nav li:not(:first-child) a').hover(function() {
  if (!$(this).hasClass('active')) setBlueIcon($(this));
}, function() {
  if (!$(this).hasClass('active')) setWhiteIcon($(this));
});

$('#primary-nav li:not(:first-child) a').click(function() {
  var $el = $('#primary-nav').find('a.active').removeClass('active');
  setWhiteIcon($el);

  $(this).addClass('active');
  var $img = $(this).find('img');
  var path = $img.attr('src');
  if (!path.endsWith('_blue.svg')) $img.attr('src', path.substring(0, path.length - 4) + '_blue.svg');
});
