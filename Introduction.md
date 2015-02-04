#Getting Started with CanJS using Node, Gulp, and Browserify <a name="Introduction"></a>
*Better Apps, Faster*

CanJS is a lightweight, modern JavaScript MVVM framework that’s fast and easy to use, while remaining robust and extensible enough to power some of the most trafficked websites in the world. To see just how simple it is to get an application up and running in CanJS, we'll develop one together using Node, Gulp, and Browserify.

##The Basics
Every CanJS application contains: Models, Views, Components, Application State, and Routing.

###Application State <a name="app-state"></a>
One of the things that sets CanJS apart from other frameworks is its use of the Application State. An Application State is an observable object that, as its name implies, contains the state of your application. Where other application frameworks model their applications with routes, controllers, &c., CanJS takes a more unified, semantic approach. It encapsulates your application in an object. This is a pretty powerful approach to writing applications---freeing developers from many of the semantic constraints of a DOM dominated paradigm to think more directly about the application itself.

###Models
Models manage the data of an application. A model notifies the elements associated with it when its state has changed. In CanJS this is the can.Model object. can.Model handles all of your CRUD operations (Create, Read, Update, and Delete).

###Views
Views request information from the model, and use the data it provides to generate output, in our case HTML. In CanJS views are created using:

1. View Templates, 
2. The can.view object

The view template can be plain HTML, or it can utilize a template library to provide it with more functionality. Most of the time, your views will work with a template library. CanJs supports several JS template libraries, including:

- Stache
- Mustache
- EJS

While you can use any of the above template types, the preferred type is "Stache". It provides the most clarity to your code, and is the easiest of the three options to use. At this time, Stache is supplied as a supporting library. This means you must explicitly add it to your application. In future releases of CanJS, Stache will be available as a part of the CanJS lib. 

Template libraries require a rendering engine, and CanJS provides that to you with the can.view object. To quote the CanJS docs: A can.view contains utilities "for loading, processing, rendering, and live-updating of templates". 

###Components
A can.Component is kind of like a mini web application. A can.Component contains the CSS, JavaScript, and HTML it needs---all wrapped up in a single, functional unit. This makes can.Components portable, reusable, and encapsulated. can.Components are easy to test, and easy to use. Building an application with them is kind of like building with Legos (TM): You build the components you need to create your site, and you link them all together using the [Application State](#app-state) and [Routing](#routing).

###Routing <a name="routing"></a>
For many JS MV* frameworks, routing divides an application into logical views and binds those view to Controllers. *This is not how things work in CanJS*. Routing in CanJS has nothing to do with binding views to Controllers. Rather, it has to do with [Application State](#app-state). In brief, CanJS maintains a reciprocal relationship between an application's route, and its state. In other words, if you change the state of an application, your route will change. If you change your route, your application's state will change. 

If you think about this, it's pretty powerful. For example, you can recreate a specific state in your application from any point, just by accessing a specific route. If this doesn't make sense right now, don't worry. As we develop our application together, you'll see, more and more, just how powerful this aspect of CanJS is.
