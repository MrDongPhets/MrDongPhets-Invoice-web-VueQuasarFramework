<template>

    <q-page class="">
      <!-- Header -->
       <nav :class="['navbar', { 'active-style': isActive }]">
        <div class="logo-nav">
          <div class="logo" >
          DongPhets         
        </div>
            <div class="menu-icon">
                <q-btn flat icon="menu" size="25px" class="q-mr-md d-md-none" @click="toggleStyle" />
        </div>
      
        </div>
       
     
        
        <div class="menubar" >
          
    
          <q-btn class="button" flat label="Home" @click="scrollTo('home')" />
            <q-btn class="button" flat label="About" @click="scrollTo('about')" />
            <q-btn class="button" flat label="Products" @click= "scrollTo('products')" />
            <q-btn class="button" flat label="Reviews" @click="scrollTo('reviews')" />
           
        </div>

        
           
     </nav>

  
      <!-- Main Content -->
   
        <q-page class="">
     
       
          <!-- Home Section -->
          <div id="home" class="section home">
            <div class="welcome">

                <div class="">
                    <h1>WELCOME</h1>
                    <h2 class="q-mt-md text-h4">Discover the Best <br> Products Just for You!</h2>
                    <q-btn color="red" label="Subscribe Now" class="q-mt-md" @click="scrollTo('products')"/>
                </div>

            </div>
            
            <div class="image">
            <img src="src/assets/dashboard.PNG" alt="">
            
            </div>
          </div>
  
          <!-- About Section -->
          <div id="about" class="about">
            <div class="image-about">
            <img src="src/assets/logo.PNG" alt="">
            
            </div>

            <div class="info-about">
              <h2 class="text-h4">About Us</h2>
              <p class="q-mt-md">
                Our invoice website product offers a streamlined solution for managing your billing needs effortlessly. Designed with user-friendly features, our platform allows you to create, customize, and send professional invoices with just a few clicks. Equipped with secure payment integration and automated reminders, it ensures you get paid on time while saving you valuable time. Our intuitive dashboard provides real-time insights into your financial status, making it easy to track payments and manage your business efficiently. Experience the ultimate convenience and accuracy in invoicing with our cutting-edge tool, tailored to simplify your financial workflows and enhance your productivity.
              </p>
              <q-btn color="primary" label="Learn More" class="q-mt-md" />
            </div>
          </div>
  
          <!-- Products Section -->
           <div  id="products" class="section products">
            <h2 class="text-h4">Pick Your Perfect Plan</h2>
          <div class="products-card">
           
            <div class="card">
              <q-card class="my-card q-mt-md margin-card" bordered>
            <q-card-section class="q-pa-md">
               <div class="q-mb-md">
             <h4>Free Trial</h4>
             <p class="text-h6">₱0</p>
             <p class="text-h4 text-primary">0<span>/mo</span></p>
             <p class="text-caption">Save 0%</p>
             <p class="text-subtitle2">7 days</p>
              </div>
                 </q-card-section>
                <q-card-actions class="button-card">
            <q-btn color="primary" label="Choose plan" @click="goFreePage" />
             </q-card-actions>
            </q-card>

            
            </div>

            <div class="card">
              <q-card class="my-card q-mt-md margin-card" bordered>
            <q-card-section class="q-pa-md">
               <div class="q-mb-md">
             <h4>Basic</h4>
             <p class="text-h6">₱199</p>
             <p class="text-h4 text-primary">₱199<span>/mo</span></p>
             <p class="text-caption">Save 10%</p>
             <p class="text-subtitle2">1 month free</p>
              </div>
                 </q-card-section>
                <q-card-actions class="button-card">
            <q-btn color="primary" label="Choose plan" @click="goFreePage" />
             </q-card-actions>
            </q-card>

            
            </div>

            <div class="card">
              <q-card class="my-card q-mt-md margin-card" bordered>
            <q-card-section class="q-pa-md">
               <div class="q-mb-md">
             <h4>Standard</h4>
             <p class="text-h6">₱249</p>
             <p class="text-h4 text-primary">₱248<span>/mo</span></p>
             <p class="text-caption">Save 40%</p>
             <p class="text-subtitle2">2 months free</p>
              </div>
                 </q-card-section>
                <q-card-actions class="button-card">
            <q-btn color="primary" label="Choose plan" @click="goFreePage" />
             </q-card-actions>
            </q-card>

            
            </div>

            <div class="card">
              <q-card class="my-card q-mt-md margin-card" bordered>
            <q-card-section class="q-pa-md">
               <div class="q-mb-md">
             <h4>Premiun</h4>
             <p class="text-h6">₱999</p>
             <p class="text-h4 text-primary">₱999<span>/mo</span></p>
             <p class="text-caption">Save 50%</p>
             <p class="text-subtitle2">12 months free</p>
              </div>
                 </q-card-section>
                <q-card-actions class="button-card">
            <q-btn color="primary" label="Choose plan" @click="goFreePage" />
             </q-card-actions>
            </q-card>

            
            </div>


          

        
       
          </div>
        </div>
  
          <!-- Reviews Section -->
          <div id="reviews" class="section reviews">

            <h3 class="q-ml-lg text-white">What do other ursers say?</h3>

            <div class="carousel">
      
                          <div class="review-card">
                                <div class="review-header">
                                  <div class="image1">
                                    <img class="person-image" src="src/assets/heva.jpg" alt="Reviewer Picture" />
                                  </div>

                                  <div class="review-body">
                                    <p class="review-text">
                                        "This invoice product has been a game-changer for my business. The features are intuitive, and the support is top-notch. Highly recommend!"
                                      </p>
                                </div>
                        
                                  <div class="review-details">
                                  <h5 class="reviewer-name">Maria Clara</h5>
                                  </div>
                        
                                  <q-rating
                            v-model="ratingModel"
                            size="2em"
                            color="yellow"
                                    readonly
                                  />
                                  </div>
                         </div>

                         <div class="review-card">
                                <div class="review-header">
                                  <div class="image1">
                                    <img class="person-image" src="src/assets/luisa.png" alt="Reviewer Picture" />
                                  </div>

                                  <div class="review-body">
                                    <p class="review-text">
                                      "This invoicing tool has transformed how we manage our finances. Its user-friendly
                                       interface and exceptional customer service make it a must-have for any business. 
                                       I couldn't be happier!""
                                      </p>
                                </div>
                        
                                  <div class="review-details">
                                  <h5 class="reviewer-name">May Anne Zou</h5>
                                  </div>
                        
                                  <q-rating
                            v-model="ratingModel"
                            size="2em"
                            color="yellow"
                                    readonly
                                  />
                                  </div>
                         </div>

                         <div class="review-card">
                                <div class="review-header">
                                  <div class="image1">
                                    <img class="person-image" src="src/assets/chacha.jpg" alt="Reviewer Picture" />
                                  </div>

                                  <div class="review-body">
                                    <p class="review-text">
                                        "I’ve been using this invoicing solution for a few months now, and it’s 
                                        exceeded all my expectations. It’s been a great investment for my business!"
                                      </p>
                                </div>
                        
                                  <div class="review-details">
                                  <h5 class="reviewer-name">Allaine Bruce</h5>
                                  </div>
                        
                                  <q-rating
                            v-model="ratingModel"
                            size="2em"
                            color="yellow"
                                    readonly
                                  />
                                  </div>
                         </div>

                         <div class="review-card">
                                <div class="review-header">
                                  <div class="image1">
                                    <img class="person-image" src="src/assets/aldrin.jpg" alt="Reviewer Picture" />
                                  </div>

                                  <div class="review-body">
                                    <p class="review-text">
                                      "Absolutely love this invoicing product! It’s streamlined our 
                                      billing process and made managing accounts a breeze. 
                                       I highly recommend it to anyone
                                        looking for a reliable invoicing solution."
                                      </p>
                                </div>
                        
                                  <div class="review-details">
                                  <h5 class="reviewer-name">Joshua Mendoza</h5>
                                  </div>
                        
                                  <q-rating
                            v-model="ratingModel"
                            size="2em"
                            color="yellow"
                                    readonly
                                  />
                                  </div>
                         </div>
            
              </div>
        </div>

         
      <footer>
        <div class="footer text-black">
  
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      <div class="social-icons">
        <q-btn flat label="Home" @click="scrollTo('home')" />
            <q-btn flat label="About" @click="scrollTo('about')" />
            <q-btn flat label="Products" @click="scrollTo('products')" />
            <q-btn flat label="Reviews" @click="scrollTo('reviews')" />
      </div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </div>

        </div> 
      </footer>
        </q-page>
   

    </q-page>
  </template>
  
  <script>
  import { ref } from 'vue'
  export default {
    
    setup () {
    return {
      slide: ref(1),
      ratingModel: ref(3)
    }
    
  },
 


    name: 'HomePage',
    data() {
      return {
        isActive: false,
        isActive1: false
      }
    },
    methods: {
      scrollTo(section) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
      },
      toggleStyle() {
      this.isActive = !this.isActive;
      this.isActive1 = !this.isActive1; // Toggle the state
      console.log('Button clicked, isActive:', this.isActive);
    },
   
    goFreePage() {
      this.$router.push('/main'); // Navigates to the free trial page
    },

    }
  }
  </script>
  
  <style scoped>
  @import 'src/css/style.css';

  </style>
  