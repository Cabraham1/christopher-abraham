# MoneyBox-web-app

# TEAM VANGUARD (GROUP 4)
# CODE REQUIREMENTS AND RULES FOR THE IMPLIMENTATION OF MONEYBOX WEB APPLICATION PROJECT
# 1.0 PURPOSE
This document is specifically for the team and collaborators of MoneyBox web application. This document will establish the standards and set rules for developers to strictly follow during the implementation of the UI and other functionalities of the project.
We aim to ensure all collaborators write;
1.1 Clean code that is easily readable by the developer, fellow team members and other collaborators so that all team members can easily work on the project anytime.
1.2 Maintainable code which enables easy modifications and maintenance of the project during continuous deployment. Therefore, all developers are forced to write the same way for uniformity.
1.3 Accessible code by SEO. One of the targets of this project is to make the web app easily accessible by SEO. Google for example should be able to understand the content of the site and what to display when people search for the app on the internet. So, the app will leverage on the use of semantics and other accessibility tool so the app can pool more users and also gain more preference online.
# 2.0 PREREQUISITES
2.1 Have a code editor installed on your device. We strictly require you to install VS Code editor
2.2 On your VS Code, have prettier installed as an extension and also path intellisence. Other optional helpful extensions include Bracket Pair Colorizer, Material Icon Theme, Debugger for Chrome, Auto Rename Tag, JavaScript ES6 Code Snippet
2.3 Open a Trello account and join the team’s workspace.
2.4 Register and open a Figma account to have access to the web app UI
# 3.0 GITHUB SPECIFICATIONS
3.1 Always clone the repository from the main branch to get updated version of the project
3.2 You must create your own personal branch and the branch must be your first name e.g., $git checkout -b victor
3.3 You must on no condition change your branch name or delete your branch without consulting the team lead first.
3.4 You must not merge any pull request unless you are authorized to do so.
# 4.0 CODE READABILITY SPECIFICATIONS
4.1 Use clear and readable names for classes, id, variables and functions
4.2 Adopt BEM naming convention to name classes and id in html (checkout articles on BEM)
4.3 Do not use inline styling in HTML.
4.4 Use more of shorthand form for properties in your CSS styling to minimize length of styles and to increase load time.
4.5 Do not overuse class property in your HTML. Create classes and ids where necessary
4.6 Set print width to 80 in the prettier extension settings
4.7 Set Tab width to 2 in the prettier extension settings for indentation
4.8 Use single quotes instead of double quote
4.9 Follow strictly the style guide as stated for the UI on Figma
4.10 Avoid too much use or unnecessary use of comments
# 5.0 MAINTAINABILITY SPECIFICATIONS
5.1 Avoid repeating codes in JavaScript. Reuse your code instead of rewriting it for easy maintenance.
5.2 Do not use !important rules in your CSS, consider CSS specificity instead
5.3 Always check for browser support before implementing any HTML, CSS or JavaScript code
5.4 For responsiveness, strictly focus on using Flexbox instead of floats (Do not use floats).
# 6.0 ACCESSIBILITY SPECIFICATIONS
6.1 Strictly use semantic tags where required (Read articles on semantics) and follow the rules guiding the use of HTML semantics.
6.2 Use more of semantic html than non-semantic html i.e., Avoid too many and unnecessary div tags
# 7.0 JAVASCRIPT SPECIFICATIONS
7.1 Do not assign data types with no meaning. e.g., Do not do “victor” rather do
const name = “victor”;
7.2 Avoid deep nesting in. If your code contains too many nested loops, extract them in to functions
7.3 Avoid large functions. Your functions should only perform a specific task
7.4 Use strictly meaningful camelCase variable names and arrow functions
# Note: This document is subjected to future adjustments or modifications. Reach out to the team lead for further questions and clarifications.