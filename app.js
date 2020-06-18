window.addEventListener('load', () => {
    let lon;
    let lat;
    const locationTimezone = document.querySelector('.location-text');
    const tempDegree = document.querySelector('.temp-degree');
    const tempFeelsLike = document.querySelector('.temp_feels_like');
    const tempMin = document.querySelector('.temp_min');
    const tempMax = document.querySelector('.temp_max');
    const tempDescription = document.querySelector('.temp-description');
    const tempSection = document.querySelector('.temperature');
    const tempSwitch = document.querySelector('.temperature span');
    const tempIcon = document.querySelector('.icon');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const api = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=69f2ae2a98c172993a64cf10dbb1cce1";

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // get data
                const location = data.name;
                const {temp, feels_like, temp_min, temp_max} = data.main;
                const {description} = data.weather[0];
                const icon_code = data.weather[0].id;

                // set DOM elements from API
                locationTimezone.textContent = location;
                tempFeelsLike.textContent = feels_like;
                tempMin.textContent = temp_min;
                tempMax.textContent = temp_max;
                let uppercase = description.charAt(0).toUpperCase() + description.substring(1);
                tempDescription.textContent = uppercase;
                
                // set icon
                let iconHTML = '<i class="wi wi-owm-' + icon_code + '"></i>';
                tempIcon.innerHTML = iconHTML;
                
                // change temperature to celsius/farenheit
                let farenheit = Math.floor(((temp - 273.15) * 9/5) + 32);
                tempDegree.textContent = farenheit;
                tempFeelsLike.textContent = farenheit;
                tempMin.textContent = farenheit;
                tempMax.textContent = farenheit;
                let celcius = (farenheit - 32) * (5 / 9);

                tempSection.addEventListener('click', () => {
                    if (tempSwitch.innerHTML === '<i class="wi wi-fahrenheit"></i>') {
                        tempDegree.textContent = Math.floor(celcius);
                        tempFeelsLike.textContent = Math.floor(celcius);
                        tempMin.textContent = Math.floor(celcius);
                        tempMax.textContent = Math.floor(celcius);
                        tempSwitch.innerHTML = '<i class="wi wi-celsius"></i>';
                        } else {
                        tempSwitch.innerHTML = '<i class="wi wi-fahrenheit"></i>';
                        tempDegree.textContent = farenheit;
                        tempFeelsLike.textContent = farenheit;
                        tempMin.textContent = farenheit;
                        tempMax.textContent = farenheit;
                    };
                });
            });
        });
    }
});
