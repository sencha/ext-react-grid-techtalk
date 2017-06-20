# ExtReact Grid Tech Talk

This application shows you how to use [Redux](http://redux.js.org/) and ExtReact's [Grid](http://docs.sencha.com/extreact/6.5.0/modern/Ext.grid.Grid.html) component to build a multi-faceted search interface. Here we use ExtReact's Ext.data.Store with a REST proxy and implement server-side sorting, filtering, and paging using 
node.js and SQLLite.

## Running

If you have not already, log into Sencha's NPM registry using your trial or support portal credentials:

```
npm login --registry=http://npm.sencha.com --scope=@extjs
```

If you do not have credentials, you can get them by [signing up for a trial of ExtReact](http://sencha.com/extreact).

Then, run the following to build and launch the app:

```
git clone https://github.com/sencha/extjs-reactor.git
cd packages/reactor-rest-example
npm install
npm start
```

You can view the app by pointing your browser to [http://localhost:8082](http://localhost:8082)

## REST API

### GET /employees

Returns an array of employees matching the specified criteria

#### params

#### sort : [{ property, direction }]

An array of objects of the form:

```javascript
[{
    property: 'firstName',
    direction: 'ASC'
}]
```

#### start : number

The first record in the page

#### limit : number

The page size

#### text : string

Filters by lastName and firstName

#### age : [min, max]

A min and max age in array form:

```
[25, 40]
```

#### gender : string

"Male" or "Female"

#### lastName : string

The employee's last name

#### firstName : string

The employee's first name

#### returns

An object of the form:

```javascript
{
    total: 10000,   // the total number of matching results,
    records: [{     // records matching the criteria in the requested page
        id,         // number
        firstName,  // string
        lastName,   // string
        gender,     // string
        age         // number
    }]
}
```