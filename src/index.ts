    import { WEATHER_API_KEY, WEATHER_API_URL, WEEK_DAYS, TEMP_MAP } from './constants/constants';
    import '../public/static/styles.css';


    const apiKey = WEATHER_API_KEY;
    const baseUrl = WEATHER_API_URL;
    const days = WEEK_DAYS
    let searchInputValue: string;
    let titleElement: any;
    let cardsContainer: any;
    let weatherData: any = {
        country: '',
        city: '',
        avgTemp: 0,
        text: '',
        icon: '',
    };

    const divId = document.getElementById("nav-footer");

    if (divId != null) {
        divId.replaceWith(creatWeatherContainer());
    } else {
        const weatherContainer = creatWeatherContainer()
        document.body.appendChild(weatherContainer);
        titleElement = weatherContainer.querySelector('.title');
        cardsContainer = weatherContainer.querySelector('.cards');
    }

    const searchInput = document.getElementById('searchInput') as HTMLInputElement;

    function debounce(func: Function, delay: number): Function {
        let timeoutId: any;

        return function (this: any) {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }

    function onSearch(): void {
        searchInputValue = searchInput.value.toLowerCase();
        console.log('User entered:', searchInputValue);
        checkIfUserInsertLocation();
    }

    const debouncedSearch = debounce(onSearch, 300);

    searchInput.addEventListener('input', debouncedSearch as EventListener);

    function getWeatherData(): void {
        const location = searchInputValue;
        console.log("location",location);
        const apiUrl = `${baseUrl}?q=${location}&key=${apiKey}&days=14`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const temperature = data.main?.temp;
                    weatherData.country = data?.location?.country;
                    weatherData.city = data?.location?.region;
                    const forecast = data?.forecast?.forecastday || [];

                    if (titleElement) {
                        titleElement.innerHTML = `Weather Forecast in ${weatherData.city}, ${weatherData.country}`;
                    }
                
                    if (cardsContainer) {
                        cardsContainer.innerHTML = '';
            
                        days.forEach((dayName, index) => {
                        const matchingDays = forecast.filter((day: any) => new Date(day.date).getDay() === index);
            
                            if (matchingDays.length > 0) {
                                const avgTemp = matchingDays.reduce((total: number, day: any) => total + day.day?.avgtemp_c, 0) / matchingDays.length;
                                const weatherInfo = getWeatherDataForTemperature(avgTemp);
                
                                const card = document.createElement('div');
                                card.className = 'card';
                                card.innerHTML = `
                                <div class="card-body border-success mb-3">
                                    <div class="card-header bg-transparent border-success">${dayName}</div>
                                    <div class="card-body text-success">
                                        <p class="card-text">
                                            <div class="card-img"><img src="${weatherInfo.icon}" alt="Weather Icon"></div>
                                            <div class="text">${weatherInfo.text}</div>
                                        </p>
                                    </div>
                                    <div class="card-footer bg-transparent border-success">${avgTemp.toFixed(2)}°C</div>
                                </div>`;
                                cardsContainer.appendChild(card);
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
    }

    function getWeatherDataForTemperature(temp: number): { icon: string; text: string } {
        const tempInfo = TEMP_MAP.find((entry) => temp >= entry.range.min && temp <= entry.range.max);    
        const weatherInfo = tempInfo ? tempInfo.info : { icon: 'question-mark', text: 'Unknown' };
    
        return weatherInfo;
    }
    
    function creatWeatherContainer(): HTMLDivElement {
        const weatherContainer = document.createElement("div");
        weatherContainer.className = "weather-container";
        weatherContainer.innerHTML = `
        <div class ="header">
            <div class="title">Weather Forecast</div>
            <input id="searchInput" type="search" class="form-control rounded" placeholder="Input City or Coordinates..." aria-label="Search"/>
        </div>
        <div class="cards">
            <div class="card"></div>
        </div>
        `;
        titleElement = weatherContainer.querySelector('.title');
        cardsContainer = weatherContainer.querySelector('.cards');
        return weatherContainer;
    }

    function checkIfUserInsertLocation(): void {
        if (!searchInputValue) {
            titleElement.innerHTML = `Loading weather data in your location...`;
    
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    searchInputValue = `${latitude},${longitude}`;
                    getWeatherData();
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            getWeatherData();
        }
    }
    checkIfUserInsertLocation();