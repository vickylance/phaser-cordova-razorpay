
const rzpOptions = {
  key: "rzp_test_1DP5mmOlF5G5ag",
  amount: "2000", // 2000 paise = INR 20
  name: "Merchant Name",
  description: "Purchase Description",
  image: "https://i.imgur.com/n5tjHFD.png",
  handler: function(response) {
    alert(response.razorpay_payment_id);
  },
  prefill: {
    name: "Harshil Mathur",
    email: "harshil@razorpay.com"
  },
  notes: {
    address: "Hello World"
  },
  theme: {
    color: "#F37254"
  }
};

const successCallback = function(payment_id) {
  alert("payment_id: " + payment_id);
};

const cancelCallback = function(error) {
  alert(error.description + " (Error " + error.code + ")");
};

const openPaymentDiag = () => RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);

export {
  openPaymentDiag
}