<template>
    <q-dialog v-model="localIsOpen" persistent style="min-width: 650px">
      <q-card style="min-width: 550px">
        <q-card-section>
          <div class="text-h6">Add Invoice</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit.prevent="addProduct" class="d-flex">
            <q-input
              filled
              v-model="product.status"
              label="Status"
              
              :rules="[val => !!val || 'Status is required']"
            />
            <q-input
              filled
              v-model="product.name"
              label="Name"
              :rules="[val => !!val || 'name is required']"
            />
            <q-input
              filled
              v-model="product.quantity"
              label="Quantity"
              :rules="[val => !!val || 'Quantity is required']"
            />
            <q-input
              filled
              v-model.number="product.price"
              label="Price"
              type="number"
              :rules="[val => val > 0 || 'Amount must be greater than 0']"
            />
        
          </q-form>
        </q-card-section>
  
        <q-card-actions>
          <q-btn label="Cancel" @click="close" flat />
          <q-btn label="Add" @click="addProduct" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    props: {
      isOpen: Boolean
    },
    data() {
      return {
        localIsOpen: this.isOpen,
        product: {
          status: '',
          name: '',
          quantity: '',
          price: 0
        }
      };
    },
    watch: {
      isOpen(val) {
        this.localIsOpen = val;
      },
      localIsOpen(val) {
        if (!val) {
          this.$emit('update:isOpen', false);
        }
      }
    },
    methods: {
      close() {
        this.localIsOpen = false;
      },
      async addProduct() {
      try {
      
        this.localIsOpen = false;

   
        const result = await Swal.fire({
          title: 'Add Product',
          text: 'Are you sure you want to add this product?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, add it!',
          cancelButtonText: 'No, cancel',
          reverseButtons: true,
          customClass: {
            container: 'swal2-container'
          }
        });

      
        if (result.isConfirmed) {
        
          await axios.post('http://localhost:8000/api/product', this.product); // Ensure URL is correct

     
          await Swal.fire(
            'Added!',
            'The product has been added.',
            'success'
          );

          this.$emit('product-added');
        } else if (result.isDismissed) {
        
          await Swal.fire(
            'Cancelled',
            'The product was not added.',
            'error'
          );
        }
      } catch (error) {
        console.error('Error adding product:', error);

      
        await Swal.fire(
          'Error!',
          'There was an error adding the product. Please try again.',
          'error'
        );
      }
    }
  
    }
  };
  </script>
  
  <style scoped>
  /* Optional: Add styling for the modal */
  </style>
  