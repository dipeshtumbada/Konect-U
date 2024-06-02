function loco() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
  
    // Smooth scroll to anchor links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
  
            const targetId = this.getAttribute('href').substring(1); 
            const targetSection = document.getElementById(targetId);
  
            if (targetSection) {
                locoScroll.scrollTo(targetSection); 
            }
        });
    });
  
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    //**************************************************************** */


    document.addEventListener('DOMContentLoaded', () => {
        const chatHistory = [
            { icon: 'far fa-comment-alt', text: '"Top Colleges for mechanical engineering in US"' },
            { icon: 'far fa-comment-alt', text: '"Top Colleges for mechanical engineering in US"' },
            { icon: 'far fa-comment-alt', text: '"Top Colleges for mechanical engineering in US"' },
            { icon: 'far fa-comment-alt', text: '"Top Colleges for mechanical engineering in US"' },
            { icon: 'far fa-comment-alt', text: '"Top Colleges for mechanical engineering in US"' }
        ];
    
        const box1 = document.getElementById('box1');
        chatHistory.forEach(item => {
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-history-item';
    
            const iconContainer = document.createElement('div');
            iconContainer.className = 'icon-container';
    
            const icon = document.createElement('i');
            icon.className = `icon ${item.icon}`;
            iconContainer.appendChild(icon); // Append icon to iconContainer
    
            chatItem.appendChild(iconContainer); // Append iconContainer to chatItem
    
            const text = document.createElement('div');
            text.className = 'text';
            text.textContent = item.text;
            chatItem.appendChild(text);
    
            box1.appendChild(chatItem);
        });
    });
    




    //*************************************************************************** */


    // Chatbox functionality
    function get(selector, root = document) {
        return root.querySelector(selector);
    }
      
    const msgerForm = get('.msger-inputarea');
    const msgerInput = get('.msger-input');
    const msgerChat = get('.msger-chat');
      
    const BOT_IMG = '/components/logo.gif'; // Updated image URL
    const PERSON_IMG = 'https://cdn-icons-png.flaticon.com/512/145/145867.png'; // Updated image URL
    const BOT_NAME = 'BOT';
    const PERSON_NAME = 'USER';
      
    msgerForm.addEventListener('submit', event => {
        event.preventDefault();
      
        const msgText = msgerInput.value;
        if (!msgText) return;
      
        appendMessage(PERSON_NAME, PERSON_IMG, 'right', msgText);
        msgerInput.value = '';
      
        botResponse();
    });
      
    function appendMessage(name, img, side, text) {
        const msgHTML = `
          <div class="msg ${side}-msg">
            <div class="msg-img" style="background-image: url(${img})"></div>
      
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}</div>
              </div>
      
              <div class="msg-text">${text}</div>
            </div>
          </div>
        `;
      
        msgerChat.insertAdjacentHTML('beforeend', msgHTML);
        msgerChat.scrollTop = msgerChat.scrollHeight;
    }
      
    function botResponse() {
        const r = random(0, BOT_MSGS.length - 1);
        const msgText = BOT_MSGS[r];
        const delay = msgText.split(' ').length * 100;
      
        setTimeout(() => {
          appendMessage(BOT_NAME, BOT_IMG, 'left', msgText);
        }, delay);
    }
      
    const BOT_MSGS = [
        'Hi, how are you?',
        'Oh, sorry to hear that.',
        'I\'m here to assist you.',
        'What can I do for you today?',
        'Have a great day!'
    ];
      
    function formatDate(date) {
        const h = '0' + date.getHours();
        const m = '0' + date.getMinutes();
      
        return `${h.slice(-2)}:${m.slice(-2)}`;
    }
      
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // ************************************************************** //

    document.addEventListener('DOMContentLoaded', () => {
        const userInfo = {
            name: sessionStorage.getItem('userName'),
            email: sessionStorage.getItem('userEmail'),
            picture: sessionStorage.getItem('userPicture')
        };
    
        const box3 = document.getElementById('box3');
    
        const userEmailContainer = document.createElement('div');
        userEmailContainer.classList.add('user-email');
    
        const userImage = document.createElement('img');
        userImage.src = userInfo.picture;
        userImage.classList.add('rounded-circle');
        userImage.width = 100;
        userImage.height = 100;
        userEmailContainer.appendChild(userImage);
    
        const userEmail = document.createElement('p');
        userEmail.textContent = `Email: ${userInfo.email}`;
        userEmailContainer.appendChild(userEmail);
    
        box3.appendChild(userEmailContainer);
    
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.classList.add('btn', 'btn-danger');
        logoutBtn.addEventListener('click', () => {
            google.accounts.id.disableAutoSelect();
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
        box3.appendChild(logoutBtn);
    });
    
    

    // ************************************************************* //

    document.addEventListener('DOMContentLoaded', () => {
        const settingsItems = [
            { icon: 'fa-user-cog', text: 'Account' },
            { icon: 'fa-info-circle', text: 'About' },
            { icon: 'fa-question-circle', text: 'Help' }
        ];
    
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'settings-container';
    
        settingsItems.forEach(item => {
            const settingsItem = document.createElement('div');
            settingsItem.className = 'settings-item';
    
            const icon = document.createElement('i');
            icon.className = `fa ${item.icon} icon`;
            settingsItem.appendChild(icon);
    
            const text = document.createElement('div');
            text.className = 'text';
            text.textContent = item.text;
            settingsItem.appendChild(text);
    
            settingsContainer.appendChild(settingsItem);
        });
    
        document.getElementById('box4').appendChild(settingsContainer);
    });
    
    
    


  }
  
  // Call the loco function
  loco();
  