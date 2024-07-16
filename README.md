# Todos with Replicache Integration App



## Setup
1. The project is built using YARN package manager
2. Node js Version - 18 and above
3. Built using expo with latest react native version (0.74)
4. Clone the repo `https://github.com/nishanthbhat07/todosapp.git`
5. After cloning, `cd todosapp` and install node_modules by doing `yarn`

###  IOS
1. Once node_modules are installed, we need to install all the pods related to the project. For doing this you can do either of the following:
	a. npx pod-install
	b. `cd ios && pod install && cd..`
2. After installing pods, run the following command to make an IOS build on simulator: `yarn ios`. And also open a new terminal to start the metro server `yarn start`

## Android
1. For build android build, use the following command: `yarn android`. And also open a new terminal to start the metro server `yarn start`


## Libraries Used
- Expo Router - for Screen routing
- React Query -  For API calls
- Typescript
- Replicache
- React Native SSE - For server side event integration for Poking
- Reanimated - for micro animations
- Expo Sqllite - Custom KV Store for replicache


Links: 
[APK]()
[AAB]()