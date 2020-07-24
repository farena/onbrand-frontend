<template>
    <div class="container">
        <h1>{{title}}</h1>
        <form @submit.prevent="sendProduct">
            <div class="form-group">
                <label for="title">Product Title</label>
                <input type="text" class="form-control"
                v-model="item.title"
                 id="title" placeholder="Product Title">
            </div>
            <div class="form-group">
                <label for="title">Product Description</label>
                <input type="text" class="form-control"
                v-model="item.description"
                 id="title" placeholder="Product Description">
            </div>
            <div class="form-group">
                <label for="title">Product Price</label>
                <input type="text" class="form-control"
                v-model="item.price"
                 id="title" placeholder="Product Price">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-danger ml-3"
                @click="$router.push({name:'products'})">Back</button>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      item: {
        title: null,
        description: null,
        price: null,
      },
      title: 'New Product',
    };
  },
  mounted() {
    if (this.$route.params.id !== 'new') {
      this.title = 'Edit Product';
      this.getProduct(this.$route.params.id).then(() => {
        this.item = this.product;
      });
    }
  },
  computed: {
    ...mapGetters(['product']),
  },
  methods: {
    ...mapActions(['getProduct', 'updateProduct', 'createProduct']),
    sendProduct() {
      if (this.$route.params.id !== 'new') {
        this.updateProduct(this.item)
          .then(() => {
            this.$noty.success('Product edited successfully!');
          })
          .catch((x) => this.showError(x));
      } else {
        this.createProduct(this.item)
          .then(() => {
            this.$noty.success('Product created successfully!');
          })
          .catch((x) => this.showError(x));
      }
    },
  },
};
</script>

<style>

</style>
