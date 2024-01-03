<template>
  <div>
    <div id="paypal-button-container" v-if="visible" />
  </div>
</template>

<script>
import PaymentService from "@/service/payment/PaymentService";
import OrderService from "@/service/order/OrderService";

export default {
  data() {
    return {
      purchase: {},
      visible: false,
      bakerId: 0,
    };
  },
  props: {
    order: {},
  },
  methods: {
    async initialization() {
      PaymentService.create(this.order).then((res) => {
        this.purchase = res.data;
        this.visible = true;
        this.bakerId = this.order.bakerId;
        this.loadSdkScript();
      });
    },
    loadSdkScript() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://www.paypal.com/sdk/js?client-id=Ab3iwLdPmG9dnZWw44EyEk0RHPB4oD75SIrmK-m8ByJuClk4TEshK-kHI-qnQHSwlvu5GQx8McErINj_&currency=USD";
        script.onload = () => {
          this.renderButton();
          resolve();
        };
        document.body.appendChild(script);
      });
    },
    renderButton() {
      window.paypal
        .Buttons({
          style: {
            layout: "horizontal",
            color: "blue",
            height: 40,
          },
          createOrder: this.createOrder,
          onApprove: this.onApprove,
          onError: this.onError,
        })
        .render("#paypal-button-container");
    },
    createOrder(data, actions) {
      return actions.order.create(this.purchase);
    },
    onApprove(data, actions) {
      var success = true
      actions.order.capture().then((detail) => {
        console.log(detail);
        this.order.code = detail.id;
        this.order.createdDate = detail.create_time;
        var success = false;
        OrderService.create(this.order).then(
          (res) => {
            console.log(res.data);
              success = true
          },
          (error) => {
            console.log(error);
            success = false
          }
        );
        this.$store.dispatch("OrderProduct/buy", this.bakerId).then(
          () => {
            success = true
          },
          (error) => {
            success = false
          }
        );
        this.$parent.finishPayment(detail);
      }).then(() => {
        this.$emit('operation', {
              success: success
            });
      });
    },
    onError() {
      this.$parent.finishPaymentError();

      console.error("Error");
    },
  },
  async mounted() {
    await this.initialization();
  },
};
</script>

<style scoped></style>
