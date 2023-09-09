# CSC450 Final Project - Quixel

 ## Description
 In this project we created a crowd sourced local multiplayer web application that measures the current knowledge of the players based on performance indicators. We wanted to create a useful piece of software for educators to easily and accurately gauge their students' ability to recall knowledge for each topic that they are teaching. It could also be used for fun as a trivia app or just to quiz friends/strangers.

 ## How to use the software
 A user can create an account then create, host, or compete in local multiplayer quizzes in order to study a wide range of topics.
 When a user is creating a quiz they can tie topics to each question which allows for Quixel to track the player's performance on the quiz per topic. This would allow for teachers/hosts to be able to test how knowledgeable their students are and be able to teach them more effectively. It could also be used to compete with another user and see who is most knowledgeable in each topic. The players only have 20 seconds to answer each question before the game skips to the next question. After the quiz concludes, Quixel calculates their scores for each category and displays it to the user.
 We used browser sessions to distinguish which user was signed in and then managed the users actions with the locally hosted webserver. We were unable to get multiplayer to work with multiple machines on a local network within our deadline but we were able to get multiple users on one machine to function smoothly.
 
 ## Tech Stack
 We utilized the mongoDB with mongoose, Express.js, React.js, and Node.js to create the application. We used this stack to quickly create the host, player, and server components of the software and easily create APIs that facilitate communication between them.
