#Constructors in CanJS
Before we work with any of the objects in CanJS, it will be helpful for us if we understand can.Construct. Most of the objects in CanJS are derived from can.Construct. can.Construct provides a way to easily use the power of prototypal inheritance without worrying about hooking up all the particulars yourself.

Without going into exhaustive detail[^ConstructDetail], can.Construct contains a few methods we'll encounter frequently in other objects:

[^ConstructDetail]: If you want to go into exhaustive detail on can.Construct, you can consult the [CanJS docs](http://canjs.com/docs/can.Construct.prototype.init.html).

- Prototype
	- init
- Static
	- extend

We'll look at the extend method first.

##The extend method
can.Construct's "extend" method is used to create "constructor functions". Constructor functions are used to create instances of objects. The extend method can take up to three arguments:

1. name: string
2. staticProperties: object
3. instanceProperties: object

The extend method behaves differently depending on the number of arguments you pass to it. The name and staticProperties arugments are optional. And the behavior of the method changes in inverse order to the number of arguments. For example, if you pass it one argument, it must be the instanceProperties argument. If you pass it two arguments, it must by instanceProperties and staticProperties. Name can only be meaningfully passed in when there are three arguments.

If I only want to pass in staticProperties, I must call the method as follows:

	can.Construct.extend({
    	//Static properties here
    },
     //Blank object as second parameter
     {});

This pattern will apply to all objects in CanJS that have an extend method.

##The init method
The init method is called whenever a new instance of a can.Construct is created. Init is where the bulk of your initialization code should go. Inside of the init function, the `this` keyword will refer to the new instance, and`this` will contains the arguments passed to the constructor. A common thing to do in init is save the arguments passed into the constructor. An example is below:

    var Person = can.Construct.extend({
        init: function(first, last) {
        	this.first = first;
        	this.last = last;
    	}
    });

    var actor = new Person("Abe", "Vigoda");

#First can.Component <a name="first-component"></a>
If you recall from the introduction, a can.Component is a little bit like a self-contained, mini web application. Because can.Components are encapsulated entities, ideally they each contain their own:

- View template
- JS
- CSS

This is why we created a components folder for our app---instead of, say, a JS folder. Each component we develop will be in a folder that also stores all the files that support that component. This makes components portable, enabling you to reuse them across projects. It also isolates them, making them easier to test and maintain.

In the components folder, create a subfolder called "restaurant_list". Inside that, create the following files:

- restaurant_list_component.js
- restaurant_list.stache

Put the following code inside restaurant_list_component.js:

	/**
     * @namespace RestaurantListComponent
     */
    can.Component.extend({

        tag: 'restaurant-list',
        template: can.view('components/restaurant_list/restaurant_list.stache'),
        scope: {
                currentRestaurant: 'Hello Restaurant Customer'
        }

    });

Add the following code to restaurant_list.stache:

	<div>{{currentRestaurant}}</div>

Add the code below to the /app/base_template.stache file:

	<restaurant-list></restaurant-list>

Next, open up your app.js file, and edit it as follows:

	$(function () {

        $('#can-app').html(can.view('base_template.stache', {}));

    });

For the moment, if you don't know what can.view does, don't worry. We'll go over it in detail soon.

Finally, we need to add a reference to restaurant_list_component.js in the index.html file, as follows:

	<script src="libs/can.custom.js"></script>
      <!--Begin add-->
      <script src="components/restaurant_list/restaurant_list_component.js"></script>
      <!--End add-->
    <script src="app.js"></script>

Now, go back out to your app in the browser, and refresh it. You should see it printing: "Hello Restaurant Customer".

##Auto Instantiation

If you recall from the discussion above regarding can.Construct, whenever you declare an object using can.Construct it must be instantiated. Normally, you would either directly instantiate objects using the `new` keyword, or pass the constructor to an object that would create instances of it. can.Component is a bit of an exception.

All we have to do is declare the can.Component using its extend method.  Once you declare your can.Component, you've registered your component with the system. When CanJS parses the base_template.stache file, and encounters the restaurant-list tag, it will automatically instantiate the can.Component associated with it, do the work of generating the Component's view inside of its custom tag, and binding that view to your component's scope.

Let's look at an image that describes how all of this works, to make it clearer:

![](images/ComponentLoadCycle.png)

##Basic Anatomy of a can.Component
Now that we have a simple, working can.Component, let's look at it in more detail. The can.Component we created above had three properties.

- tag,
- template, and
- scope

###The "tag" Property
The can.Component's tag property associates that can.Component with a specific, custom HTML tag:

![](images/ComponentTagLinkDiagram.png)

As mentioned above, when the template containing the can.Component's tag is parsed, the can.Component is instantiated, and the contents of its rendered template are inserted as the HTML contents of the custom tag:

![](images/ComponentTagRenderedHTML.png)

###Template
The template property of the can.Component contains the string value of the can.Component's template. Note that the template property just contains a string value. You can inline the template, if it is small. However, the recommended way of working with templates, to maintain separation of concerns, is to keep them in their own files and load them using can.view, as we have done here.

###Scope
The scope object is the can.Component's view model. The view model is an abstraction of the view that exposes public properties and functions. Any property or method defined on the scope object is available from the can.Component's template as either a Stache data key, or a function. In our example above, we created a property, "currentRestaurant", and then referenced it as a Stache data key in our template.

![](images/ComponentScopeTemplateLink.png)

The scope is a special type of object, called a "can.Map". can.Map objects are observable. Observable objects provide a way for you to listen for and keep track of changes to them. What this means, practically, is that if you make a change to your scope, those changes will be reflected automatically in your template. We'll see how this works in the next chapter.