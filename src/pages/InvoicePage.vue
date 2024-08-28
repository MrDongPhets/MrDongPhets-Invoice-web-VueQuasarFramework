<template>
  <div class="q-pa-md">
   
    <H5>Invoice</H5>

    <div class="q-mb-md">

      <q-btn
        color="primary"
        label="Add Invoice"
        icon="add"
        @click="openAddModal"
        class="right"
        style="margin-bottom: 16px;"
      />
    </div>

    <!-- Your existing InvoicesTable component here -->
    <router-view />

    <!-- Add Invoice Modal -->
    <add-invoice-modal
      v-model:isOpen="isAddModalOpen"
      @invoice-added="fetchInvoices"
    />
  </div>
</template>

<script>
import AddInvoiceModal from 'components/AddInvoice.vue';
import axios from 'axios';
export default {
  components: {
    AddInvoiceModal
  },
  data() {
    return {
      isAddModalOpen: false
    };
  },
  methods: {
    openAddModal() {
      this.isAddModalOpen = true;
    },
    async fetchInvoices() {
      try {
        const response = await axios.get('http://localhost:8000/api/invoice'); // Ensure URL is correct
        this.$refs.invoicesTable.updateInvoices(response.data.data); // Update table data
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    }
  },
  created() {
    this.fetchInvoices(); // Fetch invoices on component creation
  }
};
</script>

<style scoped>
.right {
  margin-left: 84%;
}
</style>
