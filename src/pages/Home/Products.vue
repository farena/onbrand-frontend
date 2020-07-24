<template>
<div>
  <h1>Products</h1>

  <div class="text-right" v-if="getUser.role_id === 1">
    <button class="btn btn-info"
      @click="$router.push({name:'productForm', params: { id: 'new'}})">Add New Product</button>
  </div>
  <vue-table
    v-if="vTable.headers.length"
    :values="this.products"
    :headers="vTable.headers"
    :actions="vTable.actions"
    :options="vTable.options"
    @changed="getProducts"
    @onEdit="onEdit"
    @onDelete="onDelete"
    @onApprove="onApprove"
    ref="vtable"
  />
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      vTable: {
        headers: [],
        actions: [],
        values: {},
        options: {
          tableClass: 'table table-striped table-hover myTable',
        },
      },
    };
  },
  mounted() {
    // we set the headers and the actions accordin to the user role
    // and then we initialize the table
    this.setTableHeaders().then(() => {
      this.setTableActions().then(() => {
        this.$refs.vtable.init();
      });
    });
  },
  computed: {
    ...mapGetters([
      'getUser',
      'products',
    ]),
  },
  methods: {
    ...mapActions([
      'getProducts',
      'deleteProduct',
      'approveProduct',
    ]),
    setTableHeaders() {
      return new Promise((resolve) => {
        this.vTable.headers = [
          {
            title: 'title',
            sortable: true,
            width: 35,
          },
          {
            title: 'description',
            sortable: true,
            width: 40,
          },
          {
            title: 'price',
            sortable: true,
          },
        ];

        if (this.getUser.role_id !== 3) {
          this.vTable.headers.push({
            title: 'is_approved',
            mask: 'approved',
            sortable: true,
          });
        }

        resolve();
      });
    },
    setTableActions() {
      return new Promise((resolve) => {
        // if the user is a submitter we let him to delete or edit the products
        if (this.getUser.role_id === 1) {
          this.vTable.actions = [
            {
              buttonClass: 'btn-warning',
              callback: 'onEdit',
              tooltip: 'edit',
              icon: 'fas fa-edit',
            },
            {
              buttonClass: 'btn-danger',
              callback: 'onDelete',
              tooltip: 'delete',
              icon: 'fas fa-times',
            },
          ];
        }

        // if the user is a approver we let him to approve the products
        if (this.getUser.role_id === 2) {
          this.vTable.actions = [
            {
              buttonClass: 'btn-info',
              callback: 'onApprove',
              tooltip: 'approve product',
              icon: 'fas fa-check',
            },
          ];
        }

        resolve();
      });
    },

    // Products actions
    onEdit(product) {
      this.$router.push({ name: 'productForm', params: { id: product.id } });
    },
    onDelete(product) {
      this.deleteProduct(product)
        .then(() => {
          this.$noty.success('Product Deleted Succesfully!');
          this.resetTable();
        })
        .catch((x) => this.showError(x));
    },
    onApprove(product) {
      this.approveProduct(product)
        .then(() => {
          this.$noty.success('Product Approved Succesfully!');
          this.resetTable();
        })
        .catch((x) => this.showError(x));
    },
    resetTable() {
      this.$refs.vtable.init();
    },
  },
};
</script>

<style>

</style>
