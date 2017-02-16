/**
 * Created by lio on 15.02.17.
 */
var eventsRepository;
function requestEvents () {
     return $.get("events.json", requestCallback, "json");
 }

function requestCallback (returnedData) {
  eventsRepository = {
      events: returnedData,
      getEventById: function (id) {
          return this.events[id];
      },
      getFinishedEvents: function () {
          var resultArray = [];
          var currDate = new Date();
          for (var i = 0; i < this.events.length; i++) {
              var date = new Date(this.events[i].dateEnd)
              if (date - currDate > 0) {
                  resultArray.push(this.events[i]);
              }
          }
          return resultArray;
      }
  }
  alert(eventsRepository.getEventById(1).name);
  alert(eventsRepository.getFinishedEvents());
}

requestEvents ();
