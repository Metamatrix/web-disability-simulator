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

    var menuBtn = $(this);
    var menuBtnId = menuBtn[0].id;

    localStorage.setItem('menubutton', menuBtnId);

    infoHeading.empty();
    infoParagraph.empty();
    adviceList.empty();
    moreInfoParagraph.empty();
    moreInfoPanel.hide();

    tooltip.animate({
      left: parseInt(tooltip.css('left'), 10) == 0 ? -tooltip.outerWidth() : 0
    });

    infoHeading.append(menuBtn.text());

    menuBtn.closest(".dropdown").find(".selected").text(menuBtn.text());

    var id = menuBtn.attr("id");

    infoParagraph.append(data[id]);

    $.each(data[id + '-listItems'], function (key, value) {
      adviceList.append('<li>' + value + '</li>');
    });

    if (data[id + '-moreInfo']) {
      moreInfoPanel.show();
      moreInfoParagraph.append(data[id + '-moreInfo']);
    }

    if (menuBtn.hasClass("farsightedness")) {
      (0, _index.farsightedness)();
    }

    if (menuBtn.hasClass("tunnelVision")) {
      (0, _index2.tunnelVision)();
    }

    if (menuBtn.hasClass("redGreenColorBlindness")) {
      (0, _index3.redGreenColorBlindness)();
    }
  });

  //reset-btn click

  $("#reset-btn").click(function () {
    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'), 10) == 0 ? tooltip.outerWidth() : 0
    });

    $("#Syn").text("Syn");
    $("#Motorik").text("Motorik");

    (0, _general.resetCSS)();
    localStorage.removeItem('menubutton');
  });

  //panel collapse, show arrows: 

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".down-arrow, .up-arrow").toggle();
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find(".down-arrow, .up-arrow").toggle();
  });

  //keep chosen simulation fact tooltip when extension is closed and opened again. 

  window.onload = function () {
    var savedData = localStorage.getItem('menubutton');
    //console.log(savedData, 'sparad data'); 

    if (savedData != null) {

      tooltip.css("left", "0");

      infoHeading.append($('#' + savedData).text());

      $('#' + savedData).closest(".dropdown").find(".selected").text($('#' + savedData).text());

      var id = $('#' + savedData).attr("id");

      infoParagraph.append(data[id]);

      $.each(data[id + '-listItems'], function (key, value) {
        adviceList.append('<li>' + value + '</li>');
      });

      if (data[id + '-moreInfo']) {
        moreInfoPanel.show();
        moreInfoParagraph.append(data[id + '-moreInfo']);
      }
    }
  };
});
//# sourceMappingURL=babel.js.map
