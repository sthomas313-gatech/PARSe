/*
static_content.js

Used for testing the UI 
with content that is not loaded from the backend


*/


// hard-coded profile pictures
import allison_profile_pic1 from './images/allison_profile_pic1.png';
import patrick_profile_pic1 from './images/patrick_profile_pic1.jpeg';
import ria_profile_pic1 from './images/ria_profile_pic1.png';

// hard-coded recommendations
export const recs = [
    // 1
    {
    restaurant: {
      name: "Taqueria Del Sol",
      location: {
        city: "Atlanta",
        state: "GA",
        coordinate: {
          latitude : 33.787419165604035 , 
          longitude : -84.4129149869835
        }
      },
    },
    user: {
      username: "patrickc410",
      picture: patrick_profile_pic1,
      firstName: "Patrick",
      lastName: "Crawford"
    },
    title: "So Good!",
    comments: "I love their cheese dip, it's the best in town. And they always have great specials -- my favorites being the cheeseburger taco and the carnitas tostadas",
    tags: [
      "Fast", "Cheap", "Tex-Mex"
    ]
  },

  // 2
  {
    restaurant: {
      name: "Papi's Cuban Grill",
      location: {
        city: "Atlanta",
        state: "GA",
        coordinate: {
          latitude : 33.772889173966654 ,
          longitude : -84.38038030207767
        }
      }
    },
    user: {
      username: "nothisisria",
      picture: ria_profile_pic1,
      firstName: "Ria",
      lastName: "Mitra"
    },
    title: "Best meal ever!",
    comments: "Okay so this was literally such a good meal I'm obsessed",
    tags: [
      "Gluten-free", "Bike-safe", "Caribbean"
    ]
  },

  // 3
  {
    restaurant: {
      name: "Wagaya",
      location: {
        city: "Houston",
        state: "TX",
        coordinate: {
          latitude : 33.78636618067914 , 
          longitude : -84.39823984446893
        }
      }
    },
    user: {
      username: "ronanempire",
      picture: allison_profile_pic1,
      firstName: "Allison",
      lastName: "Ronan"
    },
    title: "No better ramen",
    comments: "The noodles? the broth? the perfectly cooked egg? unmatched",
    tags: [
      "Kid-friendly", "Japanese", "Ramen"
    ]
  },

  // 4
  {
    restaurant: {
      name: "Fox Bros BBQ",
      location: {
        city: "Atlanta",
        state: "GA",
        coordinate: {
          latitude : 33.76114625659493 , 
          longitude : -84.34746527330518
        }
      }
    },
    user: {
      username: "sthomas313",
      picture: patrick_profile_pic1,
      firstName: "Sam",
      lastName: "Thomas"
    },
    title: "I'm in a food coma",
    comments: "I can't move as I write this but the brisket was literally the best thing I've ever had",
    tags: [
      "BBQ"
    ]
  }
];