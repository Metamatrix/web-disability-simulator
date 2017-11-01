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

    chrome.browserAction.setIcon({
      path: "img/icon_active.png"
    });

    var menuBtn = $(this);
    var menuBtnId = menuBtn[0].id;

    chrome.storage.sync.set({ 'activeSimulation': menuBtnId });

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

  function resetSimulation() {
    chrome.browserAction.setIcon({
      path: "img/icon.png"
    });

    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'), 10) == 0 ? tooltip.outerWidth() : 0
    });

    $("#Syn").text("Syn");
    $("#Motorik").text("Motorik");

    (0, _general.resetCSS)();
    chrome.storage.sync.remove('activeSimulation');
  }

  //reset-btn click

  $("#reset-btn").click(function () {
    resetSimulation();
  });

  //github link click 

  $(".github-link").click(function () {
    chrome.tabs.create({ url: 'https://github.com/Metamatrix/Web-Disability-Simulator' });
  });

  //panel collapse, show arrows: 

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".down-arrow, .up-arrow").toggle();
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find(".down-arrow, .up-arrow").toggle();
  });

  //keep chosen simulation fact tooltip when extension is closed and opened again. 

  window.onload = function () {

    chrome.storage.sync.get('activeSimulation', function (obj) {

      var activeSimulation = obj.activeSimulation;

      if (activeSimulation != null) {

        tooltip.css("left", "0");

        infoHeading.append($('#' + activeSimulation).text());

        $('#' + activeSimulation).closest(".dropdown").find(".selected").text($('#' + activeSimulation).text());

        var id = $('#' + activeSimulation).attr("id");

        infoParagraph.append(data[id]);

        $.each(data[id + '-listItems'], function (key, value) {
          adviceList.append('<li>' + value + '</li>');
        });

        if (data[id + '-moreInfo']) {
          moreInfoPanel.show();
          moreInfoParagraph.append(data[id + '-moreInfo']);
        }
      }
    });
  };

  //function that runs when tab is reloaded
  /*  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      resetSimulation();
    });*/
});
//# sourceMappingURL=babel.js.map
