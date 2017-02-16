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
        return $.grep(this.events, function(e){ return e.id == id; });
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
      },
      getCurrentEvents: function () {
          var resultArray = [];
          var currDate = new Date();
          for (var i = 0; i < this.events.length; i++) {
              var date = new Date(this.events[i].dateEnd);
              if (date >= currDate) {
                  date = new Date(this.events[i].dateStart);
                  if(currDate >= date){
                    resultArray.push(this.events[i]);
                  }
              }
          }
          return resultArray;
      },
      getFutureEvents: function () {
          var resultArray = [];
          var currDate = new Date();
          for (var i = 0; i < this.events.length; i++) {
              var date = new Date(this.events[i].dateStart);
              if(date > currDate){
                  resultArray.push(this.events[i]);
              }

          }
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
