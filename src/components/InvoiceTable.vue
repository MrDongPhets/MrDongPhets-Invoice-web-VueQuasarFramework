
<template>
  <div class="table">
    <!-- Invoice Table -->
    <q-table
  title="Table"
  :rows="invoices"
  :columns="columns"
  row-key="id"
  flat
  class="custom-table"
>
  <template v-slot:body="props">
    <q-tr
      :props="props"
      @click="redirectToDraft(props.row.id)" 
      class="cursor-pointer" 
    >
      <q-td v-for="col in props.cols" :key="col.name" :props="props">
        <!-- Render action buttons only in the actions column -->
        <template v-if="col.name === 'actions'">
          <div class="q-gutter-sm">
            <q-btn
              color="primary"
              @click.stop="openEditModal(props.row.id)"
              label="Edit"
              flat
            />
            <q-btn
              color="negative"
              @click.stop="deleteInvoice(props.row.id)"
              label="Delete"
              flat
            />
          </div>
        </template>
        <!-- Render other columns normally -->
        <template v-else>
          {{ props.row[col.name] }}
        </template>
      </q-td>
    </q-tr>
  </template>
</q-table>


    <!-- Edit Invoice Modal -->
    <q-dialog v-model="localIsOpen" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Edit Invoice</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="updateInvoice">
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
          <q-btn label="Update" @click="updateInvoice" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'; // Import useRouter for navigation

export default {
  data() {
    return {
      invoices: [],
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'invoice', label: 'Invoice', align: 'left', field: 'invoice', sortable: true },
        { name: 'customer', label: 'Customer', align: 'left', field: 'customer', sortable: true },
        { name: 'amount', label: 'Amount', align: 'left', field: 'amount', sortable: true },
        { name: 'due', label: 'Due Date', align: 'left', field: 'due', sortable: true },
        { name: 'issued', label: 'Issued Date', align: 'left', field: 'issued', sortable: true },
        { name: 'actions', label: 'Actions', align: 'center' }
      ],
      isEditModalOpen: false,
      selectedInvoiceId: null,
      invoice: {
        status: '',
        invoice: '',
        customer: '',
        amount: 0,
        due: '',
        issued: ''
      },
      localIsOpen: false
    };
  },
  setup() {
    const router = useRouter(); // Use router for navigation

    return {
      router
    };
  },
  watch: {
    selectedInvoiceId(newId) {
      if (newId) {
        this.fetchInvoiceDetails(newId);
      }
    },
    isEditModalOpen(val) {
      this.localIsOpen = val;
    }
  },
  created() {
    this.fetchInvoices();
  },
  methods: {
    async fetchInvoices() {
      try {
        const response = await axios.get('http://localhost:8000/api/invoice');
        this.invoices = response.data.data;
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    },
    async deleteInvoice(id) {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          reverseButtons: true
        });

        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8000/api/invoice/${id}`);
          this.fetchInvoices();
          await Swal.fire({
            title: 'Deleted!',
            text: 'The invoice has been deleted.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else if (result.isDismissed) {
          await Swal.fire({
            title: 'Cancelled',
            text: 'The invoice was not deleted.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error deleting invoice:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'There was an error deleting the invoice. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    openEditModal(id) {
      this.selectedInvoiceId = id;
      this.localIsOpen = true;
    },
    close() {
      this.localIsOpen = false;
    },
    async fetchInvoiceDetails(id) {
      try {
        const response = await axios.get(`http://localhost:8000/api/invoice/${id}`);
        this.invoice = response.data.data;
        this.isEditModalOpen = true;
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      }
    },
    async updateInvoice() {
      try {
        await axios.put(`http://localhost:8000/api/invoice/${this.selectedInvoiceId}`, this.invoice);
        this.localIsOpen = false;
        await Swal.fire({
          title: 'Updated!',
          text: 'The invoice has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.fetchInvoices();
      } catch (error) {
        console.error('Error updating invoice:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the invoice. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    redirectToDraft(id) {
      this.router.push({ name: 'draft', params: { id } }); // Navigate to draft page with invoice ID
    }
  }
};
</script>
<style scoped>
.table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

</style>