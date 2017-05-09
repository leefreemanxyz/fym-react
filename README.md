This is the repository for the front-end of my final individual assignment for the Codaisseur academy. The task was to create an application that would allow teachers to assign students to pairs at random. Students could not be paired together again until they had been paired with all other students in their batch.

I intend to get a live demo up and running to save people visiting this project some hassle. If you really can't wait, then you'll also need to [grab the back-end](https://github.com/leefreemanxyz/pairs-api), and get that up and running with a mongoDB database. Create some users and make one of them an admin. Then clone and run this repository and start putting students into batches.

To complete this task, I used React and Redux connecting to a FeathersJS back-end over web sockets. A teacher/admin can add/remove students to/from 'batches'. If a batch has an even number of students in it, it will be possible to generate a complete set of pairs of students. The teacher/admin has the option of which set of pairs to publish each day. The pairs are generated using a simple round-robin algorithm. 

Here are the user stories:

> We would like to have an easy way to randomly assign teams of 2 people on a daily basis
during the next Academy.

> ### Admins (Teachers & Staff)
> - As an Admin, I need to sign in before having access to any page in the application.
> - As an Admin, I have an overview of the pairs/couples for each day.
> - As an Admin, I can auto-generate pairs/couples for a specific day.
> - As an Admin, I can see a list of all Users of the application and with a single click of a
button promote a User to Admin, or demote a User to Student.

> ### Students
> - As a Student, I need to to sign up/register.
> - As a Student, I need to sign in before having access to any page in the application.
> - As a Student, after signing in, I can see my "match" for the current day. My "match" is
calculated randomly among all the registered Students until that moment.
> - As a Student, I am matched to another Student, but only once each day.
> - As a Student I can see my matches for the past days, but not for future days.

> ### About the Matching Algorithm
> Pairs/couples are calculated randomly, but a Student is not matched with the same person twice
until he/she has been matched with all the registered Students until that moment.

I also completed the following 'bonus' stories:

> - As an Admin, I can make Classes with a name, start date, and end date.
> - As an Admin, I can assign Students to Classes.
