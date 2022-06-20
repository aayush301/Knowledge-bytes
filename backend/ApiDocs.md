# Backend API Documentation

## Auth Routes
POST /api/auth/register
- body: { name, email, password }
- Access: Public
- Description: verifies registration details and sends activation email

POST /api/auth/activate-account
- body: { activationToken }
- Access: Private
- Description: verifies activation token and registers new user

POST /api/auth/login
- body: { email, password }
- Access: Public
- Description: verifies login details and creates access token

POST /api/auth/forgot-password
- body: { email }
- Access: Public
- Description: creates access token from email and sends password reset email

POST /api/auth/reset-password
- body: { password }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: updates the password of user



## Profile Routes
GET /api/profile
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: gets the user's data

PUT /api/profile
- body: { name, location }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: updates the user's data

PUT /api/username
- body: { username }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: updates the user's username if not already taken by any other

PUT /api/password
- body: { existingPassword, newPassword }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: updates the user's password after verifying existing password



## Question Routes
GET /api/questions
- query: { page, pageSize }
- Access: Public
- Description: gets the questions

POST /api/questions
- body: { title, body }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: posts the question

GET /api/questions/me
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: gets the questions asked by current logged-in user

GET /api/questions/:qid
- Access: Public
- Description: gets the question by id

PUT /api/questions/:qid
- body: { title, body }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: updates the question by id

GET /api/questions/byslug/:qslug
- Access: Public
- Description: gets the question by its slug



## Answer Routes
GET /api/answers/me
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: gets the answers previously answered by current logged-in user

GET /api/answers/byQuestion/:qid
- Access: Public
- Description: gets the answers of a question by the question id

GET /api/answers/:ansid
- Access: Public
- Description: gets an answer by id

POST /api/answers/:qid
- body: { text }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: posts the answer to the question passed by its id in the name of current logged-in user

PUT /api/answers/:ansid
- body: { text }
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: updates the answer by the answer id

PUT /api/answers/:ansid/accept
- body: {} (no-body)
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: marks the answer with given id as accepted provided the user requesting for accepting is the questioner for the answer



## Bookmark Routes
GET /api/bookmarks/me
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: gets the bookmarks of current logged-in user

POST /api/bookmarks
- body: { bookmarkType, questionId, answerId }  // Note: fields passed will be few depending upon bookmark type
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: adds the bookmark for current logged-in user

DELETE /api/bookmarks/:bookmarkId
- headers: { Authorization: "jwt-token" }
- Access: Private
- Description: deletes the bookmark by id