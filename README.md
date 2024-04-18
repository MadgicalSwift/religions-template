# Religious Chatbot Template

Welcome to our guide to building your personalized religious chatbot with our simple template! In this tutorial, we'll walk you through the process of customizing the template to suit your needs and creating your very own religious chatbot. Let's begin!


# Prerequisites
Before you begin, ensure you have met the following requirements:

* Node.js and npm installed
* Nest.js CLI installed (npm install -g @nestjs/cli)
* MySQL database accessible

## Getting Started
### Installation and setup
Before moving on to the development part, let's set up a few things that are needed. Follow the below-mentioned steps
 
* Clone the GitHub repository: Open this GitHub Repo and fork it in your organization. Once you have forked it, clone the repository in your preferred IDE. using this command
git clone "URL" 
Move to the working directory using the cd .\religious-template\ command

* Install the required packages: 
Node.js and npm installed 
Nest.js CLI installed (npm install -g @nestjs/cli)
MySQL database accessible 

* Update Environment Variables: In the cloned repository, you will find a demo .env.text file. Change the file name to .env and add your configuration details, like swift API URL, API key, data_base name, DB_Host, etc.

```bash
API_URL = API_URL
BOT_ID = BOT_ID
API_KEY = API_KEY
DATA_BASE=DATA_BASE
DB_HOST=DB_HOST
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
```
# Webhook URL Setup
Here's a step-by-step guide to get you started smoothly:

 1. ### Sign up for Ngrok: 
Begin by accessing this URL and creating an account on Ngrok. Follow the sign-up process diligently to acquire your authorization token.

 2. ### Configure Ngrok: 
Open your terminal and input the commandngrok config add-authtoken <TOKEN>, replacing <TOKEN> with your authorization token. This step authorizes Ngrok to function properly

 3. Open a new terminal and run this command:
ngrok http 3000. This will generate a forwarding URL. Copy and save this.

 4. Open Postman or any other API platform

 5. Generate a new PUT request and insert the API https://v1-api.swiftchat.ai/api/bots/<bot-id>/webhook-url into the URL field, ensuring to replace <bot-id> with your specific bot ID.

 6. Add the Bearer API-Key in the authorization tab

 7. Add this to the body and send the request. By doing so, the webhook URL will be in the bot for sending and receiving responses.
`{"webhook_url": "<Forwarding URL/religiousChatbot>"}`

 ## Using Cloud Services:
 You can deploy your application on cloud platforms like Heroku, AWS, Google Cloud Platform, Microsoft Azure, or DigitalOcean for easy accessibility and scalability. Here's how you can do it:

  1. Heroku: Sign up for a Heroku account, install the Heroku CLI, and deploy your application using Git or Docker.

  2. AWS (Amazon Web Services): Create an AWS account, navigate to AWS Management Console, choose the appropriate service (e.g., EC2, Elastic Beanstalk), and follow the deployment instructions.

  3. Google Cloud Platform: Sign up for a Google Cloud Platform account, navigate to the Google Cloud Console, create a project, select a compute service (e.g., App Engine, Compute Engine), and deploy your application.

  4. Microsoft Azure: Create a Microsoft Azure account, navigate to the Azure Portal, create a new web app, configure deployment options (e.g., FTP, Git), and deploy your application.

  5. DigitalOcean: Sign up for a DigitalOcean account, create a Droplet (virtual machine), SSH into the Droplet, and deploy your application using your preferred method (e.g., Git, Docker).


# Understanding the Flow
Let's explore the operational flow of the religious chatbot template to understand its functionality and potential customization options:

1. When a user initiates a conversation with a greeting like 'hi', the chatbot warmly welcomes them and presents predefined questions along with options to ask a new question or choose a language. These predefined questions cover various topics related to religion.

2. Upon selecting one of the predefined questions, the chatbot promptly responds with the stored answer and provides two options: 'Back to Main Menu' and 'Ask a New Question'. This allows users to easily navigate back to the main menu or continue exploring by asking more questions.

3. If the user opts to ask a question, the chatbot prompts them to type their question. Once the user submits their question, the chatbot provides a demo response along with the same options: 'Back to Main Menu' and 'Ask a New Question'.

4. Additionally, users have the option to change the language of the chatbot. Upon selecting the 'Change Language' button, the chatbot presents the user with a choice between Hindi and English.

5. When users choose the 'Ask a New Question' button, the functionality mirrors that of the 'Ask a Question' button, allowing users to seamlessly ask additional questions.

6. Lastly, clicking the 'Back to Main Menu' button triggers the chatbot to present the menu button options, enabling users to explore different functionalities and topics within the chatbot.

# Making Modifications
  Now that we've completed the setup phase and made the initial adjustments, let's proceed to the development phase, where you'll have the opportunity to customize your chatbot.

  ## Update strings:
   - Navigate to the cloned repository and locate the i18n folder.
   - Within the i18n folder, you'll find files for English and possibly other languages.
   - Open the English-localized file, which contains all the text strings and button labels used in our chatbot template.
   - Update the strings like the `welcomeMessage`, `askMeResponse`, `questionsDefaultString`, `mainMenuHeading`, `button_categories`.
   - Make similar change in Hindi file

 ## Update buttons:
   - Open the same file within the cloned repository. Look for the section where buttons are defined, typically labeled as `predefinedQuestions`.
   - Within this section, you'll find an array of button objects representing the main menu options which includes some predefined questions and other options.
   - To add or update buttons, simply modify the existing objects or add new ones as needed. Each button object typically includes properties such as type, body (display text), and reply (the message sent back to the bot when the button is clicked).
   - You can customize the button options according to your requirements. For example, you may want to add more predefined questions button remove any.
   - Make similar change in Hindi file

 ## To add or update predefined question buttons and their answers:

  - Open the same file and Locate the `predefinedQuestions` button array within the file.
  - Add or update the predefined questions by modifying the contents of the `predefinedQuestions` array. Each question should be represented as a button object with properties like type, body, and reply.
  - After updating the predefinedQuestions array, make corresponding changes in the `button_categories` list to reflect the updated questions. Each entry in the `button_categories` list should align with the corresponding question in the predefinedQuestions array.
  - Additionally, ensure that the answers to the predefined questions are updated accordingly in the `answer` list. The answers should be arranged in the answers list in the same order as the corresponding questions in the predefinedQuestions array.
  - Make similar change in Hindi file

## AskMeFlow

  - The `swiftchat.service.ts` file contains some functions that handles the flow for asking a new question. Here's how you can update it:

  - `sendAskMeMessage` Function: Update the `sendAskMeMessage` function to fetch and display the prompt for users to ask a new question. This function prompts users to enter their question and sends it to the chatbot for processing.

  - `sendQuestionResponse` Function: Modify the `sendQuestionResponse` function to handle the responses to new questions. After receiving a question from the user, this function fetches a demo response and sends it back to the user.


# All Set!
With the necessary changes implemented, dependencies installed, and webhook URL configured, we're ready to proceed. Let's get started!
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


