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
        var resultArray = $.grep(this.events, function(event){ return event.id == id; })
        return resultArray[0];
      },
      getFinishedEvents: function () {
        var currDate = new Date();
          var resultArray = this.events.filter(function(event) {
            var dateEnd = new Date(event.dateEnd);
            return (dateEnd < currDate);
          });
          return resultArray;
      },
      getCurrentEvents: function () {
          var currDate = new Date();
          var resultArray = this.events.filter(function(event) {
            var dateEnd = new Date(event.dateEnd);
            var dateStart = new Date(event.dateStart);
            return (dateEnd >= currDate) && (currDate >= dateStart);
          });
          return resultArray;
      },
      getFutureEvents: function () {
          var currDate = new Date();
          var resultArray = this.events.filter(function(event) {
            var dateStart = new Date(event.dateStart);
            return (dateStart > currDate);
          });
          return resultArray;
      },
      getEventInfo: function (id) {
        var event = this.getEventById(id);
          return event.name + ", " + event.location + ": " + event.dateStart +
          " - " + event.dateEnd;;
      }
  }

  console.log(eventsRepository.getEventById(1).name);
  console.log(eventsRepository.getFinishedEvents());
  console.log(eventsRepository.getCurrentEvents());
  console.log(eventsRepository.getFutureEvents());
  console.log(eventsRepository.getEventInfo(2));
}

requestEvents ();
