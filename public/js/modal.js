$('#connect-btn-bb8').on('click', () => {
  console.log('connecting to bb8');
});

$('#connect-btn-sprk').on('click', () => {
  console.log('connecting to sprk');
  swal({
    title: 'READY TO GO',
    text: 'We have successfully connected to your Sphero',
    showCancelButton: false,
    confirmButtonColor: '#987463',
    confirmButtonText: 'CONTINUE',
    closeOnConfirm: false
  },
  () => {
    swal("LET'S EXPLORE");
  });
});
