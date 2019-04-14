# Dius Code Challenge - Shopping Cart System 
This is my take on the code challenge provided [Here](CodeChallenge.md). As this was a technical challenge I will be discussing this in a personal context.

## Design
Most of the design decisions were made to closely replicate a production style environment where a database would be handling
CRUD, and most logic is wrapping around this. The project was built in AirBNB style linting. 

The product catalogue (pricingRules) was the first consideration as this would have to replicate something that could be 
databased such that it would have the product details & specials information in one location, In the end I opted for a 
NoSQL/PostgreSQL json with nested objects pattern. This could easily be accomplished with an SQL flavour using an ORM too.

The second consideration was how would specials be managed in an atomic way. Originally I was thinking of making it so the 
catalogue had the functions embedded into it as its possible for mongo to store functions but that's a pretty terrible idea
as your basically sql-injecting yourself. So I opted for a function flag method that would communicate with a helper system
using deconstructors for case specific information.

Next I created the checkout class and the standardization which I base the rest of the app. Originally as I was trying
replicate database style CRUD, history would be managed in an array however it seemed fine to use an object and ramload this
data as it's very low volume (this dramatically reduced the amount of array lookups required).

Once standardization was accomplished in checkout I extended it to the Specials System; Originally I was thinking of using
class inheritance to manage the connection between checkout & specials however it seemed counter-intuitive compared to a 
simple and more atomic specials helper class. Once all this was established writing the specials was a breeze.

Helpers functions such as round were abstracted into its own file as it didn't seem to have a place inside the context of
the Checkout class (does not require *this*)

## Testing
Used Jest framework to test the classes results and items

I got a little caught up in the wording of `the brand new Super iPad will have a bulk discounted applied, where the price 
will drop to $499.99 each, if someone buys more than 4` originally I thought that it meant that the first 4 were fill price
and the subsequent items are at a discounted price. 

Also the wording `we will bundle in a free VGA adapter free of charge with every MacBook Pro sold` seemed to be saying that
it will be always added ontop, so you could purchase one VGA and a MBP, and have 2 for the price of 1. However if you scan
a VGA to pay then scan a MBP it will make the VGA free.

## Time
This took about 3.5 hours to do, about 2.5 hours of programming & 1 hour of debugging (as I got caught on some wording 
issues).