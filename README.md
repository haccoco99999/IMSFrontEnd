#IMSFrontend


# Cac buoc thuc hien khi tao chuong trinh 

1. ```npm init -y``` </br>
2. ```npm i --save electron```</br>
3. Dam bao cau truc file ban dau nhu sau </br>
my-electron-app/ 
├── package.json 
├── main.js 
├── preload.js
└── index.html
</br>
4. Copy cac file tuong ung o website: https://www.electronjs.org/docs/tutorial/quick-start#create-a-basic-application </br>
5. Them dong "start" :"electron ." o file package.json dong scripts </br>
6. ```npm i --save react react-dom``` </br>
7. ```npm i --save-dev @babel/core @babel/preset-env @babel/preset-react css-loader style-loader sass-loader sass webpack webpack-cli electron-reload babel-loader``` </br>
8. Tao file webpack.common.js </br>
9. Them dong "watch": "webpack --config webpack.common.js --watch" o file package.json dong scripts </br>
10.Tao 1 foler theo cau truc sau
my-electron-app/
├── src/
	├── js/
		├── app.js (de trong)
</br>
	
11. ```npm run watch``` ->  tao compile cho react </br>
12. ``` npm install --save-dev @electron-forge/cli ``` </br>
``` npx electron-forge import ``` </br>
13. Khoi dong projet, chay ```npm run watch``` de chay compile xong chay ```npm start```


