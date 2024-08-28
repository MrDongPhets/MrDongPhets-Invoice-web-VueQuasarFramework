<template>
 <div class="q-pa-sm">

  <h5>Dashboard</h5>
  <q-page class="q-pa-md">
    <!-- Card Container for Horizontal Alignment -->
    <div class="card-container">

      <div  class="my-card">
        <q-card 
        flat 
        style="background-color: white; color: rgb(57, 156, 248);"
        class="my-card1"
      >
        <q-card-section class="text-h3">
          {{ newItemsCount }}
        </q-card-section>
    
          <div class="text-h6">Qty.</div>
 
        <q-card-section>
          <div class="text-h6">New Items</div>
        </q-card-section>
      </q-card>
      </div>
      

      <div  class="my-card">
        <q-card 
        flat 
        style="background-color: white; color: rgb(57, 156, 248);"
        class="my-card1"
      >
        <q-card-section class="text-h3">
          {{ newOrdersCount}}
        </q-card-section>
    
          <div class="text-h6">Qty.</div>
 
        <q-card-section>
          <div class="text-h6">New Orders</div>
        </q-card-section>
      </q-card>
      </div>

      <div  class="my-card">
        <q-card 
        flat 
        style="background-color: white; color: rgb(57, 156, 248);"
        class="my-card1"
      >
        <q-card-section class="text-h3">
          {{ refundsCount }}
        </q-card-section>
    
          <div class="text-h6">Qty.</div>
 
        <q-card-section>
          <div class="text-h6">Refund</div>
        </q-card-section>
      </q-card>
      </div>

      <div  class="my-card">
        <q-card 
        flat 
        style="background-color: white; color: rgb(57, 156, 248);"
        class="my-card1"
      >
        <q-card-section class="text-h3">
          {{ newItemsCount }}
        </q-card-section>
    
          <div class="text-h6">Qty.</div>
 
        <q-card-section>
          <div class="text-h6">Messages</div>
        </q-card-section>
      </q-card>
      </div>

      </div>
 
       <div class="chart-container">


        <div class="chart-sale">      
          <h5>Sales Chart</h5>
               <canvas ref="salesChartRef"></canvas>
        </div> 

   
        <div class="chart-item">      
          <h5>Records Chart</h5>
               <canvas ref="donutChartRef"></canvas>
        </div>

       

          </div>

      
  </q-page>

 </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
export default {
  data() {
    return {
      newItemsCount: 45,
      newOrdersCount: 12,
      refundsCount: 3,
      messagesCount: 8
    };
  },

  setup() {
    const salesChartRef = ref(null);

    onMounted(() => {
      if (salesChartRef.value) {
        new Chart(salesChartRef.value, {
          type: 'bar',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: 'Monthly Sales',
              data: [5000, 6000, 7000, 8000, 9000, 8500, 9500, 10000, 10500, 11000, 11500, 12000], // Example sales data
      
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.dataset.label + ': $' + context.raw;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Sales ($)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Month'
                }
              }
            }
          }
        });
      }
    });

    const donutChartRef = ref(null);

onMounted(() => {
  if (donutChartRef.value) {
    new Chart(donutChartRef.value, {
      type: 'doughnut',
      data: {
        labels: ['New Items', 'New Orders', 'Refunds', 'Messages'],
        datasets: [{
          label: 'Counts',
          data: [45, 12, 3, 8], // Corresponding data for each label
         
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }
});


    return {
      salesChartRef, donutChartRef
    };
  },

 
};



</script>

<style scoped>
.chart-container{
  margin-top: 5%;
    width: 100%;
    min-height: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}
.chart-sale{
    background-color: rgb(255, 255, 255);
    width: 678px;
    height: 450px;
    border-radius: 20px;
    box-shadow: 0 1px 18px rgba(0, 0, 0, 0.3);
    text-align: center;
}

.chart-item{
    background-color: rgb(255, 255, 255);
    width: 300px;
    height: 450px;
    border-radius: 20px;
    box-shadow: 0 1px 18px rgba(0, 0, 0, 0.3);
    text-align: center;
}


.chart-div h5{
  color: rgb(100, 100, 100);
}

canvas {
  padding: 10px;
  width: 100%;
  height:100%;
 
}

.card-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  gap: 16px; 
  margin-bottom: 16px; 
}

.my-card1 {

  border-radius: 100px; 
  border-left: 50px;
 
  
}
.my-card {
  flex: 1 1 200px; 
  max-width: 250px; 
  text-align: center;
  background-color: white; 
  color: rgb(57, 156, 248);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px; 
  transition: box-shadow 0.3s ease-in-out; 
  border-left: 7px solid #50b9ff; 
 
 
}

.my-card:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

.additional-content {
 
}
</style>