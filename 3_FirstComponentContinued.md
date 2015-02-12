# Diving Deeper into can.Component <a name="more-component"></a>
Now that we know how to create a basic can.Component, let's look at making the Component a bit more useable. Let's build out the can.Component's template.

##Stache Templates
As mentioned previously, we're using Stache templates in our app. Remember that when we downloaded our custom build of CanJS, we included the can.stache plugin [^can.stache]. The CanJS docs tell us that, "Stache templates look similar to normal HTML, except they contain *keys* for inserting data into the template, and *Sections* to *enumerate and/or filter* the enclosed template blocks."

[^can.stache]: In future releases of CanJS, 3.0 and above, the can.stache plugin will be included in the core CanJS library.

There are four aspects of Stache templates, mentioned above, that we'll review:

- keys,
- sections,
- enumerate and
- filter

It will be easiest for us to look at these with an example, so let's create one. Open up your /components/restaurant_list/restaurant_list.stache file. Edit it, as follows:

	<label for="RestaurantList">Select a Restaurant:</label>
    	<select id="RestaurantList">
        	<option value="-1"></option>
        	{{#each restaurants}}
        	<option {{data 'restaurant'}}>{{name}}</option>
        	{{/each}}
    </select>

    {{#currentRestaurant}}
    <div id="CurrentRestaurant">

        <h3 id="RestaurantName">{{name}}</h3>
        <ul id="RestaurantDetails">
            <li>Location: {{location}}</li>
            <li>Cuisine: {{cuisine}}</li>
            <li>Owner: {{owner}}</li>
        </ul>
    </div>

    <button id="PlaceAnOrder">Place an Order from {{name}}</button>
    {{/currentRestaurant}}

Stache templates support both [Mustache](https://github.com/janl/mustache.js/) and [Handlebar](http://handlebarsjs.com/) template formats. For more information on the details of these formats, see the respective websites.

###Keys
The keys in the Stache template are the text portions bounded by curly braces, e.g., {{*my-text*}}.

You may have noticed a special key in the option tag. It looked like this:

	<option {{data 'restaurant'}}>{{name}}</option>

This is a data key. In brief, the data key allows you to access the data you assign it using jQuery's [$.data()](http://api.jquery.com/data/) method. In the example above, we're assigning individual restaurant objects to the option tag, as we [enumerate](#stache-enumeration) the collection of restaurants.

###Enumeration <a name="stache-enumeration"></a>
Enumerating means that you can loop through the contents of an iterable item. We've done this above for the options in our select dropdown. 

###Filtering
Filtering allows you to display selective data. Given an array of people, for example, you can display all of the people whose first names begin with the letter "A". We won't explore filtering, right now, as that's a more advanced feature. 

###Sections
Finally, the "Sections" referred to in the quote are execution blocks---they define an object context within which we can work with an object and its properties. Including a Section in a template reduces the amount of typing you are required to do, and reduces the possibility for error as well. The example above contains a Section, the "MenuText" section. Sections begin with {{#...}} and end with {{/...}}. 

The Section key should map to an object. All of the keys contained in the Section object can be referenced without having to use dot notation. If we hadn't used a Section, for example, we would have had to write {{MenuText.Restaurants}} for our key. Because we used a section, however, we only have to write {{Restaurants}}, and Stache does the rest for us. 

##Event Handling

Event handling is defined in two places:

1. The view template
2. The can.Component scope

Let's work with an example. You can add event handling to any element in the template by adding an attribute with the event name prefixed by "can-". Going back to the restaurant_list.stache file, edit the select tag, as follows:

	<select id="RestaurantList" can-change="restaurantSelected">

We added an onChange event by adding the "can-change" attribute to the select tag. The value of that attribute maps to a property on the can.Component's scope.

Open up restaurant_list_component.js, and modify the scope as follows:

    scope: {
        restaurants: [{name: 'First'}, {name: 'Second'}, {name: 'Third'}],
        currentRestaurant: undefined,
        restaurantSelected: function(){
            alert("You've selected a restaurant");
        }
    }

In that modification, we added properties that map to all of the data keys and event handlers we defined in our Stache template.

![](images/3_first_continued/MapOfScopeToTemplate.png)

Go back out to the application in your browser, and refresh the page. You should see something like this:

![](images/3_first_continued/SelectARestaurant.png)

When you select an option from the dropdown, and the select's change event is fired, you should see:

![](images/3_first_continued/SelectARestaurantChangeEvent.png)

You can place as many event handlers as you need on an element. If we wanted to add a mousedown event handler, all we would have to do is edit the select element in our template as follows:

	<select id="RestaurantList" can-change="restaurantSelected" can-mousedown="handleMouseDown">

And, then add the appropriate event handler to our scope.

##Getting and Setting Scope Properties
Now that you know how to handle events in your code, it's important to understand how to get and set the properties of the scope. Getting and setting are done through the "attr" method off of the "this" keyword. Let's look at an example.

Open up restaurant_list_component.js, and modify the scope's restaurantSelected property as follows:

	restaurantSelected: function(viewModel, select){
            var selectedRestaurant = select.find('option:checked').data('restaurant');
            var currentRestaurant = 'currentRestaurant';
            this.attr(currentRestaurant, selectedRestaurant);
            alert(this.attr(currentRestaurant).name);
        }

The first line of the function uses the jQuery $.data() method we referred to earlier to get a reference to the selected restaurant object. The third line sets the currentRestaurant property of the scope to reference the selectedRestaurant. The last line gets a reference to the currentRestaurant property of the scope, and accesses the "name" property of the restaurant object it references.

Go out to the web application, and refresh your page; you'll notice a few things.

First, when you select a restaurant from the list, you should see an alert box, as follows:

![](images/3_first_continued/GetterSetterAlertBox.png)

Next, you'll notice that when you select a restaurant from the list, the following appears below your restaurant select element.

![](images/3_first_continued/RestaurantDetailsFirstDisplay.png)

We set up the display of the current restaurant section earlier in the template. The default value for currentRestaurant, when the RestaurantListComponent is first loaded is 'undefined'. Setting the value to 'undefined' causes the Stache template to remove it from the DOM. As soon as we set currentRestaurant to a valid value, the scope, which is an observable can.Map, broadcasts this change, and the template refreshes automatically, rendering the current restaurant section.

##View Models
It's considered a best practice to keep your can.Components thin. This helps maintain readability, and maintainability. One of the ways to accomplish this is to extract your scope from the can.Component, into a distinct View Model object. We do this by creating a can.Map.

Open up restaurant_list_component.js, and add the following code:

	var RestaurantListViewModel = can.Map.extend({
        restaurants: [{name: 'First'}, {name: 'Second'}, {name: 'Third'}],
        currentRestaurant: undefined,
        restaurantSelected: function (viewModel, select) {
            var restaurant = select.find('option:checked').data('restaurant');
            var currentRestaurant = 'currentRestaurant';
            this.attr(currentRestaurant, restaurant);
        }
	});


We assign the can.Map we created to the scope of the Restaurant List can.Component, as follows:

	can.Component.extend({
    	tag: 'restaurant-list',
    	template: can.view('components/restaurant_list/restaurant_list.stache'),
    	scope: RestaurantListViewModel
	});


If you go back out to your application, and refresh the page, it should all look and work the same (though, we removed the alert). What we've done, by separating out the view model, is make the code easier to read and maintain.

In the next chapter, we'll learn about working with more realistic data by adding REST service interaction with can.Model.