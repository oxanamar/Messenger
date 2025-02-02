# 📩 WhatsApp Messenger Clone with Green API


<p>
This project is a WhatsApp-style chat interface built with React and powered by Green API. It allows users to send and receive text messages using their WhatsApp account.
</p>


<div style="display: flex; justify-content: space-between; align-items: center;">

</div>

## 🌐 Live Website

You can visit the live site here: [Messenger](https://messenger-xi-red.vercel.app/)

## ✨ Features

- **User Authentication**:  
  Users log in with their Green API credentials (idInstance, apiTokenInstance).

- **Chat Interface**:  
  Users can search contacts, create chats, send, and receive messages.

- **Real-Time Messaging**:  
  Uses Green API's SendMessage endpoint for sending messages.
  Listens for incoming messages via receiveNotification API.

- **Contact Management**:
  Users can add new contacts by entering a phone number.

## 🛠️ Tech Stack

### **Frontend**

- **React.js:**  
  Used for building dynamic, reusable, and interactive UI components.

- **React Router:**  
  Enables client-side routing and navigation between different pages.

- **React Redux:**  
  Utilized for centralized state management, ensuring data consistency across components.

- **TypeScript:**  
  Enhances code quality and maintainability by enforcing static typing. 

- **SCSS Modules:**  
  Enables modular and maintainable styling by scoping styles to individual components, preventing conflicts in larger projects. 

- **React Icons:**  
  Integrated for adding scalable vector icons to enhance the UI.

- **Axios:**  
  Used for handling asynchronous HTTP requests to Green API. 

### **Backend**

- **Green API:**  
  A third-party WhatsApp API service that allows developers to integrate WhatsApp messaging functionality into their applications: **[Green API](https://green-api.com/en)**. 

## 🔄 How It Works
1. **User Registers on Green API**
   - Create a free account on **[Green API](https://green-api.com/en/docs/before-start/)**.
   - Obtain `idInstance` and `apiTokenInstance`.

2. **User Logs In**
   - Enter `idInstance` and `apiTokenInstance` to authenticate.
  
  <div style="display: flex; justify-content: center;">
   <img width="400" alt="login" src="https://github.com/user-attachments/assets/a09c80fa-d925-49a9-a2f1-1615dcf0feb4" />
  </div>

3. **Creating a New Chat**
   - Add a **name** and **phone number** to start a chat.
  
  <div style="display: flex; justify-content: center;">
  <img width="400" alt="new chat" src="https://github.com/user-attachments/assets/6be4213e-4439-4df0-aaea-2d1e386d7c2a" />
  </div>

4. **Sending Messages**
   - Messages are sent via **[`SendMessage`](https://green-api.com/en/docs/api/sending/SendMessage/)** API.
  
  <div style="display: flex; justify-content: center;">
  <img width="400" alt="chat" src="https://github.com/user-attachments/assets/e28ba5d0-ba8a-4888-b881-adb1cccbbeb2" />
  </div>

5. **Receiving Messages**
   - Incoming messages are retrieved using **[`receiveNotification`](https://green-api.com/en/docs/api/receiving/technology-http-api/ReceiveNotification/)**.



## 🚀 Installation and Setup

#### Step 1: Clone the Repository
Clone the project to your local machine using the following command:

```bash
git clone https://github.com/oxanamar/Messenger.git
cd Messenger

```

#### Step 2: Install dependencies
Navigate to the project directory and install all necessary dependencies:

```bash
npm install
```

#### Step 3: Start the development server
Run the following command to start the application locally:

```bash
npm run dev
```

#### Step 4: Open the Messenger App
Go to http://localhost:5173/ (or the URL shown in your terminal) to start using the Messenger app! 🎉

<br><br>

Thank you for exploring this project! If you find it useful, consider giving it a ⭐️ or suggesting improvements! 🙌🏻







