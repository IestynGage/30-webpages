// const LOCAL_STORAGE_KEYS = {
//   luckLastUpdated: "luckLastUpdated",
//   luckAmount: "luckAmount"
// }

// class TitleDescriptionImage extends HTMLElement {
//   constructor(title, desc, image) {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.innerHTML = `
//       <style>
//         :host {
//           display: block;
//           font-family: Arial, sans-serif;
//           text-align: center;
//           margin: 20px;
//         }
//       </style>
//       <image src="${image}" >
//       <h1> ${title} </h1>
//       <p> ${desc} </p>
//       <div class="output"></div>
//     `;

//     this.button = this.shadowRoot.querySelector('button');
//     this.output = this.shadowRoot.querySelector('.output');

//     this.button.addEventListener('click', () => {
//       const todaysLuck = this.luckGenerator();
//       this.output.textContent = `You are ${todaysLuck}% more lucky today!`;
//       this.button.remove();
//     });
//     localStorage.getItem("lastname");
//   }

//   luckGenerator() {
//     const luckLastUpdated = localStorage.getItem(LOCAL_STORAGE_KEYS.luckLastUpdated);
//     const luckAmount = localStorage.getItem(LOCAL_STORAGE_KEYS.luckAmount);
    
//     if (
//         luckLastUpdated === null || luckAmount === null 
//         || this.luckNeedsUpdating(luckLastUpdated)
//       ) {
//       localStorage.setItem(LOCAL_STORAGE_KEYS.luckLastUpdated, this.getTodayDate().toDateString());
//       const luckAmount = Math.floor(Math.random() * 101);
//       localStorage.setItem(LOCAL_STORAGE_KEYS.luckAmount, luckAmount);

//       return luckAmount;
//     }

//     return luckAmount
//   }


//   luckNeedsUpdating(luckLastUpdated) {
//     const today = this.getTodayDate();
//     const lastUpdatedDate = new Date(luckLastUpdated);

//     return today.getTime() !== lastUpdatedDate.getTime()
//   }

//   getTodayDate() {
//     const now = new Date();
//     return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
//   }
// }

// customElements.define('card-title-desc-image', TitleDescriptionImage);
