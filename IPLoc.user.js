// ==UserScript==
// @name         IPLoc
// @namespace    teachable
// @version      0.1
// @grant        window.onurlchange
// @description  IP to Location Utility for Teachable Admins
// @author       Tom Lorimer (Purple Hippo Web Studio)
// @match        https://*/admin/users/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function () {
  "use strict";
  setTimeout(function () {
    // Add buttons
    var currentIP = $(
      "#section-stats > div.tch-section-content.col-md-12.col-lg-9 > div:nth-child(1) > div:nth-child(2) > div.col-sm-6 > div > div > div > strong"
    );
    var lastIP = $(
      "#section-stats > div.tch-section-content.col-md-12.col-lg-9 > div:nth-child(1) > div:nth-child(2) > div.col-sm-4 > div > div > div > strong"
    );
    var origLabel = $(
      "#section-stats > div.tch-section-content.col-md-12.col-lg-9 > div:nth-child(1) > div:nth-child(2) > div.col-sm-6 > div > div > label-block > label > span"
    );
    var origLast = $(
      "#section-stats > div.tch-section-content.col-md-12.col-lg-9 > div:nth-child(1) > div:nth-child(2) > div.col-sm-4 > div > div > label-block > label > span"
    );
    $(origLabel).append(' <button id="cur">Check IP</button>');
    $(origLast).append(' <button id="lst">Check IP</button>');

    $("#cur").click("on", function () {
      getCountry(currentIP);
    });
    $("#lst").click("on", function () {
      getCountry(lastIP);
    });

    function getCountry(ip) {
      $.getJSON(`https://ipapi.co/${ip.text()}/json`, function (data) {
        var country_name = data.country_name;
        $(ip).append(` <small>${country_name}</small>`);
      });
    }

    if (window.onurlchange === null) {
      // feature is supported
      console.log("feature is supported");
      window.addEventListener("urlchange", (info) => {
        console.log("url changed");
      });
    }
  }, 6000);
})();
