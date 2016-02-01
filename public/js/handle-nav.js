'use strict';

var setBlueIcon = function($el) {
  var $img = $el.find('img');
  var path = $img.attr('src');
  $img.attr('src', path.substring(0, path.length - 4) + '_blue.svg');
};

var setWhiteIcon = function($el) {
  var $img = $el.find('img');
  var path = $img.attr('src');
  $img.attr('src', path.substring(0, path.length - 9) + '.svg');
};

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
