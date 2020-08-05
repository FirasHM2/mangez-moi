$(document).ready(function() {
    $('.cart').on('click', '.remove', (e) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure to delete this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure'
        }).then(function (result) {
            if (result.value) {
                let id = $(e.target).parents('tr').attr('id');
                $.post(siteUrl+'/cart/delete', {id:id}, (data) => {
                    if (data == "Success") {
                        $(e.target).parents('tr').remove();
                        updateCarted();
                        Swal.fire({
                            icon: "success",
                            text: 'Successfully deleted!',
                            toast: true,
                            timer: 2000,
                            showConfirmButton: false,
                            position : "top-end",
                        });
                    } else {
                        Swal.fire({
                            title:'500: Error Occured in Backend',
                            text: 'Sorry...',
                            icon:'error'
                        });
                    }
                });
            }
        });
    })
    $('input[type="checkbox"]').change(function() {
        console.log('checked ', $(this).checked);
        console.log('object ', $(this));
        if ($(this)[0].checked) $(this).next().text('Delivery   ');
        else $(this).next().text('Take Away');
    });
    $('#checkout').click(function() {
        if (!window.PaymentRequest) {
            // PaymentRequest API is not available. Forwarding to
            // legacy form based experience.
            alert('Not available');
            return;
          }
        
          // Supported payment methods
          var supportedInstruments = [{
              supportedMethods: ['basic-card'],
              data: {
                supportedNetworks: [
                  'visa', 'mastercard', 'amex', 'discover',
                  'diners', 'jcb', 'unionpay'
                ]
              }
          }];
        
          // Checkout details
          var details = {
            displayItems: [{
              label: 'Original donation amount',
              amount: { currency: 'USD', value: '65.00' }
            }, {
              label: 'Friends and family discount',
              amount: { currency: 'USD', value: '-10.00' }
            }],
            total: {
              label: 'Total due',
              amount: { currency: 'USD', value : '55.00' }
            }
          };
        
          // 1. Create a `PaymentRequest` instance
          var request = new PaymentRequest(supportedInstruments, details);
        
          // 2. Show the native UI with `.show()`
          request.show()
          // 3. Process the payment
          .then(result => {
            // POST the payment information to the server
            return fetch('/pay', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(result.toJSON())
            }).then(response => {
              // 4. Display payment results
              if (response.status === 200) {
                // Payment successful
                return result.complete('success');
              } else {
                // Payment failure
                return result.complete('fail');
              }
            }).catch(() => {
              return result.complete('fail');
            });
          });
        });   
});