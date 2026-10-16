This application is built for class project using a MERN stack.  

In backend/server.js there is a START_FRONTEND Boolean flag to enable split debugging of the front end and backend.  

If running split, I used the batch files to fire things up quickly without using command line windows since they added mouse clicks and wasted time.  Their text is below.  

In root folder, create a text file StartFront.bat
    ::StartFront.bat
      echo on
      cd "Insert your folder here"
      cd client
      npm run dev
      set /p id=Enter to Exit:
      
In the root folder, create a text file StartServer.bat.  This transpiles the front end using the top 3 lines and runs the backend.  Can be used to start everything or run split.  
    ::StartServer.bat
    echo on
    cd ".\client"
    npm run build
    cd "..\backend"
    npm run dev
    @pause
    set /p id=Enter to Exit:

Debugging on heroku, this will keep a continuous log running and stream to running.txt in the current folder.  Came in really handy since their log windows are timing and I like to pull them into in Excel.     
echo Running Heroku logs...
heroku logs --tail --app YourAppNameThere > heroku-logs running.txt
pause


Environmental Variables

# Express Server Port
PORT=5000

# Server
MONGO_URI=MongoConnectionString.
#MONGO_PORT=

PASSWORD_PEPPER=This is your password salt

Database user
Yogi_DB_Root=

# Frontend
CLIENT_URL=
#add below to heroku since this is for the emails and the modules are untested since these are paid services.   
NOTIFICATION_MODE=simulation    

SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=



Runs on localhost port 5173 or local host 5000 if you start the front end automatically.  

Dependancies.
Backend or Server
    Node, Cors, dotenv, express and bycrpyt
Client or Front end
    Node
    Vite
    Babel is a reference I didn't remove because I planned to experiment with it later.  It's depreciated at this time though.
    React



As a long time C++/C# desktop and occasional PhP programmer within an isolated network, these new frameworks are quite frustrating.  

Feel free to copy, borrow or steal from this.  Its software, stealing is a compliment.  :-)

Code is running here but not sure for how long since the semester is over as of 10.16.2026.  
https://yogitrack-jcox-fdb12890558c.herokuapp.com/Login)
Everything is protected by login except the schedule.  Drop me a message if you want a password.  



This is what happens when a 54 year old engineer returns to school after being away for a few decades.  

What follows is an epic tale of this semester, 

In the age of endless errors and cursed frameworks, when
kingdoms of heaven and earth trembled in fear before the
tyranny of the evil beast React, there
arose a legendary warrior known as  Mighty Coyote.

With his sword, Geezer Power,
forged from decades of stubborn determination,
Mighty Coyote marched fearlessly into the
dreaded Maze of Components, determined to
outlast any framework foolishness.

There he confronted React, a monstrous beast of
a thousand hooks, infinite dependencies, and
the terrifying power to render chaos upon the known universe, even Marvel's.

After an epic battle of 49 days and nights,
Mighty Coyote unleashed the legendary power of
    Semester Over!, piercing
React's mind numbing heart and silencing the infernal
error messages forever.

React's treacherous minion, Xybook,
master of impossible assignments, cryptic
instructions, and merciless automated grading,
attempted to flee, but Mighty Coyote raised Geezer Power high
and thundered:

    "BEGONE, FOUL BEAST! YOUR TRICKS AND ERROR
    MESSAGES SHALL TORMENT ME NO MORE!"

With one mighty swing, he banished Xybook to
the deepest pits of the Underworld, where Hades
condemned the monster to endlessly repair its exasperating
sandboxes and print functions without subscription fees.

Peace returned to the earth and the console
fell silent.  Assignments lay where they were vanquished,
the heavens and earth rejoiced.
The Mighty Coyote standing victorious...

And so, he returned triumphantly to his domain, Geezer Power still
gleaming from battle.

And yet..., 
    awaiting upon her royal throne, sat his beautiful Annoyed Queen, 
    with golden hair shimering beneath her crown and arms crossed in perpetual
    irritation.

    With a mighty proclamation, she declared the commencement of Honey-Do!

    And presented her champion with an enchanted scroll of
    countless domestic horrors.

Mighty Coyote gazed upon this endless list of catastrophes and vowed with 
all his might to answer Annoyed Queen's challenge. 

Undaunted, he raised Geezer Power toward the heavens...
and went to Home Depot with his loyal companions, Silverado and Visa.


To the ends of the earth, the bards proclaim...

"FEAR NOT THE YEARS, FOR GEEZER POWER SHALL ALWAYS PREVAIL!
BUT NOTHING CAN DEFEAT THE HONEY-DO!"

'Tis a tale Told by an idiot, full of sound and fury, Signifying nothing.
BEHOLD THE POWER OF GEEZER!
                    
