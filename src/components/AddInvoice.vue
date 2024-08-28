<template>
    <q-dialog v-model="localIsOpen" persistent style="min-width: 650px">
      <q-card style="min-width: 550px">
        <q-card-section>
          <div class="text-h6">Add Invoice</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit.prevent="addInvoice" class="d-flex">
            <q-input
              filled
              v-model="invoice.status"
              label="Status"
              
              :rules="[val => !!val || 'Status is required']"
            />
            <q-input
              filled
              v-model="invoice.invoice"
              label="Invoice"
              :rules="[val => !!val || 'Invoice is required']"
            />
            <q-input
              filled
              v-model="invoice.customer"
              label="Customer"
              :rules="[val => !!val || 'Customer is required']"
            />
            <q-input
              filled
              v-model.number="invoice.amount"
              label="Amount"
              type="number"
              :rules="[val => val > 0 || 'Amount must be greater than 0']"
            />
            <q-input
              filled
              v-model="invoice.due"
              label="Due Date"
              type="date"
              :rules="[val => !!val || 'Due date is required']"
            />
            <q-input
              filled
              v-model="invoice.issued"
              label="Issued Date"
              type="date"
              :rules="[val => !!val || 'Issued date is required']"
            />
          </q-form>
        </q-card-section>
  
        <q-card-actions>
          <q-btn label="Cancel" @click="close" flat />
          <q-btn label="Add" @click="addInvoice" color="primary" />
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
        invoice: {
          status: '',
          invoice: '',
          customer: '',
          amount: 0,
          due: '',
          issued: ''
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
      async addInvoice() {
  try {
    // Close the Quasar modal
    this.localIsOpen = false;

    // Show SweetAlert2 confirmation alert
    const result = await Swal.fire({
      title: 'Add Invoice',
      text: 'Are you sure you want to add this invoice?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
      customClass: {
        container: 'swal2-container'
      }
    });

    // Handle user response
    if (result.isConfirmed) {
      // Proceed with the API request
      await axios.post('http://localhost:8000/api/invoice', this.invoice);

      // Show success alert after successful request
      await Swal.fire(
        'Added!',
        'The invoice has been added.',
        'success'
      );

      // Notify parent that an invoice has been added
      this.$emit('invoice-added');
    } else if (result.isDismissed) {
      // Show canceled alert if user decides not to proceed
      await Swal.fire(
        'Cancelled',
        'The invoice was not added.',
        'error'
      );
    }
  } catch (error) {
    console.error('Error adding invoice:', error);
    // Show error alert if there is an issue with the request
    await Swal.fire(
      'Error!',
      'There was an error adding the invoice. Please try again.',
      'error'
    );
  }
}
  }
    
  };
  </script>
  
  <style scoped>
  .swal2-container {
  z-index: 9999 !important; /* Ensure this is high enough */
}
  </style>
  