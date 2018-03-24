# cycle-hire-app

Prototype like Santander Cycle hire docking stations information and weather correlation

## Objective

1. The web application should be like the Santander Cycle hire docking stations
information and weather correlation ([https://tfl.gov.uk/modes/cycling/santander-cycles](https://tfl.gov.uk/modes/cycling/santander-cycles))
2. There are two types of users, one (user 1) who uses the web app to plan their bicycle journey
3. The other one (user 2) uses this web application to identify performing Santander bicycle dockings and to gain understanding on the correlation between the weather and the usage of the bicycle

Data Source

1. Transport for London API List https://api‐portal.tfl.gov.uk/docs
2. Real time bike and docking station status https://api.tfl.gov.uk/bikepoint
3. Weather data https://openweathermap.org/current#one

## Consideration
In the design of the web application, the following characteristics shall be incorporated:
1. Modularity: It should be composed of microservices such as the change of one component has minimal impact on the other components
2. User Friendliness: The web app should be designed with a good user interface, to provide an easy usage for end users with little to no computer background. It should be easy to go through one function to another
3. Responsiveness: Layout responds to different devices
4. Reusability: Program is designed in a way that most models can be reused
5. Portability: The development made should be highly portable, so it can be easily transferred from one platform to another
6. Cloud: Prototype to be deployed in cloud environment
7. Resiliency: High availability, disaster recovery and back up
8. Security: Access control, authentication, and encryption, etc.
9. Scalability: Options to scale out

## Functionality

Authentication

1. Ability to create a login and use it to authenticate into the web app through single sign‐on mechanisms such as Facebook and Google

Journey Planner

1. Provide Interactive map and include searching function to find nearest available bicycle docking station
2. The journey planner should have an interactive map with all the bicycle docking stations in London
3. Any location can be picked on the interactive map
4. Once the location chosen for "from", the nearest available bicycle docking stations should be suggested on the map (available as a bicycle docking station with a bicycle available to be
used)
5. The user should be able to confirm which nearest docking station s/he wants to use for "from"
6. Once the location chosen for "to", the nearest available bicycle docking stations should be
suggested on the map (available as a bicycle docking station with free space for the bicycle to be parked in)
7. The user should be able to confirm which nearest docking station s/he wants to use for "to"
8. When the user hovers his/her mouse above the station, information about the docking station should be displayed
9. The user should be able to also input the location in a search box
10. Once the location inputted in the box for "from", the nearest available bicycle docking stations should be suggested on the map (available as a bicycle docking station with a bicycle available to be used)
11. The user should be able to confirm which nearest docking station s/he wants to use for "from"
12. Once the location inputted in the box for "from", the nearest available bicycle docking stations should be suggested on the map (available as a bicycle docking station with a bicycle
available to be used)
13. The user should be able to confirm which nearest docking station s/he wants to use for "to"
14. Provide Journey planner function for automatic route planning
15. When both "from" and "to" location are selected by the user, a journey should be suggested and displayed on the interactive map by the app


Dashboard

1. Provide dashboard to analyze London Santander bicycle dockings' usage
2. London bicycle docking station heatmap by usage
3. The user should be able to see in a tooltip the status of the bicycle docking station when the mouse hovers above the station
4. Graph with the top 5 ‐ 10 ‐ 20 docking station in London by usage
5. A dropdown should be provided to select either top 5, top 10 or top 20.
6. Ability to filter the dashboard by date time range to (e.g.: from 1st September 2016 10:00 to 9th December 2017 18:05)
7. Ability to filter the stations in the dashboard by location (district)
8. Ability to filter the dashboard data by station or group of stations
9. Ability to filter by public holiday in London
10. Provide correlation between weather and bicycle usage for marketing promotion decision making
11. Graph displaying the usage of bicycle over time with rainfall
12. Graph displaying the usage of bicycle over time with temperature


## Local developer setup

- `git clone git@github.com:viseo-asia/cycle-hire-app.git`
- `cd cycle-hire-app`
- `yarn start`

## Production deploy to Netlify

- `AUTH0_URL=https://happy-shannon-f6a154.netlify.com yarn build`
- Sign into Viseo Netlify account, drag and drop deploy
