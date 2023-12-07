<img width="1512" alt="Screen Shot 2023-12-07 at 18 45 25" src="https://github.com/noyittah/Weather-Forecast/assets/74644378/5946a5b5-da6d-4673-9d8a-21c747421010"># Weather-Forecast

1. Clone "Weather-Forecast" project to your local environment.
2. In "static" folder -> create new folder "bundle".
3. Run the following in your projects root directory:
    -npm install webpack webpack-cli
    -npm install typescript ts-loader 
    -Npm start 
4. Script.js file should be generated in bundle.
5. Download “Custom JavaScript for Websites 2” extension to your chrome browser(https://chromewebstore.google.com/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk).
6. Add extension for the project:
    -go to chrome://extensions/.
    - click onload unpacked button.
    -choose your directory folder of the project.
    -"Weather-Forecast" extension should creat.
    -ensure that your new extension is turn on.
7. Navigate to "Weather-Forecast" extension and reload it.
8. Navigate to following websites and see that the script injected:
  -https://risecodes.com/
  -https://stackoverflow.com/
  -https://developer.mozilla.org
  -https://github.com/

* You can inject the script to other sites by adding the website address to "manifest.json" file -> add your site to "matches" array.
* You can modify the div id that responsible how to inject the script -> constants folder -> "constants.ts" -> modify DIV_ID.

![Uploading Screen Shot 2023-12-07 at 18.45.38.png…]()
<img width="1511" alt="Screen Shot 2023-12-07 at 18 46 03" src="https://github.com/noyittah/Weather-Forecast/assets/74644378/2636e6aa-0223-49ec-a3fe-52f2a179dd45">
