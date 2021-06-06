# osa-app

OSA Trace is a single page application being developed using Django Framework to display the graph for OSA Trace
and perform Rest API queries

## Getting Started

##### Technology Used:
1. [Python3](https://www.python.org/)
2. [Django](https://www.djangoproject.com/)
3. [react-bootstrap](https://react-bootstrap.github.io/)
4. [JavaScript](https://www.javascript.com/)
5. [React](https://reactjs.org/)
 

### Prerequisites

To get started working on this project, install Python3 as follows

[Download](https://www.python.org/downloads/) the appropriate installer for your operating system and
run it on your machine.


Install Node.js and npm as follows 

[Download](https://nodejs.org/en/) the appropriate installer for your operating system and
run it on your machine.


##### Creating and Activating Virtual Environment

```
python -m venv path/to/osa_app
source path/to/app/bin/activate # for Mac OS/ Linux
path\to\osa_app\Scripts\Activate.ps1 # for Windows
``` 

### Installing

Firstly, clone [this repository](https://github.com/Mounika-Vannawada/osa-app.git)

```
cd path/to/osa_app
git clone https://github.com/Mounika-Vannawada/osa-app.git
cd osa-app
```

##### Installing the python dependency packages

```
cd backend
pip install -r requirements.txt
```

Start Django server

```
cd osa_server
python manage.py runserver 8090
```

##### Installing the react dependency packages


```
cd frontend/osa_ui
npm install
```

Start the react server

```
npm start
```

Type http://localhost:3000/ in the browser to visit the web application.
