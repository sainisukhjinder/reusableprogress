# Reusable Progress Bar Components with Ractive JS

## Prepare the Environment / Code -- Windows
1. Install node.js from [HERE](https://nodejs.org/en/download)
2. Install git from [HERE](https://git-scm.com/downloads)
3. Run the following command , to install the global gulp:
```npm install -g gulp```
4. Clone the repository
```git clone https://github.com/sainisukhjinder/reusableprogress.git```
```cd reusableprogress```
5. Install the required development dependencies```npm install```
6. Run the following file to build project for production```built.bat```
7. Run the following file to build project for development```built-develop.bat```

## Develop and Build (Unix):
* Open shell in root directory and run ```gulp develop``` command.
* It will build, run the web server and launch the browser.
* If you make any change in the code, it will rebuild it, and also, Refresh the browser to reflect the changes.

## Usage:
* Call the following function to add another progressbar
```html
<script type="text/javascript">
        window.onload = function () {
            createProgressBar(NAME, VALUE, CONTAINER);
         };
</script>
```
## Demo
See [Here](http://sainisukhjinder.github.io/reusableprogress)
