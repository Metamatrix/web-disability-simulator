'use strict';

var _general = require('../../src/simulations/general.js');

var _index = require('../../src/simulations/farsightedness/index.js');

var _index2 = require('../../src/simulations/tunnelVision/index.js');

var _index3 = require('../../src/simulations/redGreenColorBlindness/index.js');

var _data = require('../../src/UI/data/data.json');

var data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

$(document).ready(function () {

  var tooltip = $(".tool-tip");
  var infoHeading = $(".disability-info-heading");
  var infoParagraph = $(".disability-info-paragraph");
  var adviceList = $(".advice-list");
  var moreInfoParagraph = $(".more-info-paragraph");
  var moreInfoPanel = $("#more-info-panel");
  var resetBtn = $("#reset-btn");
  var navbarHeader = $(".navbar-header");
  var resetBtnText = data.UI[0].resetBtnText;
  var navbarHeaderText = data.UI[0].navbarHeaderText;

  navbarHeader.append(navbarHeaderText);
  resetBtn.append(resetBtnText);

  //menu button click

  $(".menu-btn").click(function () {

    var menuBtn = $(this);
    var menuBtnId = menuBtn[0].id;
    var id = menuBtn.attr("id");
    var fact = data.facts.find(findProperty).fact;
    var listItems = data.facts.find(findProperty).listItems;
    var moreInfo = data.facts.find(findProperty).moreInfo;

    chrome.browserAction.setIcon({
      path: "img/icon_active.png"
    });

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

    function findProperty(simulations) {
      return simulations.name === id;
    }

    infoParagraph.append(fact);

    $.each(listItems, function (i, value) {
      adviceList.append('<li>' + value + '</li>');
    });

    if (moreInfo) {
      moreInfoPanel.show();
      moreInfoParagraph.append(moreInfo);
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

      function findProperty(simulations) {
        return simulations.name === activeSimulation;
      }

      if (activeSimulation != null) {

        tooltip.css("left", "0");

        infoHeading.append($('#' + activeSimulation).text());

        $('#' + activeSimulation).closest(".dropdown").find(".selected").text($('#' + activeSimulation).text());

        var id = $('#' + activeSimulation).attr("id");

        var fact = data.facts.find(findProperty).fact;
        var listItems = data.facts.find(findProperty).listItems;
        var moreInfo = data.facts.find(findProperty).moreInfo;

        infoParagraph.append(fact);

        $.each(listItems, function (i, value) {
          adviceList.append('<li>' + value + '</li>');
        });

        if (moreInfo) {
          moreInfoPanel.show();
          moreInfoParagraph.append(moreInfo);
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
