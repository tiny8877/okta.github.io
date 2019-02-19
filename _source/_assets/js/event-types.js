$(document).ready(function () {
  // Elements
  var $filter = $("#event-type-filter");
  var $release = $("#event-type-release");
  var $eventTypes = $(".event-type");
  var $eventTypeCount = $("#event-type-count");

  // Enable live search
  $filter.keyup(debounce(search, 100));
  $release.change(search);

  // Synchronize url state with search
  var filter = param("q");
  var release = param("release");
  if (filter || release) {
    $filter.val(filter);
    $release.val(release)
    search();
  }

  /**
   * Performs event type filtering based on search state.
   */
  function search() {
    var count = 0;
    var filter = $filter.val().trim();
    var release = $release.val().trim();
    var regex = new RegExp(filter, "i");

    // Hide or show based on match
    $eventTypes.each(function () {
      var $eventType = $(this);
      var text = $eventType.text();

      if (text.indexOf(release) < 0 || text.search(regex) < 0) {
        $eventType.hide();
      } else {
        $eventType.show();
        count++;
      }
    });

    // Show result count
    $eventTypeCount.html("Found <b>" + count + "</b> matches");

    // Add to URL
    push({q: filter, release: release})
  }

  /**
   * Performs standard debounce on supplied func
   * 
   * @param {func} func 
   * @param {number} wait 
   * @param {*} immediate 
   */
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  /**
   * Extracts the specified param from the url.
   * 
   * @param {string} name 
   */
  function param(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
    if (results == null){
       return null;
    } else{
       return decodeURI(results[1]) || 0;
    }
  }

  /**
   * Pushes name-value pairs into the browser push-state history
   *
   * @param {object} params
   */
  function push(params){
    // Add to URL if supported
    if (history.pushState) {
      history.pushState(null, '', '?' + $.param(params));
    }
  }  

});
