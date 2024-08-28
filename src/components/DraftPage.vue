<template>
  <div class="draft-page">
    <q-card class="q-mb-md" flat bordered>
      <q-card-section>
        <div class="text-h6">Invoice Details</div>
        <q-form @submit.prevent="sendInvoice">
          <div class="q-gutter-md">
            <q-input filled v-model="invoice.status" label="Status" readonly />
            <q-input filled v-model="invoice.invoice" label="Invoice" readonly />
            <q-input filled v-model="invoice.customer" label="Customer" readonly />
            <q-input filled v-model.number="invoice.amount" label="Amount" type="number" readonly />
            <q-input filled v-model="invoice.due" label="Due Date" type="date" readonly />
            <q-input filled v-model="invoice.issued" label="Issued Date" type="date" readonly />
            <q-input filled v-model="email" label="Recipient Email" :rules="[val => /.+@gmail\.com/.test(val) || 'Valid Gmail address is required']" />
          </div>
          <q-card-actions>
            <q-btn label="Send Invoice" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      invoice: {
        status: '',
        invoice: '',
        customer: '',
        amount: 0,
        due: '',
        issued: ''
      },
      email: ''
    };
  },
  async created() {
    await this.fetchInvoice();
  },
  methods: {
    async fetchInvoice() {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(`http://localhost:8000/api/invoice/${id}`);
        this.invoice = response.data.data;
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      }
    },
    async sendInvoice() {
      try {
        const payload = {
                    to: this.email,
                    subject: `Invoice ${this.invoice.invoice}`,
                    text: `Invoice Details:\nCustomer: 
                    ${this.invoice.customer}\nAmount: 
                    ${this.invoice.amount}\nDue Date:
                    ${this.invoice.due}\nIssued Date:
                      ${this.invoice.issued}`,

                    customer: this.invoice.customer,
                    amount: this.invoice.amount,
                    due: this.invoice.due,
                    issued: this.invoice.issued
                  };

        await axios.post('http://localhost:8000/api/send-email', payload);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Invoice sent successfully!'
        });
      } catch (error) {
        console.error('Error sending invoice:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error sending the invoice. Please try again.'
        });
      }
    }
  }
};
</script>

<style scoped>
.draft-page {
  padding: 20px;
}
</style>
