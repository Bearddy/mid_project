# Software Studio 2025 Spring
## Midterm Project — Chatroom App

### Scoring

| **Basic components**                   | **Score** | **Implemented** |
| :------------------------------------- | :-------: | :-------------:|
| Membership Mechanism (Email Sign Up/In) |     5%    |       ✔️        |
| Firebase Hosting                        |     5%    |       ✔️        |
| Database Read/Write (Auth required)     |    15%    |       ✔️        |
| Responsive Web Design (RWD)             |    15%    |       ✔️        |
| Git Version Control                     |     5%    |       ✔️        |
| Private Group Chatroom                  |    20%    |       ✔️        |

| **Advanced components**                 | **Score** | **Implemented** |
| :-------------------------------------  | :-------: | :-------------:|
| React Framework                         |    10%    |       ✔️        |
| Google Sign-In                          |     1%    |       ✔️        |
| Chrome Push Notifications               |     5%    |       ✔️        |
| CSS Animations (modals, scale-ups)      |     2%    |       ✔️        |
| Script/HTML Injection Handling          |     2%    |       ✔️        |

| **Bonus components**                    | **Score** | **Implemented** |
| :-------------------------------------  | :-------: | :-------------:|
| User Profile Modal                      |     1%    |       ✔️        |
| Profile Picture Upload                  |     1%    |       ✔️        |
| Send Image                              |     1%    |       ✔️        |
| Send Video                              |     1%    |       ✔️        |
| Unsend Message (long‑press/context)     |     3%    |       ✔️        |
| Search for Messages                     |     3%    |       ✔️        |
| Chatbot                                 |     2%    |       ❌        |
| Block User                              |     2%    |       ❌        |
| Send GIF (Tenor API)                    |     3%    |       ❌        |

---

## How to use

**Before sign in**

1. **Membership Mechanism (sign in/sign up)**
    - There are sign in and sign up button in the top-right of the interface.
    - In sign in, you can use email login with "Sign in" button or use google login with "Sign in With Google" button.
    - In sign up, you can create account using email with "Sign up" button.
    - In both sign in and sign up, if you want to cancel the process, you can click "Cancel" button.

   

**After sign in**

1. **Create & Join Channels**
    - Click ➕(which is in the top-left of the interface) to create a new private channel.
    - Click a button right to the ➕ to join an existing channel by ID.
    - To know the channel ID, you can right click the channel (desktop) or long-press (mobile), then the alert shows. You can select that and copy or you can just click the confirm button to copy. 
2. **Chat Interface**
    - Send **text**, **links**.
    - Can also send **images**, or **videos**. **(Bonus Components)**
    - Long‑press (mobile) or right‑click (desktop) your message to unsend.
3. **Search Messages (Bonus Components)**
    - Right to the join channel button, there is a place you can search message.
    - Enter keywords in the search bar and press Enter or press magnifier button (right to the search input).
    - And then, the messages which the keyword is included are highlighted with yellow and  there is "current index / total count" beside the X button.
    - Current index message is highlighted with green and you can keep press Enter or magnifier button to go to next index. The scroll is moved automatically.
    - If you want to cancel the highlight, you can press X button or press Escape.
5. **Sign out**
    - If you want to sign out with some purposes, you can click sign out button which is in the top-right of the interface.
4. **User Profile (Bonus Components)**
   - Click the profile icon or username in the message to open the modal. And you can also click the button left to the sign out button to open my profile.
   - In my profile, you can edit name, email, phone, address, and upload profile image.
   - To change profile image, you only need to click my profile image.
5. **Notifications**
   - Allow Chrome notifications when prompted to receive message alerts.
6. **Css Animations**
   - There is animation with my custom alert, it will get bigger when it shows.
   - Also, if you hover the buttons in toolbar and channel list, it will getting bigger to highlight what button you are going to push. (TA says button hover is not an animation, but I referred to the 4th part of video attached to the ppt)
7. **RWD**
   - If you in the mobile, there is a extra button (hamburger button) to on/off the joined channel list.
   - Also, the size of interface or the font-size is changed.
   - There is nothing being hidden.
8. **Unsend Message**
   - Long‑press (mobile) or right‑click (desktop) your own message and confirm removal.


---


## Web Page Link

    https://ss-mid-912fd.firebaseapp.com/

---

## Github Link

    https://github.com/Bearddy/mid_project

---

<style>
  table th { text-align: left; }
</style>

