# Application Name
Baas Accounts

# Application Version
3.0.0

# Description
Baas Accounts is a Built In Application of Baas 360 framework. This Application is used to involves financial data management, analysis, aiming to streamline financial processes or ensure compliance with accounting and regulatory standards. 

# Features
> Currently realeased  features:
* Invoice Management
* Product MAnagement
* Customer Management
 
# Commands
Please use this below commands to clone the code 
> Make sure to replace the develop branch with your feature branch name

```yml
git clone -b develop https://goveindia@dev.azure.com/goveindia/Baas-360/_git/BAAS-APP-STORE-WEB-CLIENT
```

To install the required NPM packages run the following command
```yml
npm install
```

To run the application run the following command
```yml
npm run local
```

To build the application use the following command
```yml
npm run build
```

# Usage
Baas Accounts will be used to manage their organization's accounts details.

# Configuration

- Add `appstore.yml` to the root directory of your next js project and place the following contents in it.
  This contains all the configuration which identifies the service in the platform

```yml
PLATFORM:
    # Binding the platform on top of which service is going to run in Dev Server
    Accounts_GATEWAY_URL: "http://dev1.baas360.alitasys.com:4004"

    # Binding the platform on top of which service is going to run in QA Server
    Accounts_GATEWAY_URL: "http://qa1.baas360.alitasys.com:4004"

    # Credentials to access that specific instance
    Accounts_USERNAME: "QP0192923232LD"
    Accounts_PASSWORD: "927NBGJJ0283HKA74782"

INSTANCE:
    # Unique key which was generated and provided to the instance
    INSTANCE_KEY: "89c1a55b-76bd-4a31-820e-fa1c98c7cd0c"

CONNECTOR:
    # Unique code provided for connector type which is used by this service
    CONNECTOR_TYPE: "BAAS-AUTHGATEWAY"
    # Tenant key of the connector which means this service can only interact with this tenant
    CONNECTOR_URL: "http://209.12.79.113:4003"

SERVICE:
    # Unique key which was generated and provided to the service
    SERVICE_KEY: "SERVICE-KEY"
    # Currently available launchers 'NODEMON' / 'DOCKER'
    SERVICE_LAUNCHER: "NODEMON"
```

# Contributing
> The major contribution to this project is follows. 
* Next JS
* React JS

# Contact

| Name | Role  | Email  |
| ---- | ----- | ------ |
| Dinesh | Architect | dineshpandian@gove.co |
| Senthil Kumar | Architect | senthilkumar@gove.co |
| Petchi Kumar | Scrum Master | arumugam.petchikumar@gove.co |
| Uma Kohila | Developer | uma.kohila@gove.co |
| Ayerthammal | Developer | ayerathammal.paramasivan@gove.co |
| Pradeepa | Developer | pradeepa.sekar@gove.co |
| VenuGopal | Developer | venugopal.annamailai@gove.co
| Hari Prakash | Developer | hari.prakash@gove.co |
| Sreedhar | Developer | sreedhar@gove.co |
| Muthu Mariappan | Developer | muthumariappan.ganapathi@gove.co |
| Diviya | Test Engineer | diviya.rathinamoorthi@gove.co |
| Ram Prakash | Test Engineer | ram.prakash@gove.co |
| Arun Babu | Test Engineer | arunbabu@gove.co |




# Release History

| Release Version | Feature  | Date  | Environment  |
| ---- | ----- | ------ |------ |
| 2.0.0 | Invoice Management, Product Management, Customer Management | 25 Oct, 2023 | QA |
| 3.0.0 | Product , Catrgory , Pricelist , Store , Invoice status Life cycle , Package | 17 Nov, 2023 | QA
