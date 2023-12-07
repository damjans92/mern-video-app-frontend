# Name of Project

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Acknowledgements](#acknowledgements)

## Overview
TubeLand is a video sharing app where users can watch, upload, comment and like videos, subscribe and edit video and user account information.   
This app resembles some Youtube functionalities and visual layout.  
Live [DEMO](https://tubeland.onrender.com/)

### Built With
MERN stack  
Frontend - React (Vite), Redux Toolkit, Styled components  
[Backend](https://github.com/damjans92/mern-video-app-backend) - Node.js, Express.js, MongoDB(Atlas), JWT, Cookies   
Firebase - used for storage and additional authentication

## Features
Non-registered users can only watch videos.  
Registered users can watch, upload, edit videos, comment, like, subscribe to other users.

Authentication is done with JWT and http-only cookies.  
When user signs in, access and refresh tokens are generated. When access token expires, if refresh token still exists access token will regenerate.

## Acknowledgements
This app was improved and based upon on this [tutorial](https://www.youtube.com/watch?v=CCF-xV3RSSs).

