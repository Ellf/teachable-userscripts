// ==UserScript==
// @name         teachable-admin-add-user-id
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script to add the user ID to the admin dashboard
// @author       Tom Lorimer
// @match        *://academy.tailoredtutors.co.uk/admin/users*
// @match        *://*.purplehippo.io/admin/users*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function () {
  "use strict";

  // store url on load
  var currentPage = window.location.href;
  var $ = window.jQuery;

  $(window).on("load", function () {
    setTimeout(function () {
      buildUI();
    }, 3200);
  });

  function buildUI() {
    $(".tch-table.student-table tbody tr:first-of-type").append(
      '<th class="users-table-header _22oLp">User ID</th>'
    );
    //First we need to loop through all of the users in the specific admin area
    $("tr.border-bottom").each(function (el) {
      var userParse = $(this).find(".whole-cell").attr("href").split("/")[3];
      console.log(userParse);
      $(this).append(`<td class="_2kIOe">${userParse}</td>`);
    });
    $(".tch-page-nav-btn").on("click", function () {
      console.log("click");
      setTimeout(function () {
        buildUI();
      }, 2000);
    });
  }
})();
