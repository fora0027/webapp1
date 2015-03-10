var app = {
        name: "Ross Foran",
        version: "1.0.0",
        pages: [],
        init: function () {
            document.addEventListener("DOMContentLoaded", this.domReady);
            document.addEventListener("deviceready", this.deviceReady);
        },
  deviceReady: function () {
        
        },
        domReady: function () {
            
            app.pages.push(document.getElementById("location"));
            app.pages.push(document.getElementById("home"));
            app.pages.push(document.getElementById("contact"));
      
            var buttonLocation = document.querySelector(".leftButton");
            var buttonHome = document.querySelector(".middleButton");
            var buttonContact = document.querySelector(".rightButton");
      
            buttonHome.addEventListener("click", function () {
                app.pages[0].className = "";
                app.pages[1].className = "active";
                app.pages[2].className = "";
        
    }); 
    buttonLocation.addEventListener("click", function () {
                app.pages[0].className = "active";
                app.pages[1].className = "";
                app.pages[2].className = "";
        
                if (navigator.geolocation) {
                    var params = {enableHighAccuracy: true, timeout: 36000, maximumAge: 0};
                    navigator.geolocation.getCurrentPosition(watchPosition, gpsError, params);
                }
                      else {console.log("Your Device does not Support Geolocation"); }

                function watchPosition(position) {
    
                    var locationDiv = document.querySelector(".locationCanvasDiv");
                    locationDiv.innerHTML = "<div class='latAndLong'>" + "Latitude: " + position.coords.latitude + "&deg;<br/>"
                        + "Longitude: " + position.coords.longitude + "&deg;<br/>" + "</div";
    
    var locationImg = document.querySelector(".mapImg");
    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    locationImg.setAttribute("width", "300px");
                    locationImg.setAttribute("height", "300px");
                    locationImg.setAttribute("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=14&size=300x300");
    
                }
            function gpsError(error) {
                    var errors = {
                            1: 'You need to enable location services for our app in settings',
                            2: 'We were unable to determine your position.',
                            3: 'It took too long to find your position.'
  };
    console.log("Error: " + errors[error.code]);
} 
        });
  buttonContact.addEventListener("click", function() { 
                app.pages[0].className = "";
                app.pages[1].className = "";
                app.pages[2].className = "active";
                fetchContact();
            }); 

   function fetchContact(){  
     
            var options = new ContactFindOptions();
                options.filter = '';
                options.multiple = true;
                var filter = ['displayName', 'phoneNumbers'];
                navigator.contacts.find(filter, success, err, options);
       
        function success(matches) {
                    minimum = 0;
                    maximum = matches.length - 1;
                    contact = Math.round(Math.random()* maximum);
                    
                    var contactsContainer = document.querySelector('.contactDiv');
                        
                    var name = '<p class="contactName">' + 'Name: ' + matches[contact].name.formatted + '<br><br>' + matches[contact].phoneNumbers[0].type + ': ' + matches[contact].phoneNumbers[0].value + '</p>';
        
                    contactsContainer.innerHTML = name;
                    }
           
            function err() {
                alert('Could not Access Contacts');
            }
        }
} 
}
        
app.init();
    


        