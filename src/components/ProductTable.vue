<template>
  <div class="table">

    <q-table
      title="Table"
      :rows="products"
      :columns="columns"
      row-key="id"
      flat
      class="custom-table"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
        color="primary"
        @click="openEditModal(props.row.id)"
        icon="edit" 
        flat
        size="sm"
        aria-label="Edit"
      />
      

      <q-btn
        color="negative"
        @click="deleteProduct(props.row.id)"
        icon="delete" 
        flat
        size="sm"
        aria-label="Delete"
      />
          </div>
        </q-td>
      </template>
    </q-table>

    <!-- Edit Product Modal -->
    <q-dialog v-model="localIsOpen" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Edit Product</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="updateProduct">


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
              :rules="[val => !!val || 'Name is required']"
            />


            <q-input
              filled
              v-model.number="product.quantity"
              label="Quantity"
              :rules="[val => !!val || 'Quantity is required']"
            />
            <q-input
              filled
              v-model.number="product.price"
              label="Price"
              type="number"
              :rules="[val => val > 0 || 'Price must be greater than 0']"
            />
          </q-form>
        </q-card-section>

        <q-card-actions>
          <q-btn label="Cancel" @click="close" flat />
          <q-btn label="Update" @click="updateProduct" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      products: [], // Holds the data fetched from the API
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
        { name: 'quantity', label: 'Quantity', align: 'left', field: 'quantity', sortable: true },
        { name: 'price', label: 'Price', align: 'left', field: 'price', sortable: true },
        { name: 'actions', label: 'Actions', align: 'center' }
      ],
      localIsOpen: false,
      selectProductId: null,
      product: {
        status: '',
        name: '',
        quantity: '',
        price: 0
      }
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/product'); // Update URL as needed
        this.products = response.data.data; // Update if API response structure is different
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async deleteProduct(id) {
      try {
        // Show SweetAlert2 confirmation alert
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel',
          confirmButtonColor: '#d33', // Red color for the confirm button
          cancelButtonColor: '#3085d6', // Blue color for the cancel button
          reverseButtons: true
        });

        // Handle user response
        if (result.isConfirmed) {
          // Proceed with the delete operation
          await axios.delete(`http://localhost:8000/api/product/${id}`); // Update URL as needed

          // Refresh the table or perform any additional actions after deletion
          this.fetchProducts();

          // Show success alert
          await Swal.fire({
            title: 'Deleted!',
            text: 'The product has been deleted.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else if (result.isDismissed) {
          // Show cancellation alert
          await Swal.fire({
            title: 'Cancelled',
            text: 'The product was not deleted.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error deleting product:', error);

        // Show error alert if there is an issue with the request
        await Swal.fire({
          title: 'Error!',
          text: 'There was an error deleting the product. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    openEditModal(id) {
      this.selectProductId = id;
      this.fetchProductDetails(id); // Fetch details before opening modal
      this.localIsOpen = true;
    },
    close() {
      this.localIsOpen = false;
      this.product = { status: '', name: '', quantity: '', price: 0 }; // Clear product data
    },
    async fetchProductDetails(id) {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${id}`);
        this.product = response.data.data; // Set product details for editing
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    async updateProduct() {
      if (this.selectProductId) {
        try {
          // Make the API request to update the product
          await axios.put(`http://localhost:8000/api/product/${this.selectProductId}`, this.product);

          // Close the modal
          this.localIsOpen = false;

          // Show success alert
          await Swal.fire({
            title: 'Updated!',
            text: 'The product has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Refresh the products list
          this.fetchProducts();
        } catch (error) {
          console.error('Error updating product:', error);

          // Show error alert if there is an issue with the request
          await Swal.fire({
            title: 'Error!',
            text: 'There was an error updating the product. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else {
        console.error('Product ID not set');
      }
    }
  }
};
</script>

<style scoped>
.table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

</style>
