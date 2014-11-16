// Morris.js Charts sample data for SB Admin template

$(function() {
    var lat = $("#location_data").data("lat");
    var lon = $("#location_data").data("long");
    // Area Chart
    function morris_area(payload, xk, yk, lb) {
            // Area Chart
        Morris.Bar({
            element: 'morris-area-chart',
            data: payload,
            xkey: xk,
            ykeys: yk,
            labels: lb,
            pointSize: 2,
            hideHover: 'auto',
            resize: true
        });
    }

    // Donut Chart
    function morris_donut(data) {
        Morris.Donut({
            element: 'morris-donut-chart',
            data: data,
            resize: true
        });
    }

        // Fire off an AJAX request to load the data
      $.ajax({
          type: "GET",
          dataType: 'json',
          url: "https://apis.bbvabancomer.com/datathon/tiles/" + lat + "/" + lon + "/gender_distribution", // This is the URL to the API
          headers: {
             "Accept": "application/json",
             "Content-Type": "application/json",
             "Authorization": "Basic YXBwLmJidmEudGVzdHk6OGI1NjI2MTNmZTI2MWNiMDc3YThmNmQ5ZTlmNWMzY2JlZTIxZTBlNA=="
          },
          data: { date_min: 20140101,
                  date_max: 20140131,
                  group_by: "month"
                } // Passing a parameter to the API to specify number of days
        })
        .done(function( data ) {
          // When the response to the AJAX request comes back render the chart with new data
          //console.log(data.data.stats[0].histogram);
          hist = data.data.stats[0].histogram;
          res = [];
          gender_map = {"M": "Male", "F":"Female"}

          hist.forEach(function(entry) {
            res.push({label: gender_map[entry.gender], value: entry.num_payments})
          });
          //console.log(res);
          morris_donut(res);

        })
        .fail(function() {
          // If there is no communication between the server, show an error
          console.log( "error occured" );
        });
      $.ajax({
          type: "GET",
          dataType: 'json',
          url: 'https://apis.bbvabancomer.com/datathon/tiles/19.285/-99.175/payment_distribution',
          //url: "https://apis.bbvabancomer.com/datathon/tiles/" + lat + "/" + lon + "/payment_distribution", // This is the URL to the API
          headers: {
             "Accept": "application/json",
             "Content-Type": "application/json",
             "Authorization": "Basic YXBwLmJidmEudGVzdHk6OGI1NjI2MTNmZTI2MWNiMDc3YThmNmQ5ZTlmNWMzY2JlZTIxZTBlNA=="
          },
          data: { date_min: 20131101,
                  date_max: 20140331,
                  group_by: "month"
                } // Passing a parameter to the API to specify number of days
        })
        .done(function( data ) {
          stats = data.data.stats;
          res = [];
          yk = [];
          stats.forEach(function (entry) {
            res_entry = {};
            res_entry.date = entry.date;
            hist = entry.histogram;

            for(var i=hist.length-1; i > hist.length-3; i--) {
                range = hist[i];

                res_entry[String(range.amounts)] = range.num_payments;
                yk.push(range.amounts);

            }
            console.log(res_entry);
            res.push(res_entry);
          });
          console.log(yk);
          morris_area(res, 'date', yk, yk);
        })
        .fail(function() {
          // If there is no communication between the server, show an error
          console.log( "error occured" );
        });


    function morris_bar(payload, xk, yk, lb) {

        Morris.Bar({
            element: 'morris-bar-chart',
            data: payload,
            xkey: 'date',
            ykeys: yk,
            labels: lb,
            ykeys: ['mx_health', 'mx_barsandresturants', 'mx_constructionmaterials', 'mx_education', 'mx_home' , 'mx_services', 'mx_office'],
            labels: ['Health', 'Resturants/Bars', 'Construction', 'Education', 'Home', 'Services', 'Office'],
            barRatio: 0.4,
            xLabelAngle: 35,
            hideHover: 'auto',
            resize: true
        });
    }


    $.ajax({
          type: "GET",
          dataType: 'json',
          url: 'https://apis.bbvabancomer.com/datathon/tiles/19.285/-99.175/category_distribution',
          //url: "https://apis.bbvabancomer.com/datathon/tiles/19.285/-99.175/payment_distribution", // This is the URL to the API
          //url: "https://apis.bbvabancomer.com/datathon/tiles/" + lat + "/" + lon + "/payment_distribution", // This is the URL to the API
          headers: {
             "Accept": "application/json",
             "Content-Type": "application/json",
             "Authorization": "Basic YXBwLmJidmEudGVzdHk6OGI1NjI2MTNmZTI2MWNiMDc3YThmNmQ5ZTlmNWMzY2JlZTIxZTBlNA=="
          },
          data: { date_min: 20131101,
                  date_max: 20140331,
                  group_by: "month"
                } // Passing a parameter to the API to specify number of days
        })
        .done(function( data ) {
          stats = data.data.stats;
          res = [];
          yk = ['mx_health', 'mx_barsandresturants', 'mx_constructionmaterials', 'mx_education', 'mx_home' , 'mx_services', 'mx_office'];
          stats.forEach(function (entry) {
            res_entry = {};
            res_entry.date = entry.date;
            hist = entry.histogram;

            for(var i=hist.length-1; i > 0; i--) {
                range = hist[i];

                res_entry[String(range.label)] = range.num_payments;
                yk.push(range.label);

            }
            res.push(res_entry);
          });
          morris_bar(res, 'date', yk, yk);
        })
        .fail(function() {
          // If there is no communication between the server, show an error
          console.log( "error occured" );
        });
});
