# School-Message-Board
Source code for the message board displayed in the hallway at my school. 

It's too annoying to find free software to do specific things sometimes. For example, the task of getting text onto a screen in a hallway might seem easy, but I wanted to do
advanced things such as dislay the saint of the day every day, which requires web scraping. Such things are probably impossible to do with most free software, so I decided to create
my own message board software. 

This project creates a programmatically generated powerpoint presentation, and then uses powerpoint automation to merge and output the presentation as vidoe. It then uploads the 
generated file to my FTP server, which can be accessed by the Raspberry Pi connected to the display. 

This project uses a modified version of node-office-script which I unfortuantly failed to include in the repository. The original version had the functionality for saving as mp4 
commented out for some reason, so I simply enabled it and re-compiled the module.

If I were to do something similar again, I would probably use an open source alternative to powerpoint, as powerpoint is very difficult to automate, and this project required many hours of resarch.
