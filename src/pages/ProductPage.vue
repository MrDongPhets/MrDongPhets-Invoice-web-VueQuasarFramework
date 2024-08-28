<template>
  <div class="q-pa-md">
   
    <H5>Prodcut</H5>

    <div class="q-mb-md">

      <q-btn
        color="primary"
        label="Add Product"
        icon="add"
        @click="openAddModal"
        class="right"
        style="margin-bottom: 16px;"
      />
    </div>

    <!-- Your existing InvoicesTable component here -->
    <router-view />

    <!-- Add Invoice Modal -->
    <add-product-modal
      v-model:isOpen="isAddModalOpen"
      @product-added="fetchProduct"
    />
  </div>
</template>

<script>
import AddProductModal from 'components/AddProduct.vue';
import axios from 'axios';
export default {
  components: {
    AddProductModal
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
    async fetchProduct() {
      try {
        const response = await axios.get('http://localhost:8000/api/product'); // Ensure URL is correct
        this.$refs.productTable.updateProduct(response.data.data); // Update table data
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    }
  },
  created() {
    this.fetchProduct(); // Fetch invoices on component creation
  }
};
</script>

<style scoped>
.right {
  margin-left: 84%;
}
</style>
