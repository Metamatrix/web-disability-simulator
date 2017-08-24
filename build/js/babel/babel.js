'use strict';

var _general = require('../../src/simulations/general.js');

var _index = require('../../src/simulations/farsightedness/index.js');

var _index2 = require('../../src/simulations/tunnelVision/index.js');

var _index3 = require('../../src/simulations/redGreenColorBlindness/index.js');

$(document).ready(function () {

  var tooltip = $(".tool-tip");
  var infoHeading = $(".disability-info-heading");
  var infoParagraph = $(".disability-info-paragraph");
  var adviceList = $(".advice-list");
  var moreInfoParagraph = $(".more-info-paragraph");
  var moreInfoPanel = $("#more-info-panel");

  //menu button click

  $(".menu-btn").click(function () {

    var $this = $(this);

    infoHeading.empty();
    infoParagraph.empty();
    adviceList.empty();
    moreInfoParagraph.empty();
    moreInfoPanel.hide();

    tooltip.animate({
      left: parseInt(tooltip.css('left'), 10) == 0 ? -tooltip.outerWidth() : 0
    });

    infoHeading.append($(this).text());

    $(this).closest(".dropdown").find(".selected").text($(this).text());

    var id = $(this).attr("id");

    infoParagraph.append(data[id]);

    $.each(data[id + "-listItems"], function (key, value) {
      adviceList.append('<li>' + value + '</li>');
    });

    if (data[id + "-moreInfo"]) {
      moreInfoPanel.show();
      moreInfoParagraph.append(data[id + "-moreInfo"]);
    }

    if ($(this).hasClass("farsightedness")) {
      (0, _index.farsightedness)();
    }

    if ($(this).hasClass("tunnelVision")) {
      (0, _index2.tunnelVision)();
    }

    if ($(this).hasClass("redGreenColorBlindness")) {
      (0, _index3.redGreenColorBlindness)();
    }
  });

  //reset-btn click

  $("#reset-btn").click(function () {
    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'), 10) == 0 ? tooltip.outerWidth() : 0
    });

    $(".dropdown").find("#Syn").text("Syn");
    $(".dropdown").find("#Motorik").text("Motorik");

    (0, _general.resetCSS)();
  });

  //panel collapse, show arrows: 

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".down-arrow").toggle();
    $(this).parent().find(".up-arrow").toggle();
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find(".up-arrow").toggle();
    $(this).parent().find(".down-arrow").toggle();
  });
});
//# sourceMappingURL=babel.js.map
